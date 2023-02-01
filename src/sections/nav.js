import React from "react";
import { Link } from "react-router-dom";
import Login from "../components/login";
import Modal from "../components/modal";

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  navs = new Array("", "vouchers", "coupons", "tickets", "gift cards");

  render() {
    let { page } = this.props;

    return (
      <div style={{}}>
        <div
          className="header dark-text"
          style={{
            backgroundColor: "#000",
            position: "fixed",
            width: "100vw",
          }}
        >
          <div className="container">
            <nav id="navigation" className="navigation navigation-landscape">
              <div className="nav-header">
                <a className="nav-brand" href="#">
                  {/* <img src="assets/img/logo.png" className="logo" alt="" /> */}
                  <Link to="/">
                    <h2 className="text-light">Voupon</h2>
                  </Link>
                </a>
                <div className="nav-toggle"></div>
                <div className="mobile_nav">
                  <ul>
                    <li>
                      <a
                        href="javascript:void(0);"
                        data-toggle="modal"
                        data-target="#login"
                        className="crs_yuo12 w-auto text-white theme-bg"
                      >
                        <span className="embos_45">
                          <i className="fas fa-sign-in-alt mr-1"></i>Sign In
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="nav-menus-wrapper">
                <ul className="nav-menu">
                  {this.navs.map((nav) => (
                    <li
                      className={`text-light ${page === nav ? "active" : ""}`}
                    >
                      <Link to={`/${nav.replace(/ /g, "")}`}>
                        {nav || "home"}
                      </Link>
                    </li>
                  ))}
                </ul>

                <ul className="nav-menu nav-menu-social align-to-right">
                  <li>
                    <a
                      href="#"
                      onClick={this.login_modal?.toggle}
                      className="alio_green"
                      data-toggle="modal"
                      data-target="#login"
                    >
                      <i className="fas fa-sign-in-alt mr-1"></i>
                      <span className="dn-lg">Sign In</span>
                    </a>
                  </li>
                  <li className="add-listing theme-bg">
                    <Link to="/signup" className="text-white">
                      Get Started
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>

        <Modal ref={(login_modal) => (this.login_modal = login_modal)}>
          <Login />
        </Modal>
      </div>
    );
  }
}

export default Nav;
