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
    let vendors = await get_request("top_vendors");
    this.setState({ vendors });
  };

  render() {
    let { vendors } = this.state;
    if (vendors && !vendors.length) return;

    return (
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>
                  explore <span className="theme-cl">Vendors</span>
                </h2>
                <p>Search vendors & Top Brands by location and industry</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <>
              {vendors ? (
                vendors.map((vendor) => (
                  <Vendor vendor={vendor} key={vendor._id} />
                ))
              ) : (
                <div
                  style={{ width: "100%" }}
                  className="justify-content-center"
                >
                  <Loadindicator />
                </div>
              )}
            </>
          </div>

          {vendors && vendors.length ? <Explore_more to="vendors" /> : null}
        </div>
      </section>
    );
  }
}

export default Our_vendors;
