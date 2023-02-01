import React from "react";
import { Link } from "react-router-dom";
import { client_domain } from "../assets/js/utils/constants";
import Footer from "../sections/footer";
import Nav from "../sections/nav";

class Forgot_password extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="main-wrapper">
        <Nav page="forgot_password" />
        <section>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 col-md-12 col-sm-12">
                <form>
                  <div className="crs_log_wrap">
                    <div className="crs_log__thumb">
                      <img
                        src={`${client_domain}/forgot_pass_bg2.jpg`}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="crs_log__caption">
                      <div className="rcs_log_123">
                        <div className="rcs_ico">
                          <i className="fas fa-lock"></i>
                        </div>
                      </div>

                      <div className="rcs_log_124">
                        <div className="Lpo09">
                          <h4>Forgot password</h4>
                        </div>
                        <div className="form-group">
                          <label>Enter Email</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="you@mail.com"
                          />
                        </div>
                        <div className="form-group">
                          <button
                            type="button"
                            className="btn full-width btn-md theme-bg text-white"
                          >
                            Forgot password
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="crs_log__footer d-flex justify-content-between">
                      <div className="fhg_45">
                        <p className="musrt">
                          Don't have account?{" "}
                          <Link to="/signup" className="theme-cl">
                            SignUp
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Forgot_password;
