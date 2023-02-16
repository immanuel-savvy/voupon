import React from "react";
import { get_request } from "../assets/js/utils/services";
import Explore_more from "../components/explore_more";
import Loadindicator from "../components/loadindicator";
import Vendor from "../components/vendor";

class Our_vendors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let vendors = await get_request("vendors/10");
    vendors = [...vendors, ...vendors, ...vendors, ...vendors];
    this.setState({ vendors });
  };

  render() {
    let { vendors } = this.state;
    if (vendors && !vendors.length) return;

    return (
      <section>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-7 col-md-8">
              <div class="sec-heading center">
                <h2>
                  explore <span class="theme-cl">Vendors</span>
                </h2>
                <p>
                  In dolore sint duis in est et. Exercitation do ex proident
                  occaecat.
                </p>
              </div>
            </div>
          </div>
          <div class="row ">
            <div
              style={{
                overflow: "scroll",
                flexDirection: "row",
                display: "flex",
                paddingTop: 30,
                paddingBottom: 30,
              }}
            >
              {vendors ? (
                vendors.map((vendor) => <Vendor vendor={vendor} />)
              ) : (
                <Loadindicator />
              )}
            </div>
          </div>

          <Explore_more to="vendors" />
        </div>
      </section>
    );
  }
}

export default Our_vendors;
