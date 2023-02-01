import React from "react";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Voucher_store from "../components/voucher_store";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Nav from "../sections/nav";

class Vouchers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    let vouchers = new Array(
      {
        image: require("../assets/img/Jiji_Logo.png"),
        title: "jiji",
      },
      {
        image: require("../assets/img/mtn.jpg"),
        title: "MTN",
      },
      {
        image: require("../assets/img/olx.png"),
        title: "olx",
      },
      {
        image: require("../assets/img/jumia.png"),
        title: "jumia",
      }
    );

    this.setState({ vouchers });
  };

  render() {
    let { vouchers } = this.state;

    return (
      <div>
        <Nav page="vouchers" />

        <Padder />
        <Breadcrumb_banner page="vouchers" />

        <section class="min">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-7 col-md-8">
                <div class="sec-heading center">
                  <h2>
                    Your favorite vendors <span class="theme-cl"></span>
                  </h2>
                  <p>Find vouchers to your favorite vendors here. </p>
                </div>
              </div>
            </div>

            <div class="row justify-content-center">
              {vouchers ? (
                vouchers.map((voucher, index) => (
                  <Voucher_store voucher={voucher} key={index} />
                ))
              ) : (
                <Loadindicator />
              )}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Vouchers;
