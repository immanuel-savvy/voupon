import React from "react";
import Packages from "../components/packages";
import Upcoming_events from "../components/upcoming_events";
import { Loggeduser } from "../Contexts";
import Faqs from "../sections/faqs";
import Featured_coupons from "../sections/featured_coupons";
import Featured_vouchers from "../sections/featured_vouchers";
import Footer, { scroll_to_top } from "../sections/footer";
import Nav from "../sections/nav";
import Our_vendors from "../sections/our_vendors";
import Enjoy_now_pay_later from "../sections/enjoy_now_pay_later";
import Banner from "../sections/banner";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { index: 0 };
  }

  componentDidMount = () => scroll_to_top();

  render() {
    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          return (
            <div>
              <Nav page="" />
              <div className="body">
                <Banner />

                <Upcoming_events />
                <Enjoy_now_pay_later />
                <Featured_vouchers />
                <Featured_coupons />

                <Our_vendors />

                {loggeduser && loggeduser.premium ? null : <Packages />}

                <Faqs />
              </div>
              <Footer />
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Home;
