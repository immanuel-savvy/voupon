import React from "react";
import { get_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Vendor from "../../components/unverified_vendor";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Unverified_vendors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let vendors = await get_request("unverified_vendors");

    this.setState({ vendors });
  };

  on_verify = (vendor) => {
    let { vendors } = this.state;

    vendors = vendors.filter((v) => v._id !== vendor._id);
    this.setState({ vendors });
  };

  render() {
    let { vendors } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="unverified vendors" />
        <div className="row">
          {vendors ? (
            vendors.length ? (
              vendors.map((vendor) => <Vendor vendor={vendor} />)
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

export default Unverified_vendors;
