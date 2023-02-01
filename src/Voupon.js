import React from "react";
import "./assets/css/styles.css";
import Loadindicator from "./components/loadindicator";
import Hero_banner from "./sections/hero_banner";
import Nav from "./sections/nav";

class Voupon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  script_paths = new Array(
    "jquery.min.js",
    "popper.min.js",
    "bootstrap.min.js",
    "select2.min.js",
    "slick.js",
    "moment.min.js",
    "daterangepicker.js",
    "summernote.min.js",
    "metisMenu.min.js",
    "custom.js",
    "my_custom.js"
  );

  append_script = (path) => {
    const script = document.createElement("script");
    script.src = `http://localhost:3000/js/${path}`;
    script.type = "text/babel";
    script.async = false;
    document.body.appendChild(script);
  };

  componentDidMount = () => {
    this.script_paths.map((scr) => this.append_script(scr));

    let heros = new Array(
      {
        main_text:
          "We've Got Your Coupon, Vouchers, Gift Cards And Favorite Event All In One Place",
        sub_text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      },
      {
        main_text: "Vouchers",
        sub_text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      },

      {
        main_text: "Coupons",
        sub_text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      },
      {
        main_text: "Gift cards",
        sub_text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      }
    );

    this.setState({ heros });
  };

  render() {
    let { heros } = this.state;

    return (
      <div>
        <Nav />
        {heros ? (
          heros.map((hero, index) => <Hero_banner hero={hero} key={index} />)
        ) : (
          <Loadindicator />
        )}
      </div>
    );
  }
}

export default Voupon;
