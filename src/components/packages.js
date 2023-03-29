import React from "react";
import Modal from "./modal";
import Premium_user from "./premium_user";

class Packages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_premium = (e) => {
    e.preventDefault();
    this.premium?.toggle();
  };

  render() {
    return (
      <section className="min gray">
        <div className="container justify-content-center">
          <div class="row justify-content-center">
            <div class="col-lg-7 col-md-8">
              <div class="sec-heading center">
                <h2>
                  Become a Premium <span class="theme-cl">User</span>
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
            <div class="col-lg-6 col-md-6">
              <div class="pricing_wrap">
                <div class="prt_head">
                  {/* <div class="recommended">Best Value</div> */}
                  <h4>Premium</h4>
                </div>
                <div class="prt_price">
                  <h2>
                    <span>$</span>20
                  </h2>
                  <span>per user, per year</span>
                </div>
                <div class="prt_body">
                  <ul>
                    <li>Unlock Access to All Premium Coupons</li>
                    <li>20% Discount on Transaction FEE</li>
                    <li>10GB Cloud Storage</li>
                    <li>Share in Platform Revenue</li>
                    <li>
                      Only Premium Users can get verified and thus would be able
                      to explore ENPL (Minimum of 1M Reward Token as collateral)
                    </li>
                    {/* <li class="none">Enterprise SLA</li> */}
                  </ul>
                </div>
                <div class="prt_footer">
                  <a
                    href="#"
                    onClick={this.toggle_premium}
                    class="btn choose_package active"
                  >
                    Subscribe
                  </a>
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
