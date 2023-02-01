import React from "react";
import Padder from "../components/padder";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Nav from "../sections/nav";

class Tickets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Nav page="tickets" />

        <Padder />
        <Breadcrumb_banner page="tickets" title="tickets" />
        <Footer />
      </div>
    );
  }
}

export default Tickets;
