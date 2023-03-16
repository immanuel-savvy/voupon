import React from "react";
import { Tabs } from "react-bootstrap";
import { post_request } from "../assets/js/utils/services";
import Event from "../components/event";
import Listempty from "../components/listempty";
import Loadindicator from "../components/loadindicator";
import User_voucher_header from "../components/user_voucher_header";
import { Loggeduser } from "../Contexts";
import { get_session } from "./footer";

class User_tickets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    if (!this.loggeduser) {
      this.loggeduser = get_session("loggeduser");
      !this.loggeduser && window.history.go(-1);
    }

    let tickets = await post_request(`user_tickets`, {
      user: this.loggeduser._id,
    });

    this.setState({ tickets });
  };

  ticket_states = new Array("upcomining events", "past events");

  render() {
    let { style } = this.props;
    let { active_tab, tickets } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;
          return (
            <section class="min" style={{ ...style }}>
              <div class="container">
                <>
                  <User_voucher_header
                    voucher_filters={this.ticket_states}
                    set_voucher_filter={(filter) => this.setState({ filter })}
                    voucher_type="Tickets"
                  />

                  <div class="row justify-content-center">
                    {tickets ? (
                      tickets.length ? (
                        tickets.map(({ ticket }) => (
                          <Event
                            key={ticket._id}
                            event={ticket.event}
                            ticket_code={ticket.ticket_code}
                          />
                        ))
                      ) : (
                        <Listempty />
                      )
                    ) : (
                      <Loadindicator />
                    )}
                  </div>
                </>
              </div>
            </section>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default User_tickets;
