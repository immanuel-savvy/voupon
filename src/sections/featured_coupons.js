import React from "react";
import { get_request, post_request } from "../assets/js/utils/services";
import Coupon from "../components/coupon";
import Explore_more from "../components/explore_more";
import Loadindicator from "../components/loadindicator";

class Featured_coupons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let coupons = await post_request("coupons", { limit: 8 });

    this.setState({ coupons });
  };

  render() {
    let { coupons } = this.state;
    if (coupons && !coupons.length) return;

    return (
      <section className="gray">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-7 col-md-8">
              <div class="sec-heading center">
                <h2>
                  explore featured <span class="theme-cl">Coupons</span>
                </h2>
                <p>Get discount on your favorite product here</p>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            {coupons ? (
              coupons.map((coupon) => <Coupon coupon={coupon} />)
            ) : (
              <Loadindicator />
            )}
          </div>

          <Explore_more to="coupons" />
        </div>
      </section>
    );
  }
}

export default Featured_coupons;
