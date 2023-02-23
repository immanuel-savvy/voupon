import React from "react";
import { email_regex, to_title } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import { Loggeduser } from "../Contexts";
import Alert_box from "./alert_box";
import Checkbox from "./checkbox";
import Login from "./login";
import { voucher_types } from "./redeem_voucher";
import Stretch_button from "./stretch_button";
import Text_btn from "./text_btn";
import Text_input from "./text_input";
import Voucher_verified_details from "./voucher_verified_details";

class Verify_voucher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  is_set = () => {
    let { email, voucher_code, voucher_type } = this.state;

    return email_regex.test(email) && voucher_code && voucher_type;
  };

  set_voucher_type = (voucher_type) => this.setState({ voucher_type });

  verify = async () => {
    let { email, voucher_code, voucher_type } = this.state;

    let result = await post_request("verify_voucher", {
      email,
      voucher_code,
      voucher_type,
    });

    if (result && result.state)
      this.setState({ verified: true, voucher: result.voucher, result });
    else
      this.setState({
        message:
          (result && result.message) || "Cannot verify voucher at this time.",
      });
  };

  render() {
    let { voucher, toggle } = this.props;
    let {
      voucher_code,
      voucher: voucher_,
      message,
      voucher_type,
      verifying,
      email,
      verified,
    } = this.state;

    voucher = voucher_ || voucher;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          if (!loggeduser)
            return <Login action={this.set_details} no_redirect />;

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
                            <h4>Verify Voucher</h4>
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
                          <Voucher_verified_details
                            toggle={() => this.setState({ verified: false })}
                            voucher={voucher}
                            details={{
                              voucher_code,
                              email,
                            }}
                          />
                        ) : (
                          <>
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                              <div className="form-group">
                                <label>Voucher Type</label>

                                {voucher_types.map((voucher_type_) => {
                                  return (
                                    <Checkbox
                                      type="radio"
                                      disabled={!!this.props.voucher}
                                      title={to_title(
                                        voucher_type_.replace(/_/g, " ")
                                      )}
                                      key={voucher_type_}
                                      _id={voucher_type_}
                                      checked={voucher_type_ === voucher_type}
                                      action={(_id) =>
                                        this.set_voucher_type(_id)
                                      }
                                      name="voucher_type"
                                    />
                                  );
                                })}
                              </div>
                            </div>

                            <Text_input
                              value={voucher_code}
                              title="voucher code"
                              disabled={!!this.props.voucher}
                              action={(voucher_code) =>
                                this.setState({
                                  voucher_code,
                                  message: "",
                                })
                              }
                              important
                            />

                            <Text_input
                              value={email}
                              title="Email"
                              disabled={!!this.props.voucher}
                              action={(email) =>
                                this.setState({
                                  email,
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

export default Verify_voucher;
