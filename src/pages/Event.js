import React from "react";
import { organisation_name } from "../assets/js/utils/constants";
import { to_title } from "../assets/js/utils/functions";
import { get_request } from "../assets/js/utils/services";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Voucher_overview from "../components/voucher_overview";
import Voucher_sidebar from "../components/voucher_sidebar";
import Footer, { get_session, scroll_to_top } from "../sections/footer";
import Custom_Nav from "../sections/nav";
import Voucher_header from "./voucher_header";

class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let event = get_session("event");
    let vendor = get_session("vendor");

    if (!event) {
      let href = window.location.href.split("/").slice(-2);

      // if (!href || (href && !href.startsWith("event")))
      //   return window.history.go(-1);

      let details = await get_request(`event_page/${href[0]}/${href[1]}`);
      event = details?.event;
      vendor = details?.vendor;
    }

    if (event)
      document.title = `${to_title(event.title)} | ${organisation_name}`;
    else return window.history.go(-1);

    this.setState({ event, vendor });

    scroll_to_top();
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
