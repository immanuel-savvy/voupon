import React from "react";
import { email_regex, to_title } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import { Loggeduser } from "../Contexts";
import Alert_box from "./alert_box";
import Checkbox from "./checkbox";
import Coupon_created_details from "./coupon_created_details";
import Stretch_button from "./stretch_button";
import Text_btn from "./text_btn";
import Text_input from "./text_input";
import { coupon_types } from "./vendor_coupons";

class Verify_coupon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  is_set = () => {
    let { coupon_code, email, type } = this.state;

    if (type === coupon_types[1])
      return coupon_code && email_regex.test(email) && type;

    return type && coupon_code;
  };

  verify = async () => {
    let { coupon_code, email, type } = this.state;

    let result = await post_request("verify_coupon", {
      coupon_code,
      email,
      type,
    });

    if (result && result.coupon)
      this.setState({ verified: true, coupon: result.coupon, result });
    else
      this.setState({
        message:
          (result && result.message) || "Cannot verify coupon at this time.",
      });
  };

  render() {
    let { coupon, toggle } = this.props;
    let {
      coupon_code,
      coupon: coupon_,
      message,
      verifying,
      email,
      type,
      verified,
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

                        <div className="rcs_log_124">
                          <div className="Lpo09">
                            <h4>Verify Coupon</h4>
                          </div>

                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Text_btn
                              action={toggle}
                              icon="fa-window-close"
                              style={{ paddingRight: 15 }}
                            />
                          </div>
                        </div>

                        {verified ? (
                          <Coupon_created_details
                            toggle={() => this.setState({ verified: false })}
                            coupon={coupon}
                            verified
                          />
                        ) : (
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
                              title={verifying ? "Verifying" : `Verify`}
                              loading={verifying}
                              disabled={!this.is_set()}
                              action={() => this.verify()}
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
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Verify_coupon;
