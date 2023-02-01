import React from "react";

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div
        className="header dark-text"
        style={{ backgroundColor: "#000", position: "fixed", width: "100vw" }}
      >
        <div className="container">
          <nav id="navigation" className="navigation navigation-landscape">
            <div className="nav-header">
              <a className="nav-brand" href="#">
                {/* <img src="assets/img/logo.png" className="logo" alt="" /> */}
                <h2 className="text-light">Voupon</h2>
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
                <li className="text-light active">
                  <a href="#">Home</a>
                </li>
                <li className="text-light">
                  <a href="#">Vouchers</a>
                </li>
                <li className="text-light">
                  <a href="#">Coupons</a>
                </li>
                <li className="text-light">
                  <a href="#">Gift Cards</a>
                </li>
              </ul>

              <ul className="nav-menu nav-menu-social align-to-right">
                <li>
                  <a
                    href="#"
                    className="alio_green"
                    data-toggle="modal"
                    data-target="#login"
                  >
                    <i className="fas fa-sign-in-alt mr-1"></i>
                    <span className="dn-lg">Sign In</span>
                  </a>
                </li>
                <li className="add-listing theme-bg">
                  <a href="signup.html" className="text-white">
                    Get Started
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Nav;
