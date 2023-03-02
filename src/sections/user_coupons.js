import React from "react";
import { get_request } from "../assets/js/utils/services";
import Coupon from "../components/coupon";
import Listempty from "../components/listempty";
import Loadindicator from "../components/loadindicator";
import User_voucher_header from "../components/user_voucher_header";
import { coupon_types } from "../components/vendor_coupons";
import { Loggeduser } from "../Contexts";

const voucher_tabs = new Array("open coupons", "offer coupons");

class User_coupons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active_tab: voucher_tabs[0],
      type: "unused",
    };
  }

  componentDidMount = async () => {
    if (!this.loggeduser) {
      this.loggeduser = window.sessionStorage.getItem("loggeduser");
      if (this.loggeduser) this.loggeduser = JSON.parse(this.loggeduser);
      else window.history.go(-1);
    }

    let coupons = await get_request(`user_coupons/${this.loggeduser._id}`);

    this.setState({ coupons });
  };

  on_create_open_voucher = (coupon) => {
    let { open_vouchers } = this.state;

    open_vouchers = new Array(coupon, ...open_vouchers);
    this.setState({ open_vouchers });
  };

  toggle_create_voucher = () => this.create_voucher?.toggle();

  voucher_states = new Array("unused", "used", "redeemed");

  render() {
    let { type, coupons } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;
          return (
            <section class="min" style={{ padding: 0 }}>
              <div class="container">
                <div class="row justify-content-center">
                  <User_voucher_header
                    voucher_filters={this.coupon_states}
                    voucher_type="Premium Coupons"
                  />

                  {coupons ? (
                    coupons.length ? (
                      coupons.map((coupon, index) =>
                        coupon.state === type ||
                        (!coupon.state && type === "unused") ? (
                          <Coupon
                            coupon={{
                              ...coupon.coupon,
                              coupon_code: coupon.coupon_code,
                            }}
                            in_user
                            key={index}
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
              </div>
            </section>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default User_coupons;
