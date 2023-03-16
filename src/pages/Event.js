import React from "react";
import { organisation_name } from "../assets/js/utils/constants";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Voucher_overview from "../components/voucher_overview";
import Voucher_sidebar from "../components/voucher_sidebar";
import Footer, { get_session } from "../sections/footer";
import Custom_Nav from "../sections/nav";
import Voucher_header from "./voucher_header";

class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    let event = get_session("event");

    if (event) document.title = `${event.title} | ${organisation_name}`;

    this.setState({ event, vendor: get_session("vendor") });
  };

  on_transfer = () => this.setState({ transferred: true });

  on_redeem = () => this.setState({ redeemed: true });

  render() {
    let { event, vendor, transferred, redeemed } = this.state;
    if (!event) return <Loadindicator />;

    if (transferred) event.state = "transferred";
    if (redeemed) event.state = "redeemed";
    let { ticket_code } = event;

    return (
      <div>
        <Custom_Nav page="event" />
        <Padder />

        <Voucher_header event={event} vendor={vendor} />

        <section class="gray pt-5">
          <div class="container">
            <div class="row">
              <Voucher_overview
                ticket_code={ticket_code}
                event={event}
                vendor={vendor}
              />

              <Voucher_sidebar
                ticket_code={ticket_code}
                on_redeem={this.on_redeem}
                on_transfer={this.on_transfer}
                event={event}
                vendor={vendor}
              />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

export default Event;
