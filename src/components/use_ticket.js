import React from "react";
import { email_regex } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import { Loggeduser } from "../Contexts";
import Alert_box from "./alert_box";
import Stretch_button from "./stretch_button";
import Text_input from "./text_input";
import Ticket_used_details from "./ticket_used_details";
import Voucher_otp from "./voucher_otp";

class Use_ticket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    let { ticket } = this.props;

    if (ticket) {
      let { ticket_code, email } = ticket;
      this.setState({
        ticket_code,
        email,
      });
    }
  };

  is_set = () => {
    let { email, ticket_code } = this.state;

    return email_regex.test(email) && ticket_code;
  };

  proceed_to_otp = async () => {
    let { vendor } = this.props;
    let { ticket_code, user, email } = this.state;

    let result = await post_request("can_redeem_ticket", {
      user: user || this.loggeduser?._id,
      email,
      ticket_code,
      vendor: vendor._id,
    });

    if (result && result.can_redeem) {
      this.setState({
        can_redeem: true,
        user: result.user,
      });

      this.setState({ requesting_otp: true });
      result = await post_request(`request_ticket_otp`, {
        user: result.user,
        ticket_code: result.ticket_code,
        ticket: result.ticket,
        email: result.email,
      });

      this.setState({ event: result.event, ticket: result.ticket });
    } else this.setState({ message: result.message });
  };

  proceed = async (otp) => {
    let { vendor, on_use } = this.props;
    let { proceeding, event, user, ticket } = this.state;
    if (proceeding) return;

    this.setState({ proceeding: true });

    let details = {
      vendor: vendor._id,
      ticket,
      user,
      event,
      otp,
    };

    let result = await post_request("use_ticket", details);

    if (result && result.success) {
      this.setState({
        use_successful: true,
        user: result.user,
        ticket: result.ticket,
        vendor: result.vendor,
      });
      on_use && on_use(result.value);
    } else
      this.setState({
        message:
          (result && result.message) || "Cannot use ticket at the moment.",
      });
  };

  reset_state = () => {
    this.setState({
      ticket: null,
      ticket_code: "",
      user: null,
      requesting_otp: false,
      use_successful: null,
      message: "",
      email: "",
    });
  };

  render() {
    let { ticket } = this.props;
    let {
      proceeding,
      message,
      using,
      email,
      ticket_code,
      user,
      ticket: used_ticket,
      vendor,
      use_successful,
      requesting_otp,
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

                        <div className="rcs_log_124">
                          <div className="Lpo09">
                            <h4>Use Ticket</h4>
                          </div>
                        </div>

                        {use_successful ? (
                          <Ticket_used_details
                            toggle={this.reset_state}
                            details={{
                              user,
                              ticket: used_ticket,
                              vendor,
                            }}
                          />
                        ) : requesting_otp ? (
                          <Voucher_otp
                            proceed={this.proceed}
                            ticket={ticket}
                            message={message}
                            email={email || this.loggeduser?.email}
                            toggle={() =>
                              this.setState({ requesting_otp: false })
                            }
                            clear_message={this.clear_message}
                            redeeming={using}
                          />
                        ) : (
                          <>
                            <Text_input
                              value={ticket_code}
                              title="ticket code"
                              disabled={!!ticket}
                              action={(ticket_code) =>
                                this.setState({
                                  ticket_code,
                                  message: "",
                                })
                              }
                              important
                            />

                            <Text_input
                              value={email}
                              title={`Authorised email`}
                              disabled={!!ticket}
                              action={(email) =>
                                this.setState({
                                  email,
                                  message: "",
                                })
                              }
                              type="email"
                              important
                            />

                            {message ? <Alert_box message={message} /> : null}

                            <Stretch_button
                              title={"Proceed"}
                              loading={proceeding}
                              disabled={!this.is_set()}
                              action={() => this.proceed_to_otp()}
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

export default Use_ticket;
