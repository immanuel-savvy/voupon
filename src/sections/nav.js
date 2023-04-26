import React from "react";
import { Link } from "react-router-dom";
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
import { client_domain } from "../assets/js/utils/constants";
import { to_title } from "../assets/js/utils/functions";
import Create_coupon from "../components/create_coupon";
import Create_open_voucher from "../components/create_open_voucher";
import Loadindicator from "../components/loadindicator";
import Login from "../components/login";
import Modal from "../components/modal";
import Redeem_voucher from "../components/redeem_voucher";
import Verify_voucher from "../components/verify_voucher";
import Verify_coupon from "../components/verify_coupon";
import Verify_ticket from "../components/verify_ticket";
import { Loggeduser, Nav_context } from "../Contexts";
import { emitter } from "../Voupon";
import { scroll_to_top } from "./footer";
import Small_btn from "../components/small_btn";
import Wishlist from "../components/wishlist";

class Custom_nav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      subnavs: new Object(),
      search_param: "",
    };
  }

  login = () => this.login_modal?.toggle();

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  open_vouchers = () => this.create_voucher_?.toggle();

  offer_vouchers = () => {
    window.location.assign(`${client_domain}/create_offer_voucher`);
  };

  create_event = () => {
    window.location.assign(`${client_domain}/create_event`);
  };

  create_coupon = () => this.create_coupon_?.toggle();

  verify_voucher = () => this.verify_voucher_?.toggle();

  verify_ticket = () => this.verify_ticket_?.toggle();

  verify_coupon = () => this.verify_coupon_?.toggle();

  marketplace = () => window.location.assign(`${client_domain}/marketplace`);

  wishlist = () => this.wishlist_.toggle();

  quick_paths = new Object({
    all_vendors: "/vendors",
    events: "/events",
    coupons: "/coupons",
    vouchers: "/vouchers",
    my_tickets: "/my_tickets",
    my_vouchers: "/user_vouchers",
    become_a_vendor: "/become_a_vendor",
  });

  redeem_voucher = () => this.redeem_voucher_?.toggle();

  componentDidMount = () => {};

  search = () => {
    let { search_param } = this.state;
    if (!search_param.trim()) return;

    window.location.assign(
      `${client_domain}/search_result?search_param=${search_param || ""}`
    );
    scroll_to_top();
  };

  render() {
    let { current_subnav, current_nav, show_search, search_param } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser, logout }) => {
          this.logout = logout;

          return (
            <Nav_context.Consumer>
              {({ navs, set_subnav }) => {
                this.navs = navs;
                this.set_subnav = set_subnav;

                return (
                  <div>
                    <div
                      className="header"
                      style={{
                        backgroundColor: "#fff",
                        color: "#000",
                        position: "fixed",
                        width: "100vw",
                      }}
                    >
                      <div className="container">
                        <div
                          id="navigation"
                          className="navigation navigation-landscape"
                        >
                          <Navbar light expand="lg">
                            <NavbarBrand href="/" className="nav-brand">
                              <img
                                src={require(`../assets/img/logo_dark.png`)}
                                className="logo"
                                id="logo_white"
                                alt=""
                              />
                              {/* <h2 className="text-dark">Voucher Africa</h2> */}
                            </NavbarBrand>
                            <NavbarToggler
                              style={{ color: "#000" }}
                              onClick={this.toggle}
                            />
                            <Collapse isOpen={this.state.isOpen} navbar>
                              <Nav
                                className="ml-auto"
                                navbar
                                style={{ alignItems: "center" }}
                              >
                                {navs.map((nav, index) => {
                                  nav = { ...nav };

                                  if (nav.title === "login" && loggeduser)
                                    nav.title = "logout";

                                  return nav.submenu && nav.submenu.length ? (
                                    <UncontrolledDropdown
                                      key={index}
                                      nav
                                      inNavbar
                                    >
                                      <DropdownToggle
                                        style={{
                                          backgroundColor: "transparent",
                                        }}
                                        nav
                                        caret
                                        ref={(dropdown) =>
                                          (this[`main_dropdown_${index}`] =
                                            dropdown)
                                        }
                                        onMouseOver={() => {
                                          let comp =
                                            this[`main_dropdown_${index}`];
                                          !comp.context.isOpen &&
                                            comp.context.toggle();
                                          this.setState({
                                            current_nav: nav.title,
                                          });
                                        }}
                                      >
                                        <span>
                                          {to_title(
                                            nav.title.replace(/_/g, " ")
                                          )}
                                        </span>
                                      </DropdownToggle>
                                      {current_nav === nav.title ? (
                                        <DropdownMenu
                                          className="nav-dropdown nav-submenu"
                                          end
                                        >
                                          {nav.submenu.map((subnav, index) => {
                                            subnav = { ...subnav };

                                            if (
                                              !loggeduser &&
                                              new Array(
                                                "my_vouchers",
                                                "my_coupons",
                                                "my_tickets",
                                                "wishlist",
                                                "create_event"
                                              ).includes(subnav.title)
                                            )
                                              return;

                                            if (
                                              subnav.title === "create_event" &&
                                              !loggeduser.vendor
                                            )
                                              return;

                                            if (
                                              subnav.title ===
                                                "become_a_vendor" &&
                                              loggeduser &&
                                              loggeduser.vendor
                                            ) {
                                              subnav.title = "vendor_profile";
                                              subnav.path = `/vendor?${loggeduser.vendor}`;
                                            } else
                                              subnav.path =
                                                this.quick_paths[subnav.title];

                                            return (
                                              <li
                                                key={index}
                                                onMouseOver={() => {
                                                  this.setState({
                                                    current_subnav:
                                                      subnav.title,
                                                  });
                                                }}
                                              >
                                                <Link
                                                  onClick={this[subnav.title]}
                                                  to={subnav.path || ""}
                                                >
                                                  {subnav.view_all
                                                    ? "View all courses..."
                                                    : to_title(
                                                        subnav.title.replace(
                                                          /_/g,
                                                          " "
                                                        )
                                                      )}
                                                </Link>
                                                {subnav.submenu &&
                                                subnav.submenu.length &&
                                                current_subnav ===
                                                  subnav.title ? (
                                                  <UncontrolledDropdown
                                                    key={index}
                                                    nav
                                                    inNavbar
                                                    onClick={subnav.on_click}
                                                  >
                                                    <DropdownToggle
                                                      style={{
                                                        backgroundColor:
                                                          "transparent",
                                                      }}
                                                      nav
                                                      caret
                                                      ref={(dropdown) =>
                                                        (this[
                                                          `dropdown_${index}`
                                                        ] = dropdown)
                                                      }
                                                      onMouseOver={
                                                        subnav.view_all
                                                          ? null
                                                          : () => {
                                                              let comp =
                                                                this[
                                                                  `dropdown_${index}`
                                                                ];
                                                              !comp.context
                                                                .isOpen &&
                                                                comp.context.toggle();
                                                            }
                                                      }
                                                    ></DropdownToggle>
                                                    <DropdownMenu
                                                      className="nav-dropdown nav-submenu"
                                                      end
                                                    >
                                                      {subnav.submenu ? (
                                                        subnav.submenu
                                                          .length ? (
                                                          subnav.submenu.map(
                                                            (sub_nav) => {
                                                              if (
                                                                sub_nav.title ===
                                                                "offer_vouchers"
                                                              )
                                                                if (
                                                                  !loggeduser ||
                                                                  (loggeduser &&
                                                                    !loggeduser.vendor)
                                                                )
                                                                  return;

                                                              return (
                                                                <li
                                                                  onClick={
                                                                    this[
                                                                      sub_nav
                                                                        .title
                                                                    ]
                                                                  }
                                                                  style={{
                                                                    backgroundColor:
                                                                      "transparent",
                                                                  }}
                                                                  key={
                                                                    sub_nav._id
                                                                  }
                                                                >
                                                                  <Link
                                                                    to={
                                                                      sub_nav.path ||
                                                                      ""
                                                                    }
                                                                  >
                                                                    {to_title(
                                                                      sub_nav.title.replace(
                                                                        /_/g,
                                                                        " "
                                                                      )
                                                                    )}
                                                                  </Link>
                                                                </li>
                                                              );
                                                            }
                                                          )
                                                        ) : null
                                                      ) : (
                                                        <Loadindicator />
                                                      )}
                                                    </DropdownMenu>
                                                  </UncontrolledDropdown>
                                                ) : null}
                                              </li>
                                            );
                                          })}
                                        </DropdownMenu>
                                      ) : null}
                                    </UncontrolledDropdown>
                                  ) : nav.title === "search" ? (
                                    <li
                                      onClick={() =>
                                        this.setState({
                                          show_search: !this.state.show_search,
                                        })
                                      }
                                    >
                                      <Link
                                        to="#"
                                        style={{ border: "none" }}
                                        className="btn btn-action"
                                      >
                                        <i className="ti-search"></i>
                                      </Link>
                                    </li>
                                  ) : nav.title === "logout" ? (
                                    <li>
                                      <Link
                                        onClick={
                                          loggeduser
                                            ? () => {
                                                logout();
                                              }
                                            : this.login
                                        }
                                        to={nav.path}
                                      >
                                        <i className="fas fa-sign-in-alt mr-1 text-dark"></i>
                                        <span className="dn-lg text-dark">
                                          {loggeduser ? "Logout" : "Log In"}
                                        </span>
                                      </Link>
                                    </li>
                                  ) : nav.title === "get_started" ? (
                                    <ul
                                      className="nav-menu nav-menu-social align-to-right mb-3"
                                      style={{ width: 150 || "100%" }}
                                    >
                                      <li className="add-listing theme-bg">
                                        <Link
                                          to={
                                            loggeduser
                                              ? "/dashboard"
                                              : "/signup"
                                          }
                                          className="text-white"
                                        >
                                          {loggeduser
                                            ? `${loggeduser.firstname} ${loggeduser.lastname}`
                                            : "Get Started"}
                                        </Link>
                                      </li>
                                    </ul>
                                  ) : (
                                    <NavItem
                                      onMouseOver={() =>
                                        this.setState({
                                          current_nav: nav.title,
                                        })
                                      }
                                    >
                                      <NavLink
                                        style={{
                                          backgroundColor: "transparent",
                                        }}
                                      >
                                        <Link
                                          onClick={this[nav.title]}
                                          style={{
                                            textDecorationColor: "none",
                                          }}
                                          to={nav.path || ""}
                                        >
                                          <span>
                                            {to_title(
                                              nav.title.replace(/_/g, " ")
                                            )}
                                          </span>
                                        </Link>
                                      </NavLink>
                                    </NavItem>
                                  );
                                })}
                              </Nav>
                            </Collapse>
                          </Navbar>
                          {show_search ? (
                            <div className="row align-items-center">
                              <div className="form-group mr-0 pr-0 col-md-6 col-lg-4">
                                <div className="input-with-icon">
                                  <input
                                    type="text"
                                    className="form-control"
                                    autoFocus
                                    placeholder="Search Voucher Africa"
                                    value={search_param}
                                    onChange={({ target }) =>
                                      this.setState({
                                        search_param: target.value,
                                      })
                                    }
                                  />
                                  <i className="ti-search"></i>
                                </div>
                              </div>
                              <div className="form-group col-4">
                                <Small_btn
                                  title="Search"
                                  action={this.search}
                                />
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <Modal
                      ref={(login_modal) => (this.login_modal = login_modal)}
                    >
                      <Login toggle={() => this.login_modal?.toggle()} />
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
                      ref={(verify_coupon_) =>
                        (this.verify_coupon_ = verify_coupon_)
                      }
                    >
                      <Verify_coupon toggle={this.verify_coupon} />
                    </Modal>

                    <Modal
                      ref={(verify_ticket_) =>
                        (this.verify_ticket_ = verify_ticket_)
                      }
                    >
                      <Verify_ticket toggle={this.verify_ticket} />
                    </Modal>

                    <Modal
                      ref={(create_voucher_) =>
                        (this.create_voucher_ = create_voucher_)
                      }
                    >
                      <Create_open_voucher toggle={this.open_vouchers} />
                    </Modal>

                    <Modal
                      ref={(create_coupon_) =>
                        (this.create_coupon_ = create_coupon_)
                      }
                    >
                      <Create_coupon
                        vendor={loggeduser?.vendor}
                        toggle={this.create_coupon}
                      />
                    </Modal>

                    <Modal ref={(wishlist_) => (this.wishlist_ = wishlist_)}>
                      <Wishlist user={loggeduser} toggle={this.wishlist} />
                    </Modal>
                  </div>
                );
              }}
            </Nav_context.Consumer>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Custom_nav;
