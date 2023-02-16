import React from "react";
import { get_request, post_request } from "../assets/js/utils/services";
import Explore_more from "../components/explore_more";
import Loadindicator from "../components/loadindicator";
import Voucher_store from "../components/voucher_store";

class Featured_vouchers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { vouchers, vendors } = await get_request("get_offer_vouchers/10");

    this.setState({ vouchers, vendors });
  };

  render() {
    let { vouchers, vendors } = this.state;
    if (vouchers && !vouchers.length) return;

    return (
      <section className="gray">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-7 col-md-8">
              <div class="sec-heading center">
                <h2>
                  explore Offer <span class="theme-cl">Vouchers</span>
                </h2>
                <p>
                  Get vouchers by your favorite vendors at discounted prices
                </p>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            {vouchers ? (
              vouchers.map((voucher) => (
                <Voucher_store
                  voucher={voucher}
                  vendor={
                    voucher.vendor?._id
                      ? voucher.vendor
                      : vendors[voucher.vendor]
                  }
                />
              ))
            ) : (
              <Loadindicator />
            )}
          </div>

          <Explore_more to="vouchers" />
        </div>
      </section>
    );
  }
}

export default Featured_vouchers;
