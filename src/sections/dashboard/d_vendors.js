import React from "react";
import { get_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Vendor from "../../components/vendor";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class D_vendors extends React.Component {
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
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="vendors" />
        <div className="row">
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
    );
  }
}

export default D_vendors;
