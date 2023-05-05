import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/styles.css";
import "./assets/css/custom.css";
import { Loggeduser, Logged_admin, Nav_context } from "./Contexts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Emitter from "semitter";
// Pages
import Home from "./pages/Home";
import Vouchers from "./pages/Vouchers";
import Giftcards from "./pages/Giftcards";
import Coupons from "./pages/Coupons";
import Login from "./pages/Login";
import Forgot_password from "./pages/Forgot_password";
import Signup from "./pages/Signup";
import Page_not_found from "./pages/404";
import Adminstrator from "./pages/Adminstrator";
import Become_a_vendor from "./pages/Become_a_vendor";
import Verify_email from "./pages/Verify_email";
import { client_domain } from "./assets/js/utils/constants";
import Vendor_profile from "./pages/Vendor_profile";
import User_vouchers from "./pages/User_vouchers";
import Dashboard from "./pages/dashboard";
import Vendors from "./pages/Vendors";
import Create_offer_voucher from "./pages/Create_offer_voucher";
import Voucher from "./pages/Voucher";
import Developer from "./pages/Developer";
import Create_event, { ticket_categories } from "./pages/Create_event";
import Events from "./pages/Events";
import Event from "./pages/Event";
import User_tickets_dash from "./pages/User_tickets";
import { post_request } from "./assets/js/utils/services";
import { save_to_session } from "./sections/footer";
import Search_results from "./pages/Search_results";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Marketplace from "./pages/Marketplace";
import Add_product_et_service from "./pages/Add_product_et_service";
import Product from "./pages/Product";
import User_verification from "./pages/User_verification";
import Reset_password from "./pages/Reset_password";

const emitter = new Emitter();

