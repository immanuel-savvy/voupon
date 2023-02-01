import React from "react";
import "./assets/css/styles.css";
import "./assets/css/custom.css";
import { Loggeduser, Nav_context } from "./Contexts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Vouchers from "./pages/Vouchers";
import Tickets from "./pages/Tickets";
import Giftcards from "./pages/Giftcards";
import Coupons from "./pages/Coupons";
import Login from "./pages/Login";
import Forgot_password from "./pages/Forgot_password";
import Signup from "./pages/Signup";
import Page_not_found from "./pages/404";

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
  };

  render = () => {
    return (
      <Loggeduser.Provider>
        <Nav_context.Provider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="vouchers" element={<Vouchers />} />
              <Route path="tickets" element={<Tickets />} />
              <Route path="giftcards" element={<Giftcards />} />
              <Route path="coupons" element={<Coupons />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="forgot_password" element={<Forgot_password />} />
              <Route path="*" element={<Page_not_found />} />
            </Routes>
          </BrowserRouter>
        </Nav_context.Provider>
      </Loggeduser.Provider>
    );
  };
}

export default Voupon;
