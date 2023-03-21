import React from "react";
import { post_request } from "../assets/js/utils/services";
import Listempty from "./listempty";
import Loadindicator from "./loadindicator";
import Ticket from "./ticket";

class Event_tickets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { event } = this.props;
    let tickets = await post_request("event_tickets", { event: event._id });

    this.setState({ tickets });
  };

  render() {
    let { toggle, event } = this.props;
    let { tickets } = this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <div class="modal-header">
            <h5 class="modal-title">Event Tickets</h5>
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
            <div class="login-form">
              {tickets ? (
                tickets.length ? (
                  tickets.map((ticket) => (
                    <Ticket
                      full
                      event={event}
                      ticket={ticket}
                      key={ticket._id}
                    />
                  ))
                ) : (
                  <Listempty />
                )
              ) : (
                <Loadindicator />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Event_tickets;
