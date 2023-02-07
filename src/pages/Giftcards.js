import React from "react";
import Padder from "../components/padder";
import Footer from "../sections/footer";
import Nav from "../sections/nav";

class Giftcards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Nav page="gift cards" />
        <Padder />
        <Footer />
      </div>
    );
  }
}

export default Giftcards;
