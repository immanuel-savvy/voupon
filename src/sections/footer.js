import React from "react";
import { Link } from "react-router-dom";
import { developer_domain } from "../assets/js/utils/constants";
import { navs } from "./nav";

const scroll_to_top = () => window.scrollTo({ top: 0, behavior: "smooth" });

const save_to_session = (key, value) =>
  window.sessionStorage.setItem(key, JSON.stringify(value));

const get_session = (key) => {
  let value = window.sessionStorage.getItem(key);

  try {
    value = JSON.parse(value);
  } catch (e) {}

  return value;
};

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <footer
        className="dark-footer skin-dark-footer style-2"
        style={{ backgroundColor: "#000" }}
      >
        <div className="footer-middle">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-5">
                <div className="footer_widget">
                  <Link to="/">
                    {/* <img src="assets/img/logo-light.png" className="img-footer small mb-2" alt="" /> */}
                    <h2 className="text-light">Voucher Africa</h2>
                  </Link>

                  <h6 className="extream text-light mb-3">Nigeria</h6>
                  <p className="text-light">
                    18, Afolabi Aina Street, Allen Avenue, <br />
                    Ikeja, Lagos state.
                  </p>
                </div>
              </div>

              <div className="col-lg-6 col-md-7 ml-auto">
                <div className="row">
                  <div className="col-lg-4 col-md-4">
                    <div className="footer_widget">
                      <h4 className="widget_title">Useful Links</h4>
                      <ul className="footer-menu">
                        {navs.map((nav) =>
                          nav === "developer" ? null : (
                            <li
                              className={`text-light`}
                              key={nav}
                              onClick={scroll_to_top}
                            >
                              <Link to={`/${nav.replace(/ /g, "")}`}>
                                {nav || "home"}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4">
                    <div className="footer_widget">
                      <h4 className="widget_title">Company</h4>
                      <ul className="footer-menu">
                        <li>
                          <Link to={`/about`}>About</Link>
                        </li>
                        <li>
                          <Link to={`/contact`}>Contact</Link>
                        </li>
                        <li>
                          <a href={developer_domain} target="_blank">
                            Developer
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom" style={{ backgroundColor: "#000" }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12 col-md-12 text-center">
                <p className="mb-0">
                  © {new Date().getFullYear()} Voupon. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
export { scroll_to_top, save_to_session, get_session };
