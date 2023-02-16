import React from "react";
import { get_request } from "../assets/js/utils/services";
import Listempty from "../components/listempty";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Vendor from "../components/vendor";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Custom_Nav from "../sections/nav";

class Vendors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let vendors = await get_request("vendors/all");
    this.setState({ vendors });
  };

  render() {
    let { vendors } = this.state;

    return (
      <div>
        <Custom_Nav page="vendors" />
        <Padder />

        <Breadcrumb_banner page="Vendors" />

        <section class="min gray">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-7 col-md-8">
                <div class="sec-heading center">
                  <h2>
                    Vendors <span class="theme-cl"></span>
                  </h2>
                  <p>Find your favorite vendors here. </p>
                </div>
              </div>
            </div>

            <div class="row justify-content-center">
              {vendors ? (
                vendors.length ? (
                  vendors.map((vendor) => (
                    <Vendor vendor={vendor} key={vendor._id} />
                  ))
                ) : (
                  <Listempty />
                )
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

export default Vendors;
