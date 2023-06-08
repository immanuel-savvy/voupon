import React from "react";
import Modal from "./modal";
import Premium_user from "./premium_user";
import Stretch_button from "./stretch_button";

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
            <div className="col-lg-6 col-md-6">
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
                    <li>Access to All Open Coupons</li>
                    <li>Create Vouchers</li>
                    <li className="none">Share in Platform Revenue</li>
                    <li className="none">
                      Only Premium Users can get verified and thus would be able
                      to explore Pay Small Small (Minimum of 1M Reward Token as
                      collateral)
                    </li>
                    <li className="none">20% Discount on Transaction FEE</li>
                  </ul>
                </div>
                <div className="prt_footer">
                  <a className="btn choose_package">Free</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="pricing_wrap">
                <div className="prt_head">
                  <div className="recommended">Best Value</div>
                  <h4>Premium</h4>
                </div>
                <div className="prt_price">
                  <h2>
                    <span>&#8358;</span>15,000
                  </h2>
                  <span>per user, per year</span>
                </div>
                <div className="prt_body">
                  <ul>
                    <li>All of the values of basic user</li>
                    <li>Unlock Access to All Premium and Open Coupons</li>
                    <li>50% Discount on Transaction FEE</li>
                    <li>Share in Platform Revenue</li>
                    {/* <li>
                      Only Premium Users can get verified and thus would be able
                      to explore Pay Small Small (Minimum of 1M Reward Token as
                      collateral)
                    </li> */}
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