class Voupon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submenus: new Object({
        create_voucher: new Array(
          { title: "open_vouchers", action: () => {}, path: "" },
          { title: "offer_vouchers", action: () => {}, path: "" }
        ),
      }),
      subnavs: new Object(),
      navs: new Array(
        {
          title: "search",
          path: "/search_result",
        },
        {
          title: "home",
          path: "/",
        },
        {
          title: "create",
          submenu: new Array(
            {
              title: "create vouchers",
              submenu: new Array(
                { title: "open_vouchers", path: "" },
                { title: "offer_vouchers", path: "" }
              ),
            },
            {
              title: "create_coupon",
            },
            { title: "create_ticket" }
          ),
        },
        {
          title: "vouchers",
          path: "/vouchers",
          submenu: new Array(
            {
              title: "vouchers",
              _id: 1,
              // on_click: () => {},
              path: "/vouchers",
            },
            {
              title: "my_vouchers",
              _id: 2,
              // on_click: () => {},
              path: "/user_vouchers",
            },
            { title: "redeem_voucher", _id: 4, path: "" },
            { title: "verify_voucher", _id: 5, path: "" }
          ),
        },
        {
          title: "coupons",
          path: "/coupons",
          submenu: new Array(
            {
              title: "coupons",
            },
            { title: "verify_coupon" }
          ),
        },
        {
          title: "tickets",
          path: "/tickets",
          submenu: new Array(
            {
              title: "categories",
              submenu: ticket_categories.map(
                (c) =>
                  new Object({
                    title: c,
                    path: `/tickets?${c}`,
                    action: () => window.location.reload(),
                  })
              ),
            },
            {
              title: "my_tickets",
              path: "/my_tickets",
            },
            { title: "verify_ticket" }
          ),
        },
        {
          title: "ENPL",
          path: "/marketplace",
          submenu: new Array(
            {
              title: "Enjoy_Now_Pay_Later",
            },
            {
              title: "wishlist",
            },
            {
              title: "my_subcriptions",
            }
          ),
        },
        {
          title: "vendors",
          path: "",
          submenu: new Array(
            { title: "become_a_vendor" },
            { title: "all_vendors" }
          ),
        },
        {
          title: "login",
          path: "",
        },
        {
          title: "get_started",
          path: "/signup",
        }
      ),
    };
  }

  componentDidMount = () => {
    let loggeduser = window.sessionStorage.getItem("loggeduser");
    if (loggeduser) {
      try {
        this.setState({ loggeduser: JSON.parse(loggeduser) });
      } catch (e) {}
    }

    emitter.single_listener("is_logged_in", this.is_logged_in);

    this.reward_interval = setInterval(() => {
      let { loggeduser } = this.state;
      if (this.log_timestamp && loggeduser) {
        if (Date.now() - this.log_timestamp >= 10 * 60 * 1000) {
          post_request(`claim_daily_reward_token/${loggeduser._id}`);
          clearInterval(this.reward_interval);
        }
      }
    }, 60 * 1000);

    this.edit_voucher = ({ voucher, vendor }) =>
      this.setState({ voucher_in_edit: voucher }, () => {
        save_to_session("voucher_in_edit", voucher);
        save_to_session("vendor", vendor);
        window.location.assign(`${client_domain}/edit_offer_voucher`);
      });

    this.edit_event = ({ event, vendor }) =>
      this.setState({ event_in_edit: event }, () => {
        save_to_session("event_in_edit", event);
        save_to_session("vendor", vendor);
        window.location.assign(`${client_domain}/edit_event`);
      });

    this.edit_product = ({ product, vendor }) =>
      this.setState({ product_in_edit: product }, () => {
        save_to_session("product_in_edit", product);
        save_to_session("vendor", vendor);
        window.location.assign(`${client_domain}/edit_product_et_service`);
      });

    emitter.listen("edit_event", this.edit_event);
    emitter.listen("edit_product", this.edit_product);
    emitter.listen("edit_voucher", this.edit_voucher);
  };

  componentWillUnmount = () => {
    clearInterval(this.reward_interval);
  };

  set_subnav = async (nav) => {
    let { subnavs } = this.state;
    if (subnavs[nav._id]) return;

    let navs = await post_request("get_courses", { courses: nav.submenu });
    subnavs[nav._id] = navs.map((nav) => ({
      ...nav,
      path: "/course",
      on_click: () => this.handle_course(nav),
    }));
    this.setState({ subnavs });
  };

  load_subnavs = async (current_subnav) => {
    let { submenus } = this.state;

    let courses = await post_request("get_courses", {
      courses: current_subnav.submenu,
    });
    submenus[current_subnav._id] = courses;

    this.setState({
      submenus,
    });
  };

  logout = () =>
    this.setState({ loggeduser: null }, () => {
      window.sessionStorage.removeItem("loggeduser");
      window.location.assign(client_domain);

      delete this.log_timestamp;
    });

  restore_loggeduser = (loggeduser, cb) =>
    this.setState({ loggeduser }, () => {
      window.sessionStorage.setItem("loggeduser", JSON.stringify(loggeduser));
      cb && cb();
    });

  login = (user, no_redirect) =>
    this.setState({ loggeduser: user }, () => {
      window.sessionStorage.setItem("loggeduser", JSON.stringify(user));

      if (!this.log_timestamp) this.log_timestamp = Date.now();

      if (no_redirect) return;

      let red = window.sessionStorage.getItem("redirect");

      window.sessionStorage.removeItem("redirect");
      window.location.assign(red || client_domain);
    });

  log_admin = (admin) =>
    this.setState({ admin_logged: admin }, () => {
      window.sessionStorage.setItem("logged_admin", JSON.stringify(admin));
    });

  render = () => {
    let {
      loggeduser,
      navs,
      subnavs,
      submenus,
      admin_logged,
      event_in_edit,
      voucher_in_edit,
      product_in_edit,
    } = this.state;

    return (
      <Loggeduser.Provider
        value={{
          loggeduser,
          logout: this.logout,
          set_loggeduser: this.restore_loggeduser,
          login: this.login,
          is_logged_in: this.is_logged_in,
        }}
      >
        <Logged_admin.Provider
          value={{ admin_logged, log_admin: this.log_admin }}
        >
          <Nav_context.Provider
            value={{
              navs,
              subnavs,
              set_subnav: this.set_subnav,
              load_subnavs: this.load_subnavs,
              submenus,
            }}
          >
            <BrowserRouter>
              <Routes>
                <Route index element={<Home />} />
                <Route path="vouchers" element={<Vouchers />} />
                <Route path="vendors" element={<Vendors />} />
                <Route path="create_event" element={<Create_event />} />
                <Route path="tickets" element={<Events />} />
                <Route path="event" element={<Event />} />
                <Route path="gift_cards" element={<Giftcards />} />
                <Route path="coupons" element={<Coupons />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="vendor" element={<Vendor_profile />} />
                <Route path="reset_password" element={<Reset_password />} />
                <Route path="my_tickets" element={<User_tickets_dash />} />
                <Route path="verify_email" element={<Verify_email />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route
                  path="get_verified/:user_id"
                  element={<User_verification />}
                />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="signup/:referral" element={<Signup />} />
                <Route
                  path="new_product_et_service"
                  element={<Add_product_et_service />}
                />
                <Route
                  path="edit_product_et_service"
                  element={<Add_product_et_service product={product_in_edit} />}
                />
                <Route path="marketplace" element={<Marketplace />} />
                <Route path="search_result" element={<Search_results />} />
                <Route
                  path="create_offer_voucher"
                  element={<Create_offer_voucher />}
                />
                <Route
                  path="edit_offer_voucher"
                  element={<Create_offer_voucher voucher={voucher_in_edit} />}
                />
                <Route
                  path="edit_event"
                  element={<Create_event event={event_in_edit} />}
                />
                <Route path="user_vouchers" element={<User_vouchers />} />
                <Route path="become_a_vendor" element={<Become_a_vendor />} />
                <Route path="voucher" element={<Voucher />} />
                <Route path="product" element={<Product />} />
                <Route path="developer" element={<Developer />} />
                <Route path="forgot_password" element={<Forgot_password />} />
                <Route path="administrator" element={<Adminstrator />} />
                <Route path="*" element={<Page_not_found />} />
              </Routes>
            </BrowserRouter>
          </Nav_context.Provider>
        </Logged_admin.Provider>
      </Loggeduser.Provider>
    );
  };
}

export default Voupon;
export { emitter };
