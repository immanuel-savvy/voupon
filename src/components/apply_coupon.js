import React from "react";
import { email_regex, to_title } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import { Loggeduser } from "../Contexts";
import Alert_box from "./alert_box";
import Checkbox from "./checkbox";
import Coupon_created_details from "./coupon_created_details";
import Modal_form_title from "./modal_form_title";
import Stretch_button from "./stretch_button";
import Text_input from "./text_input";
import { coupon_types } from "./vendor_coupons";

class Apply_coupon extends React.Component {
  constructor(props) {
    super(props);

    let { user } = this.props;
    this.state = {
      email: user?.email,
    };
  }

  is_set = () => {
    let { coupon_code, email, type } = this.state;

    if (type === coupon_types[1])
      return coupon_code && email_regex.test(email) && type;

    return type && coupon_code;
  };

  verify = async () => {
    let { vendor, on_coupon } = this.props;
    let { coupon_code, email, type } = this.state;

    let result = await post_request("retrieve_coupon", {
      coupon_code,
      email,
      type,
      vendor: vendor._id,
    });

    if (result && result.coupon) {
      let cb = () =>
        this.setState({ retrieved: true, coupon: result.coupon, result });
      on_coupon
        ? this.setState({ applying: true }, () =>
            on_coupon(result.coupon, (applied) =>
              applied?.applied
                ? cb()
                : this.setState({
                    applying: false,
                    message: applied?.message || "Coupon Application Failed",
                  })
            )
          )
        : cb();
    } else
      this.setState({
        message: result?.message || "Cannot retrieve coupon at this time.",
      });
  };

  render() {
    let { coupon, toggle, applying } = this.props;
    let {
      coupon_code,
      coupon: coupon_,
      message,
      retrieving,
      email,
      type,
    } = this.state;

    coupon = coupon_ || coupon;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          return (
            <section style={{ paddingTop: 20, paddingBottom: 20 }}>
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

                        <Modal_form_title
                          title="Apply coupon"
                          toggle={toggle}
                        />

                        {
                          <>
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                              <div className="form-group">
                                <label>Coupon Type</label>

                                {coupon_types.map((coupon_type_) => {
                                  return (
                                    <Checkbox
                                      type="radio"
                                      title={to_title(
                                        coupon_type_.replace(/_/g, " ")
                                      )}
                                      key={coupon_type_}
                                      _id={coupon_type_}
                                      checked={coupon_type_ === type}
                                      action={(type) => this.setState({ type })}
                                      name="coupon_type"
                                    />
                                  );
                                })}
                              </div>
                            </div>

                            {type === coupon_types[1] ? (
                              <Text_input
                                value={email}
                                title="Email"
                                action={(email) =>
                                  this.setState({
                                    email,
                                    message: "",
                                  })
                                }
                                important
                              />
                            ) : null}

                            <Text_input
                              value={(coupon_code || "").toUpperCase()}
                              title="coupon code"
                              disabled={!!this.props.coupon}
                              action={(coupon_code) =>
                                this.setState({
                                  coupon_code,
                                  message: "",
                                })
                              }
                              important
                            />

                            {message ? <Alert_box message={message} /> : null}

                            <Stretch_button
                              title={
                                applying
                                  ? "Applying"
                                  : retrieving
                                  ? "Retrieving"
                                  : `Retrieve Coupon`
                              }
                              loading={retrieving}
                              disabled={!this.is_set()}
                              action={() => this.verify()}
                            />
                          </>
                        }
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Apply_coupon;
