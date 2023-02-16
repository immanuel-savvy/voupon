import React from "react";
import { get_request } from "../assets/js/utils/services";
import Loadindicator from "./loadindicator";
import Listempty from "./listempty";
import Voucher from "./voucher";
import { emitter } from "./../Voupon";

class Vendor_vouchers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { vendor } = this.props;
    let offer_vouchers = await get_request(`offer_vouchers/${vendor._id}`);

    this.setState({ offer_vouchers });

    this.new_offer_voucher = (voucher) => {
      if (voucher.vendor !== vendor._id) return;

      let { offer_vouchers } = this.state;
      offer_vouchers = new Array(voucher, ...offer_vouchers);
      this.setState({ offer_vouchers });
    };
    emitter.listen("new_offer_voucher", this.new_offer_voucher);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("new_offer_voucher", this.new_offer_voucher);
  };

  render() {
    let { vendor } = this.props;
    let { offer_vouchers } = this.state;

    return (
      <div className="container">
        <div class="row justify-content-center">
          <div class="col-lg-7 col-md-8">
            <div class="sec-heading center">
              <h2>
                Offer <span class="theme-cl">Vouchers</span>
              </h2>
              <p>Vouchers that are service specific.</p>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          {offer_vouchers ? (
            offer_vouchers.length ? (
              offer_vouchers.map((voucher) => (
                <Voucher
                  in_vendor
                  vendor={vendor}
                  voucher={voucher}
                  key={voucher._id}
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
    );
  }
}

export default Vendor_vouchers;
