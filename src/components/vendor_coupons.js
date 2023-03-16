import React from "react";
import { post_request } from "../assets/js/utils/services";
import Loadindicator from "./loadindicator";
import Listempty from "./listempty";
import { emitter } from "./../Voupon";
import User_voucher_header from "./user_voucher_header";
import Modal from "./modal";
import Coupon from "./coupon";
import { Tab, Tabs } from "react-bootstrap";
import { to_title } from "../assets/js/utils/functions";
import Create_coupon from "./create_coupon";

const coupon_types = new Array("open", "premium");

class Vendor_coupons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      state: this.coupon_states[0],
    };
  }

  coupon_states = new Array("running", "closed", "expired");

  componentDidMount = async () => {
    let { vendor } = this.props;

    let { open_coupons, premium_coupons } = await post_request(
      `vendor_coupons/${vendor._id}`
    );

    this.setState({ open_coupons, premium_coupons });

    this.new_coupon = (coupon) => {
      if (coupon.vendor !== vendor._id) return;

      let { open_coupons, premium_coupons } = this.state;
      if (coupon.type === "open")
        open_coupons = new Array(coupon, ...open_coupons);
      else premium_coupons = new Array(coupon, ...premium_coupons);

      this.setState({ open_coupons, premium_coupons });
    };
    emitter.listen("new_coupon", this.new_coupon);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("new_coupon", this.new_coupon);
  };

  toggle_create_coupon = () => this.create_coupon?.toggle();

  toggle_premium_coupon = () => this.premium_coupon?.toggle();

  render() {
    let { vendor } = this.props;
    let { filter } = this.state;

    return (
      <div className="container">
        <Tabs defaultActiveKey={coupon_types[0]}>
          {coupon_types.map((type) => {
            return (
              <Tab
                eventKey={type}
                title={`${to_title(type)} Coupons`}
                key={type}
              >
                <User_voucher_header
                  voucher_filters={this.coupon_states}
                  side_buttons={
                    new Array({
                      title: `create coupon`,
                      action: this.toggle_create_coupon,
                    })
                  }
                  set_voucher_filter={(filter) => this.setState({ filter })}
                />
                <div className="row align-items-center">
                  {this.state[`${type}_coupons`] ? (
                    this.state[`${type}_coupons`].length ? (
                      this.state[`${type}_coupons`].map((coupon) =>
                        coupon.state === filter ||
                        (!coupon.state && filter === "running") ? (
                          <Coupon
                            in_vendor
                            vendor={vendor}
                            coupon={coupon}
                            key={coupon._id}
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
              </Tab>
            );
          })}
        </Tabs>

        <Modal ref={(create_coupon) => (this.create_coupon = create_coupon)}>
          <Create_coupon toggle={this.toggle_create_coupon} vendor={vendor} />
        </Modal>
      </div>
    );
  }
}

export default Vendor_coupons;
export { coupon_types };
