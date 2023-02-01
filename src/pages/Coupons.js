import React from "react";
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
        <Nav />
        <Footer />
      </div>
    );
  }
}

export default Coupons;
