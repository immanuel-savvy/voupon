import React from "react";
import { async } from "semitter";
import { email_regex, to_title } from "../assets/js/utils/functions";
import { get_request, post_request } from "../assets/js/utils/services";
import { Loggeduser } from "../Contexts";
import Alert_box from "./alert_box";
import Form_divider from "./form_divider";
import { voucher_types } from "./redeem_voucher";
import Stretch_button from "./stretch_button";
import Text_btn from "./text_btn";
import Text_input from "./text_input";
import Voucher_otp from "./voucher_otp";

class Transfer_voucher extends React.Component {
  constructor(props) {
    super(props);

    let { voucher } = this.props;
    let { voucher_code, email, vendor } = voucher;

    this.state = {
      voucher_code,
      email,
      voucher_type: voucher_types[vendor ? 1 : 0],
    };
  }

  componentDidMount = () => {
    let { email } = this.state;
    if (!email && this.loggeduser)
      this.setState({ email: this.loggeduser.email });
  };

  is_set = () => {
    let { email, email2, voucher_code, message } = this.state;

    return (
      email_regex.test(email) &&
      email_regex.test(email2) &&
      voucher_code &&
      !message
    );
  };

  fetch_user = async () => {
    let { email2, fetching_user } = this.state;
    if (!email_regex.test(email2) || fetching_user) return;

    this.setState({ fetching_user: true });

    let user = await post_request(`user_by_email`, { email: email2 });
    let message = typeof user === "object" && user ? "" : user;
    this.setState({ user, fetching_user: false, message });
  };

  proceed_to_otp = async () => {
    let { voucher_code, voucher_type } = this.state;

    let result = await post_request("can_redeem_voucher", {
      user: this.loggeduser._id,
      voucher_type,
      voucher_code,
    });

    if (result && result.can_redeem) {
      this.setState({ can_redeem: true, voucher: result.owner_voucher });

      this.setState({ requesting_otp: true });
      result = await post_request(`request_voucher_otp`, {
        user: result.user,
        voucher_code: result.voucher_code,
        voucher: result.owner_voucher,
        voucher_type: result.voucher_type,
        email: result.email,
      });
    } else this.setState({ message: result.message });
  };

  proceed = async (otp) => {
    let { toggle, voucher, on_transfer } = this.props;
    let { email, user, email2, voucher_code, voucher_type } = this.state;

    this.setState({ transfering: true });

    let details = {
      email,
      email2,
      user: user._id,
      owner: this.loggeduser._id,
      voucher_code,
      voucher_type,
      otp,
      voucher: voucher._id,
    };

    let result = await post_request("transfer_voucher", details);

    if (result && !result.voucher)
      return this.setState({ message: result.message, transfering: false });

    on_transfer && on_transfer();
    this.setState(
      {
        message: result.message,
        transferred: result.transferred,
        transfering: false,
      },
      toggle
    );
  };

  clear_message = () => this.setState({ message: "" });

  render() {
    let { voucher } = this.props;
    let {
      voucher_code,
      fetching_user,
      user,
      email,
      email2,
      message,
      requesting_otp,
      transfering,
    } = this.state;

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

                        {requesting_otp ? (
                          <Voucher_otp
                            proceed={this.proceed}
                            voucher={voucher}
                            message={message}
                            email={email}
                            toggle={() =>
                              this.setState({ requesting_otp: false })
                            }
                            clear_message={this.clear_message}
                            transfering={transfering}
                          />
                        ) : (
                          <>
                            <div className="rcs_log_124">
                              <div className="Lpo09">
                                <h4>Transfer Voucher</h4>
                              </div>
                            </div>

                            <Text_input
                              value={voucher_code}
                              title="voucher code"
                              disabled={!!voucher}
                              action={(voucher_code) =>
                                this.setState({
                                  voucher_code,
                                  message: "",
                                })
                              }
                              important
                            />

                            <Form_divider text="Current Owner" />

                            <Text_input
                              value={email}
                              title="Email"
                              disabled={!!voucher}
                              action={(email) =>
                                this.setState({
                                  email,
                                  message: "",
                                })
                              }
                              important
                            />

                            <Form_divider text="Prospective Owner" />

                            <Text_input
                              value={email2}
                              title="Email"
                              action={(email2) =>
                                this.setState({
                                  email2,
                                  message: "",
                                })
                              }
                              important
                            />

                            {user && user.email === email2 ? (
                              <Text_input
                                value={to_title(
                                  `${user.firstname} ${user.lastname}`
                                )}
                                title="User"
                                disabled
                                important
                              />
                            ) : null}

                            {message ? <Alert_box message={message} /> : null}

                            {!user || (user && user.email !== email2) ? (
                              <div style={{ textAlign: "center" }}>
                                <Text_btn
                                  style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    width: "100%",
                                    textDecoration: "underline",
                                    textTransform: "capitalise",
                                  }}
                                  text={to_title(
                                    fetching_user
                                      ? "Fetching user"
                                      : "verify user"
                                  )}
                                  action={this.fetch_user}
                                />
                              </div>
                            ) : (
                              <Stretch_button
                                disabled={!this.is_set()}
                                title={"Proceed"}
                                action={this.proceed_to_otp}
                              />
                            )}
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

export default Transfer_voucher;
