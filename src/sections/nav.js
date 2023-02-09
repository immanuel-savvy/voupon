import React from "react";
import { Link } from "react-router-dom";
import { client_domain } from "../assets/js/utils/constants";
import Login from "../components/login";
import Modal from "../components/modal";
import { Loggeduser } from "../Contexts";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { to_title } from "../assets/js/utils/functions";
import Redeem_voucher from "../components/redeem_voucher";
import Verify_voucher from "../components/verify_voucher";
import Create_open_voucher from "../components/create_open_voucher";

let navs = new Array(
  "",
  "vouchers",
  "coupons",
  "tickets",
  "gift cards",
  "become a vendor",
  "login",
  "signup"
);

let subnavs = new Object({
  vouchers: new Array(
    "my_vouchers",
    "create_voucher",
    "redeem_voucher",
    "verify_voucher"
  ),
});

class Custom_Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  my_vouchers = () => window.location.assign(`${client_domain}/user_vouchers`);

  create_voucher = () => this.create_voucher_?.toggle();

  verify_voucher = () => this.verify_voucher_?.toggle();

  redeem_voucher = () => this.redeem_voucher_?.toggle();

  toggle = () =>
    this.setState({
      isOpen: !this.state.isOpen,
    });

  toggle_login = () => this.login_modal?.toggle();

  go_to_profile = () => window.location.assign(`${client_domain}/profile`);

  subnav_actions = (subnav) => {
    return this[subnav];
  };

  render() {
    let { current_nav } = this.state;
    let { page } = this.props;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser, logout }) => {
          return (
            <div style={{}}>
              <div
                className="header"
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  position: "fixed",
                  width: "100vw",
                }}
              >
                <div className="container">
                  <div
                    id="navigation"
                    className="navigation navigation-landscape"
                  >
                    <Navbar dark expand="lg">
                      <NavbarBrand href="/" className="nav-brand">
                        {/* <img src="assets/img/logo.png" className="logo" alt="" /> */}
                        <h2 className="text-light">Voupon</h2>
                      </NavbarBrand>
                      <NavbarToggler
                        style={{ color: "#fff" }}
                        onClick={this.toggle}
                      />

                      <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav
                          className="ml-auto"
                          navbar
                          style={{ alignItems: "center" }}
                        >
                          {navs.map((nav, index) => {
                            if (
                              nav === "become a vendor" &&
                              loggeduser &&
                              loggeduser.vendor
                            )
                              nav = "vendor";

                            let sub = subnavs[nav];
                            if (nav === "vouchers") {
                              if (!loggeduser)
                                sub = sub.filter((s) => s !== "my_vouchers");
                            }
                            return sub && sub.length ? (
                              <UncontrolledDropdown key={index} nav inNavbar>
                                <DropdownToggle
                                  style={{
                                    backgroundColor: "transparent",
                                  }}
                                  nav
                                  caret
                                  ref={(dropdown) =>
                                    (this[`main_dropdown_${index}`] = dropdown)
                                  }
                                  onMouseOver={() => {
                                    let comp = this[`main_dropdown_${index}`];
                                    !comp.context.isOpen &&
                                      comp.context.toggle();
                                    this.setState({ current_nav: nav });
                                  }}
                                  onMouseMove={() => {
                                    let comp = this[`main_dropdown_${index}`];
                                    current_nav !== nav &&
                                      comp.context.isOpen &&
                                      comp.context.toggle();
                                  }}
                                  onClick={() =>
                                    window.location.assign(
                                      `${client_domain}/${nav}`
                                    )
                                  }
                                >
                                  <span style={{ color: "#fff" }}>
                                    {to_title(nav.replace(/_/g, " "))}
                                  </span>
                                </DropdownToggle>
                                {current_nav === nav ? (
                                  <DropdownMenu
                                    className="nav-dropdown nav-submenu"
                                    end
                                  >
                                    {sub.map((subnav) => (
                                      <li
                                        style={{ cursor: "pointer" }}
                                        key={index}
                                      >
                                        <a
                                          onClick={this.subnav_actions(subnav)}
                                        >
                                          {to_title(subnav.replace(/_/g, " "))}
                                        </a>
                                      </li>
                                    ))}
                                  </DropdownMenu>
                                ) : null}
                              </UncontrolledDropdown>
                            ) : nav === "login" ? (
                              <li>
                                <a
                                  href="#"
                                  onClick={
                                    loggeduser ? logout : this.toggle_login
                                  }
                                  className="alio_green"
                                  data-toggle="modal"
                                  data-target="#login"
                                  style={{ color: "#fff", marginRight: 20 }}
                                >
                                  <i className="fas fa-sign-in-alt mr-1"></i>
                                  <span className="dn-lg">
                                    {loggeduser ? `Sign out` : "Sign In"}
                                  </span>
                                </a>
                              </li>
                            ) : nav === "signup" ? (
                              <li className="add-listing btn  theme-bg">
                                <Link
                                  to={loggeduser ? "/profile" : "/signup"}
                                  className="text-white"
                                >
                                  {loggeduser
                                    ? `${loggeduser.firstname} ${loggeduser.lastname}`
                                    : "Get Started"}
                                </Link>
                              </li>
                            ) : (
                              <NavItem>
                                <NavLink
                                  style={{
                                    backgroundColor: "transparent",
                                  }}
                                >
                                  <Link
                                    style={{ textDecorationColor: "none" }}
                                    to={`/${nav.replace(/ /g, "_")}`}
                                  >
                                    <span style={{ color: "#fff" }}>
                                      {to_title(nav.replace(/_/g, " "))}
                                    </span>
                                  </Link>
                                </NavLink>
                              </NavItem>
                            );
                          })}
                        </Nav>
                      </Collapse>
                    </Navbar>
                  </div>
                </div>
              </div>

              <Modal ref={(login_modal) => (this.login_modal = login_modal)}>
                <Login toggle={this.toggle_login} />
              </Modal>

              <Modal
                ref={(redeem_voucher_) =>
                  (this.redeem_voucher_ = redeem_voucher_)
                }
              >
                <Redeem_voucher toggle={this.redeem_voucher} />
              </Modal>

              <Modal
                ref={(verify_voucher_) =>
                  (this.verify_voucher_ = verify_voucher_)
                }
              >
                <Verify_voucher toggle={this.verify_voucher} />
              </Modal>

              <Modal
                ref={(create_voucher_) =>
                  (this.create_voucher_ = create_voucher_)
                }
              >
                <Create_open_voucher toggle={this.create_voucher} />
              </Modal>
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Custom_Nav;
export { navs };
