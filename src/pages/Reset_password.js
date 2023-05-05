import React from "react";
import { Link } from "react-router-dom";
import { client_domain } from "../assets/js/utils/constants";
import { email_regex } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import Alert_box from "../components/alert_box";
import Padder from "../components/padder";
import Stretch_button from "../components/stretch_button";
import Text_btn from "../components/text_btn";
import { Loggeduser } from "../Contexts";
import Footer from "../sections/footer";
import Nav from "../sections/nav";

class Reset_password extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      otp: "",
    };
  }

  componentDidMount = () => {
    let href = window.location.href;
    href = href.split("?")[1];

    if (email_regex.test(href)) this.setState({ email: href });
    else window.history.go(-1);
  };

  proceed = async () => {
    let { otp, password, email } = this.state;

    this.setState({ loading: true });

    let res = await post_request("verify_email", {
      verification_code: otp.trim(),
      email,
      password,
    });

    if (res?._id) {
      this.login(res);
    } else
      this.setState({
        message: res?.message || "Cannot reset password at this time",
        loading: false,
      });
  };

  toggle_password = () =>
    this.setState({ reveal_pass: !this.state.reveal_pass });

  render() {
    let { otp, message, loading, email, password, reveal_pass } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ login }) => {
          this.login = login;

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
                                <h4>Reset password</h4>
                              </div>

                              <Alert_box
                                type={"info"}
                                message={`6-digit OTP sent to ${email}`}
                              />

                              <div className="form-group">
                                <label>Enter OTP</label>
                                <input
                                  type="number"
                                  value={otp}
                                  onChange={({ target }) =>
                                    this.setState({
                                      otp: target.value,
                                      message: "",
                                    })
                                  }
                                  className="form-control"
                                  placeholder="- - - - - -"
                                />
                              </div>

                              <div className="form-group">
                                <label>New Password</label>
                                <input
                                  type={reveal_pass ? "text" : "password"}
                                  value={password}
                                  onChange={({ target }) =>
                                    this.setState({
                                      password: target.value,
                                      message: "",
                                    })
                                  }
                                  className="form-control"
                                  placeholder="*******"
                                />

                                <Text_btn
                                  text={reveal_pass ? "Hide" : "Show"}
                                  action={this.toggle_password}
                                />
                              </div>

                              {password && password.length < 6 ? (
                                <Alert_box
                                  message="Password should be atleast 6 characters long"
                                  type="warning"
                                />
                              ) : null}

                              {message ? <Alert_box message={message} /> : null}

                              <div className="form-group">
                                <Stretch_button
                                  title="Reset Password"
                                  loading={loading}
                                  action={this.proceed}
                                  disabled={
                                    !/^[0-9]{6}$/.test(otp.trim()) ||
                                    password.length < 6
                                  }
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
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Reset_password;
