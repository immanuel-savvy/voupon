import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import { post_request } from "../assets/js/utils/services";
import { save_to_session } from "../sections/footer";
import Event from "./event";
import Listempty from "./listempty";
import Loadindicator from "./loadindicator";
import Modal from "./modal";
import User_voucher_header from "./user_voucher_header";
import Use_ticket from "./use_ticket";
import Verify_ticket from "./verify_ticket";

class Vendor_tickets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { vendor } = this.props;

    let events = await post_request("vendor_events", { vendor: vendor._id });
    this.setState({ events });
  };

  event_states = new Array("upcoming", "past");

  toggle_use_ticket = () => this.use_ticket?.toggle();

  toggle_verify_ticket = () => this.verify_ticket?.toggle();

  render() {
    let { vendor, loggeduser } = this.props;
    let { events, filter } = this.state;

    return (
      <div className="container">
        <div class="row justify-content-center">
          <div class="col-lg-7 col-md-8">
            <div class="sec-heading center">
              <h2>
                Events<span class="theme-cl"></span>
              </h2>
              <p>Your Events.</p>
            </div>
          </div>
        </div>
        {vendor._id === loggeduser?.vendor ? (
          <User_voucher_header
            voucher_filters={this.event_states}
            set_voucher_filter={(filter) => this.setState({ filter })}
            voucher_type={"Events"}
            side_buttons={
              new Array(
                {
                  title: "create event",
                  action: () => {
                    window.location.assign(`${client_domain}/create_event`);
                    save_to_session("vendor", vendor);
                  },
                },
                { title: "use ticket", action: this.toggle_use_ticket }
              )
            }
          />
        ) : null}
        <div className="row align-items-center">
          {events ? (
            events.length ? (
              events.map(({ event }) =>
                event.state === filter ||
                (!event.state && filter === "running") ? (
                  <Event
                    in_vendor
                    vendor={vendor}
                    event={event}
                    key={event._id}
                  />
                ) : null
              )
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>

        <Modal ref={(use_ticket) => (this.use_ticket = use_ticket)}>
          <Use_ticket toggle={this.toggle_use_ticket} vendor={vendor} />
        </Modal>
      </div>
    );
  }
}

export default Vendor_tickets;
