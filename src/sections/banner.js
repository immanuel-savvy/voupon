import React from "react";
import { Carousel } from "react-bootstrap";
import Hero_banner from "./hero_banner";
import Loadindicator from "../components/loadindicator";
import Small_btn from "../components/small_btn";
import { client_domain } from "../assets/js/utils/constants";

class Banner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    let { home } = this.props;

    let heros = new Array(
      {
        main_text:
          "Expand Your Reach: Join our Platform and increase your revenue",
        sub_text: '"Explore Vouchers, Coupons, Tickets and E.N.P.L!"',
        bg: require("../assets/img/bgg.jpg"),
        btn: home ? null : (
          <Small_btn
            title="Get Started"
            action={() => window.location.assign(`${client_domain}`)}
          />
        ),
      },
      {
        main_text:
          "We've Got Your Coupon, Vouchers, Favorite Events and Access to Products and Services All In One Place",
        sub_text: "",
        bg: require("../assets/img/hero1.png"),
      },
      {
        main_text: "Vouchers",
        sub_text: "Buy vouchers from some of your favourite stores in naira.",
        bg: require("../assets/img/vouchers1.png"),
        overlay: 7,
      },
      {
        main_text: "Tickets",
        sub_text: "The best events happening now",
        bg: require("../assets/img/tickets2.jpeg"),
      },

      {
        main_text: "Coupons",
        sub_text: "Get discount on your favorite product here",
        bg: require("../assets/img/coupons1.jpg"),
        overlay: 9,
      }
    );

    this.setState({ heros });
  };

  render() {
    let { heros } = this.state;

    return heros ? (
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
    );
  }
}

export default Banner;
