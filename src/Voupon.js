import React from "react";
import "./assets/css/styles.css";
import "./assets/css/custom.css";
import { Loggeduser, Logged_admin, Nav_context } from "./Contexts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Emitter from "semitter";
// Pages
import Home from "./pages/Home";
import Vouchers from "./pages/Vouchers";
import Tickets from "./pages/Tickets";
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

const emitter = new Emitter();

class Voupon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  script_paths = new Array(
    "jquery.min.js",
    "popper.min.js",
    "bootstrap.min.js",
    "select2.min.js",
    "slick.js",
    "moment.min.js",
    "daterangepicker.js",
    "summernote.min.js",
    "metisMenu.min.js",
    "custom.js",
    "my_custom.js"
  );

  append_script = (path) => {
    const script = document.createElement("script");
    script.src = `http://localhost:3000/js/${path}`;
    script.type = "text/babel";
    script.async = false;
    document.body.appendChild(script);
  };

  componentDidMount = () => {
    this.script_paths.map((scr) => this.append_script(scr));

    let loggeduser = window.sessionStorage.getItem("loggeduser");
    if (loggeduser) {
      try {
        this.setState({ loggeduser: JSON.parse(loggeduser) });
      } catch (e) {}
    }

    emitter.single_listener("is_logged_in", this.is_logged_in);
  };

  logout = () =>
    this.setState({ loggeduser: null }, () => {
      window.sessionStorage.removeItem("loggeduser");
      window.location.assign(client_domain);
    });

  restore_loggeduser = (loggeduser) => this.setState({ loggeduser });

  login = (user) =>
    this.setState({ loggeduser: user }, () => {
      window.sessionStorage.setItem("loggeduser", JSON.stringify(user));

      window.location.assign(
        window.sessionStorage.getItem("redirect") || client_domain
      );
    });

  log_admin = (admin) =>
    this.setState({ admin_logged: admin }, () => {
      window.sessionStorage.setItem("logged_admin", JSON.stringify(admin));
    });

  render = () => {
    let { loggeduser, admin_logged } = this.state;

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
          <Nav_context.Provider value={null}>
            <BrowserRouter>
              <Routes>
                <Route index element={<Home />} />
                <Route path="vouchers" element={<Vouchers />} />
                <Route path="tickets" element={<Tickets />} />
                <Route path="gift_cards" element={<Giftcards />} />
                <Route path="coupons" element={<Coupons />} />
                <Route path="verify_email" element={<Verify_email />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="become_a_vendor" element={<Become_a_vendor />} />
                <Route path="forgot_password" element={<Forgot_password />} />
                <Route path="adminstrator" element={<Adminstrator />} />
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
