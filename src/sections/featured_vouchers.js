import React from "react";
import { post_request } from "../assets/js/utils/services";
import Loadindicator from "../components/loadindicator";
import Voucher_store from "../components/voucher_store";

class Featured_vouchers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let vouchers = await post_request("get_offer_vouchers/10");

    this.setState({ vouchers });
  };

  render() {
    let { vouchers } = this.state;
    if (vouchers && !vouchers.length) return;

    return (
      <section>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-7 col-md-8">
              <div class="sec-heading center">
                <h2>
                  explore Featured <span class="theme-cl">Cources</span>
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </p>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            {vouchers ? (
              vouchers.map((voucher) => (
                <Voucher_store voucher={voucher} vendor={voucher.vendor} />
              ))
            ) : (
              <Loadindicator />
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Featured_vouchers;
