import React from "react";
import { organisation_name } from "../assets/js/utils/constants";
import Padder from "../components/padder";
import { Logged_admin } from "../Contexts";
import Admin_login from "../sections/dashboard/admin_login";
import Dashboard_landing from "../sections/dashboard/dashboard_landing";
import Dashboard_navbar from "../sections/dashboard/dashboard_navbar";
import D_vendors from "../sections/dashboard/d_vendors";
import D_vouchers from "../sections/dashboard/d_vouchers";
import D_coupons from "../sections/dashboard/d_coupons";
import D_users from "../sections/dashboard/d_users";
import Unverified_vendors from "../sections/dashboard/unverified_vendors";
import Footer, { scroll_to_top } from "../sections/footer";
import Nav from "../sections/nav";
import { emitter } from "../Voupon";
import About_statement from "../sections/dashboard/about_statement";
import Pending_users_verification from "../sections/dashboard/pending_users_verification";
import Manage_faqs from "../sections/dashboard/manage_faqs";

class Adminstrator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_nav: "dashboard",
    };
  }

  script_paths = new Array(
    "../Assets/js/raphael.min.js",
    "../Assets/js/morris.min.js",
    "../Assets/js/morris.js"
  );

  append_script = (path) => {
    const script = document.createElement("script");
    script.src = path;
    script.async = true;
    document.body.appendChild(script);
  };

  componentDidMount = () => {
    document.title = `Dashboard | ${organisation_name}`;

    this.script_paths.map((script_path) => this.append_script(script_path));

    this.dash_nav_click = (nav_title) =>
      this.setState({ current_nav: nav_title }, scroll_to_top);

    emitter.listen("dash_nav_click", this.dash_nav_click);

    let logged_admin = window.sessionStorage.getItem("logged_admin");
    if (logged_admin) {
      logged_admin = JSON.parse(logged_admin);
      this.log_admin(logged_admin);
    }
  };

  componentWillUnmount = () => {
    emitter.remove_listener("dash_nav_click", this.dash_nav_click);
  };

  nav_et_component = () =>
    new Object({
      dashboard: <Dashboard_landing />,
      vendors: <D_vendors />,
      vouchers: <D_vouchers />,
      unverified_vendors: <Unverified_vendors />,
      coupons: <D_coupons />,
      users: <D_users />,
      pending_users_verification: <Pending_users_verification />,
      about_statement: <About_statement />,
      FAQS: <Manage_faqs />,
    });

  render() {
    let { current_nav } = this.state;

    return (
      <Logged_admin.Consumer>
        {({ admin_logged, log_admin }) => {
          this.log_admin = log_admin;

          return admin_logged ? (
            <div id="main-wrapper">
              <Nav page="dashboard" />
              <Padder />
              <div className="clearfix"></div>
              <section className="gray pt-4">
                <div className="container-fluid">
                  <div className="row">
                    <Dashboard_navbar admin={admin_logged} />
                    {this.nav_et_component()[current_nav]}
                  </div>
                </div>
              </section>

              <Footer />
            </div>
          ) : (
            <Admin_login log_admin={log_admin} />
          );
        }}
      </Logged_admin.Consumer>
    );
  }
}

export default Adminstrator;
