import React from "react";
import { to_title } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import { emitter } from "../Voupon";
import Checkbox from "./checkbox";
import Coupon_created_details from "./coupon_created_details";
import Modal_form_title from "./modal_form_title";
import Stretch_button from "./stretch_button";
import Text_input from "./text_input";
import { coupon_types } from "./vendor_coupons";

class Create_coupon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  is_set = () => {
    let { title, value, coupon_type } = this.state;

    return title && Number(value) > 0 && coupon_type;
  };

  set_coupon_type = (coupon_type) => this.setState({ coupon_type });

  create_coupon = async () => {
    let { vendor } = this.props;
    let { quantities, coupon_type, title, value, description, duration } =
      this.state;

    let coupon = {
      quantities,
      type: coupon_type,
      title,
      value: Number(value),
      description,
      duration: duration ? new Date(duration).getTime() : null,
      vendor: vendor._id || vendor,
    };

    let result = await post_request("new_coupon", coupon);

    if (result && result._id) {
      coupon._id = result._id;
      coupon.created = result.created;
      coupon.coupon_code = result.coupon_code;

      emitter.emit("new_coupon", coupon);

      this.setState({ coupon });
    } else
      this.setState({
        message:
          (result && result.message) || "Cannot add coupon at the moment.",
      });
  };

  render() {
    let { toggle, vendor } = this.props;
    let {
      quantities,
      coupon,
      title,
      value,
      coupon_type,
      description,
      duration,
    } = this.state;

    return (
      <section style={{ paddingTop: 20 }}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <form>
                <div className="crs_log_wrap">
                  <div className="crs_log__thumb">
                    <img
                      src={require(`../assets/img/vouchers1.png`)}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="crs_log__caption">
                    <div className="rcs_log_123">
                      <div className="rcs_ico">
                        <i className="fas fa-users"></i>
                      </div>
                    </div>
                  </div>

                  <Modal_form_title title="create coupon" toggle={toggle} />

                  {coupon ? (
                    <Coupon_created_details coupon={coupon} toggle={toggle} />
                  ) : (
                    <>
                      <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label>Coupon Type</label>

                          {coupon_types.map((coupon_type_) => {
                            if (!vendor && coupon_type_ === coupon_types[1])
                              return;
                            return (
                              <Checkbox
                                type="radio"
                                title={to_title(
                                  coupon_type_.replace(/_/g, " ")
                                )}
                                key={coupon_type_}
                                _id={coupon_type_}
                                checked={coupon_type_ === coupon_type}
                                action={(_id) => this.set_coupon_type(_id)}
                                name="coupon_type"
                              />
                            );
                          })}
                        </div>
                      </div>

                      <Text_input
                        value={title}
                        title="coupon title"
                        action={(title) =>
                          this.setState({
                            title,
                            message: "",
                          })
                        }
                        important
                        // error_message=""
                      />

                      <Text_input
                        value={value}
                        title={`Percentage Value"}`}
                        action={(value) =>
                          this.setState({
                            value,
                            message: "",
                          })
                        }
                        type="number"
                        important
                      />

                      <Text_input
                        value={quantities}
                        title="Total number of usage"
                        action={(quantities) =>
                          this.setState({
                            quantities,
                            message: "",
                          })
                        }
                        type="number"
                        info="Leave blank for infinite usage"
                      />

                      <Text_input
                        value={duration}
                        title="Duration for sale"
                        action={(duration) =>
                          this.setState({
                            duration,
                            message: "",
                          })
                        }
                        type="date"
                        info="Leave blank for indefinite duration"
                      />

                      <Text_input
                        value={description}
                        title="Description"
                        action={(description) =>
                          this.setState({
                            description,
                            message: "",
                          })
                        }
                        multiline
                      />

                      <Stretch_button
                        title="create"
                        disabled={!this.is_set()}
                        action={this.create_coupon}
                      />
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Create_coupon;
