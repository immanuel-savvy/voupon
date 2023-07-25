import React from "react";
import Modal from "./modal";
import Premium_user from "./premium_user";
import Stretch_button from "./stretch_button";
import { client_domain } from "../assets/js/utils/constants";

class Packages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_premium = (e) => {
    this.premium?.toggle();
  };

  render() {
    return (
      <section className="min gray">
        <div className="container justify-content-center">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>
                  Become a Premium <span className="theme-cl">User</span>
                </h2>
                <p>
                  Get verified, enjoy access to premium coupons and get 20%
                  discount on transaction fee
                </p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-4">
              <div className="pricing_wrap">
                <div className="prt_head">
                  <h4>Basic</h4>
                </div>
                <div className="prt_price">
                  <h2>
                    <span>Free</span>
                  </h2>
                </div>
                <div className="prt_body">
                  <ul>
                    <li>Explore Top brands discounted vouchers</li>
                    <li>Enjoy access to open coupons</li>
                    <li>Buy tickets without limitations</li>
                    <li>Redeem vouchers and use coupons</li>
                    <li>Transact seamlessly in Local currency</li>
                    <li>Basic vendor can only create maximum of 10 offers</li>
                    <li>Get verified for 3,000 NGN</li>
                  </ul>
                </div>
                <div className="prt_footer">
                  <a className="btn choose_package">Free</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="pricing_wrap">
                <div className="prt_head">
                  <div className="recommended">Best Value</div>
                  <h4>Premium</h4>
                </div>
                <div className="prt_price">
                  <h2>
                    <span>&#8358;</span>20,000
                  </h2>
                  <span>per user, per year</span>
                </div>
                <div className="prt_body">
                  <ul>
                    <li>Access all basic benefits.</li>
                    <li>
                      Unlock unlimited access to premium Offerings - including
                      Premium Coupon, Free Tickets and all ENPL Offers
                    </li>
                    <li>
                      Earn 10% Referral Bonus on every VIP subscriber referred.
                    </li>
                    <li>Enjoy upto 20% Discount on Transaction FEE</li>
                    <li>Get Verification Badge FREE</li>
                    <li>Upload unlimited offerings.</li>
                  </ul>
                </div>
                <div className="prt_footer">
                  <Stretch_button
                    class_name="btn choose_package active"
                    action={this.toggle_premium}
                    title="Subscribe"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="pricing_wrap">
                <div className="prt_head">
                  <h2>Partner</h2>
                </div>
                <div className="prt_price">
                  <span>
                    Share in Global Earnings of Transaction FEE (10% of total
                    revenue generated shall be shared to all VIP users in
                    accordance to Reward Token)
                  </span>
                </div>
                <div className="prt_body">
                  <ul></ul>
                </div>
                <div className="prt_footer">
                  <Stretch_button
                    class_name="btn choose_package active"
                    action={() =>
                      window.location.assign(
                        `${client_domain}/become_a_partner`
                      )
                    }
                    title="Get Started"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal ref={(premium) => (this.premium = premium)}>
          <Premium_user init toggle={this.toggle_premium} />
        </Modal>
      </section>
    );
  }
}

export default Packages;
