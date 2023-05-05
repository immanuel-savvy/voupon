import React from "react";
import { Link } from "react-router-dom";
import { client_domain } from "../assets/js/utils/constants";
import { email_regex } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import Padder from "../components/padder";
import Stretch_button from "../components/stretch_button";
import Footer from "../sections/footer";
import Nav from "../sections/nav";

class Forgot_password extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  proceed = async () => {
    let { email } = this.state;

    this.setState({ loading: true });

    let res = await post_request("request_password_otp", { email });

    if (!res?._id)
      this.setState({
        message: res?.message || "Could not reset your password.",
        loading: true,
      });
    else window.location.assign(`${client_domain}/reset_password?${email}`);
  };

  render() {
    let { email, message, loading } = this.state;

    return (
      <div id="main-wrapper">
        <Nav page="forgot_password" />
        <Padder />
        <section>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 col-md-12 col-sm-12">
                <form>
                  <div className="crs_log_wrap">
                    <div className="crs_log__thumb">
                      <img
                        src={require("../assets/img/forgot_pass_bg2.jpg")}
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
                            value={email}
                            onChange={({ target }) =>
                              this.setState({
                                email: target.value,
                                message: "",
                              })
                            }
                            className="form-control"
                            placeholder="you@mail.com"
                          />
                        </div>

                        {message ? (
                          <p className="text-danger">{message}</p>
                        ) : null}

                        <div className="form-group">
                          <Stretch_button
                            title="Forgot Password"
                            loading={loading}
                            action={this.proceed}
                            disabled={!email_regex.test(email)}
                          />
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
