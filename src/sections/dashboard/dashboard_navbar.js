import React from "react";
import Admin_card from "./admin_card";
import Dashboard_nav_menu from "./dashboard_nav_menu";

class Dashboard_navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { admin } = this.props;

    return (
      <div class="col-lg-3 col-md-3">
        <div class="dashboard-navbar">
          <Admin_card />
          <Dashboard_nav_menu admin={admin} />
        </div>
      </div>
    );
  }
}

export default Dashboard_navbar;
