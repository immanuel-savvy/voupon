import React from "react";
import Padder from "../components/padder";
import Section_header from "../components/section_headers";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Custom_nav from "../sections/nav";

class Marketplace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Custom_nav page="marketplace" />
        <Padder />
        <Breadcrumb_banner
          page="marketplace"
          bg={require("../assets/img/coupons1.jpg")}
        />

        <section className="min">
          <div className="container">
            <Section_header title="Market Place" description="IN PROGRESS..." />
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

export default Marketplace;
