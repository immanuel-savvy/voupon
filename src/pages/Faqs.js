import React from "react";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Padder from "../components/padder";
import Custom_nav from "../sections/nav";
import Footer from "../sections/footer";
import { default as Faqs_ } from "../sections/faqs";
import Contact_us_today from "../components/contact_us_today";

class Faqs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="main-wrapper">
        <Custom_nav page="faq" />
        <Padder />

        <Breadcrumb_banner page="FAQ" title="What you need to know" />
        <Faqs_ />
        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default Faqs;
