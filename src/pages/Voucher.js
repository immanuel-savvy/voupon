import React from "react";
import { organisation_name } from "../assets/js/utils/constants";
import { to_title } from "../assets/js/utils/functions";
import { get_request } from "../assets/js/utils/services";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Voucher_overview from "../components/voucher_overview";
import Voucher_sidebar from "../components/voucher_sidebar";
import Footer, { get_session } from "../sections/footer";
import Custom_Nav from "../sections/nav";
import Voucher_header from "./voucher_header";

class Voucher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let voucher = get_session("voucher");
    let vendor = get_session("vendor");

    if (!voucher) {
      let href = window.location.href.split("/").slice(-2);

      let details = await get_request(`voucher_page/${href[1]}/${href[0]}`);

      voucher = details?.voucher;
      vendor = details?.vendor;
    }

    if (voucher)
      document.title = `${to_title(voucher.title)} | ${organisation_name}`;
    else return window.history.go(-1);

    this.setState({ voucher, vendor });
  };

  on_transfer = () => this.setState({ transferred: true });

  on_redeem = () => this.setState({ redeemed: true });

  render() {
    let { voucher, vendor, transferred, redeemed } = this.state;
    if (!voucher) return <Loadindicator />;

    if (transferred) voucher.state = "transferred";
    if (redeemed) voucher.state = "redeemed";

    return (
      <div>
        <Custom_Nav page="voucher" />
        <Padder />

        <Voucher_header voucher={voucher} vendor={vendor} />

        <section class="gray pt-5">
          <div class="container">
            <div class="row">
              <Voucher_overview voucher={voucher} vendor={vendor} />

              <Voucher_sidebar
                on_redeem={this.on_redeem}
                on_transfer={this.on_transfer}
                voucher={voucher}
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

export default Voucher;
