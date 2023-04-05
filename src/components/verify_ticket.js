import React from "react";
import { email_regex } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import { Loggeduser } from "../Contexts";
import Alert_box from "./alert_box";
import Event from "./event";
import Login from "./login";
import Modal_form_title from "./modal_form_title";
import Stretch_button from "./stretch_button";
import Text_btn from "./text_btn";
import Text_input from "./text_input";

class Verify_ticket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  is_set = () => {
    let { email, ticket_code } = this.state;

    return email_regex.test(email) && ticket_code;
  };

  verify = async () => {
    let { email, ticket_code } = this.state;

    let result = await post_request("verify_ticket", {
      email,
      ticket_code,
    });

    if (result && result.ticket)
      this.setState({ verified: true, ticket: result.ticket, result });
    else
      this.setState({
        message:
          (result && result.message) || "Cannot verify ticket at this time.",
      });
  };

  render() {
    let { ticket, toggle } = this.props;
    let {
      ticket_code,
      ticket: ticket_,
      message,
      verifying,
      email,
      verified,
    } = this.state;

    ticket = ticket_ || ticket;

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

                        <Modal_form_title
                          title="verify ticket"
                          toggle={toggle}
                        />

                        {verified ? (
                          <Event
                            class_name={"col-12"}
                            ticket_code={ticket.ticket_code}
                            event={{ ...ticket.event, state: ticket.state }}
                          />
                        ) : (
                          <>
                            <Text_input
                              value={ticket_code}
                              title="ticket code"
                              disabled={!!this.props.ticket}
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
                              title="Email"
                              disabled={!!this.props.ticket}
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

export default Verify_ticket;
