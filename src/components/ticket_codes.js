import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { to_title } from "../assets/js/utils/functions";
import Listempty from "./listempty";
import Ticket from "./ticket";

class Ticket_codes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active_tab: this.states[0],
    };
  }

  states = new Array("unused", "used");

  render() {
    let { toggle, ticket, event } = this.props;

    let { active_tab } = this.state;
    event = event || (ticket && ticket.event);

    if (ticket && !ticket.used_codes) ticket.used_codes = new Array();

    ticket.used_codes = ticket?.used_codes?.filter((c) => !!c);

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <div class="modal-header">
            <h5 class="modal-title">Ticket Codes</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => toggle && toggle()}
            >
              <span aria-hidden="true">
                <i class="fas fa-times-circle"></i>
              </span>
            </button>
          </div>
          <div class="modal-body">
            {ticket ? (
              <div class="login-form">
                <Tabs
                  defaultActiveKey={active_tab}
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  {this.states.map((tab) => {
                    return (
                      <Tab
                        eventKey={tab}
                        title={`${to_title(tab)} (${
                          tab === this.states[0]
                            ? ticket.used_codes
                              ? ticket.ticket_code.filter(
                                  (code) => !ticket.used_codes.includes(code)
                                ).length
                              : ticket.ticket_code.length
                            : (ticket.used_codes && ticket.used_codes.length) ||
                              0
                        })`}
                        key={tab}
                      >
                        <div className="row justify-content-center">
                          {((state) => {
                            let C = null;
                            if (state === this.states[0]) {
                              C = ticket.ticket_code
                                .filter((t_code) =>
                                  ticket.used_codes
                                    ? !ticket.used_codes.includes(t_code)
                                    : false
                                )
                                .map((code) => (
                                  <Ticket
                                    no_user
                                    event={event}
                                    ticket={{
                                      ...ticket,
                                      ticket_code: code,
                                      state: tab,
                                    }}
                                  />
                                ));
                            } else {
                              C = ticket.used_codes ? (
                                ticket.used_codes.map((code) => (
                                  <Ticket
                                    no_user
                                    event={event}
                                    ticket={{
                                      ...ticket,
                                      ticket_code: code,
                                      state,
                                    }}
                                  />
                                ))
                              ) : (
                                <Listempty />
                              );
                            }
                            return C;
                          })(tab)}
                        </div>
                      </Tab>
                    );
                  })}
                </Tabs>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Ticket_codes;
