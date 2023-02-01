import React from "react";
import Padder from "../components/padder";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Nav from "../sections/nav";

class Coupons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Nav page="coupons" />
        <Padder />
        <Breadcrumb_banner />

        <Footer />
      </div>
    );
  }
}

export default Coupons;
