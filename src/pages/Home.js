import React from "react";
import { Carousel } from "react-bootstrap";
import Loadindicator from "../components/loadindicator";
import Featured_vouchers from "../sections/featured_vouchers";
import Footer from "../sections/footer";
import Hero_banner from "../sections/hero_banner";
import Nav from "../sections/nav";
import Our_vendors from "../sections/our_vendors";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { index: 0 };
  }
  componentDidMount = () => {
    let heros = new Array(
      {
        main_text:
          "We've Got Your Coupon, Vouchers, Gift Cards And Favorite Events All In One Place",
        sub_text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
        bg: require("../assets/img/hero1.png"),
      },
      {
        main_text: "Vouchers",
        sub_text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
        bg: require("../assets/img/vouchers1.png"),
        overlay: 7,
      },
      {
        main_text: "Tickets",
        sub_text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
        bg: require("../assets/img/tickets2.jpeg"),
      },

      {
        main_text: "Coupons",
        sub_text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
        bg: require("../assets/img/coupons1.jpg"),
        overlay: 9,
      },
      {
        main_text: "Gift cards",
        sub_text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
        bg: require("../assets/img/giftcard1.jpg"),
        overlay: 8,
      }
    );

    this.setState({ heros });
  };

  render() {
    let { heros } = this.state;

    return (
      <div>
        <Nav page="" />
        <div className="body">
          {heros ? (
            <div
              style={{
                backgroundImage: `url(${require("../assets/img/hero1.png")})`,
              }}
            >
              <Carousel fade nextLabel="" prevLabel="" indicators={false}>
                {heros.map((hero, index) => (
                  <Carousel.Item>
                    <Hero_banner hero={hero} key={index} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          ) : (
            <Loadindicator />
          )}

          <Our_vendors />
          <Featured_vouchers />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
