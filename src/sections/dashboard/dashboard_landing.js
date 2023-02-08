import React from "react";
import { get_request } from "../../assets/js/utils/services";
import Loadindicator from "../../components/loadindicator";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Dashboard_landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  stat = () => {
    return (
      <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
        <div class="dashboard_stats_wrap">
          <div class="rounded-circle p-4 p-sm-4 d-inline-flex align-items-center justify-content-center theme-bg mb-2">
            <div class="position-absolute text-white h5 mb-0">
              <i class="fas fa-book"></i>
            </div>
          </div>
          <div class="dashboard_stats_wrap_content">
            <h4>607</h4> <span>Number of Cources</span>
          </div>
        </div>
      </div>
    );
  };

  componentDidMount = async () => {
    let stats = await get_request("stats");
    this.setState({ stats });
  };

  render() {
    let { stats } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="unverified vendors" />
        <div className="row">
          {stats ? stats.map((stat) => this.stat(stat)) : <Loadindicator />}
        </div>
      </div>
    );
  }
}

export default Dashboard_landing;
