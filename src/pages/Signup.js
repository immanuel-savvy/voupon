import React from "react";
import { Link } from "react-router-dom";
import { email_regex } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import { Loggeduser } from "../Contexts";
import Footer from "../sections/footer";
import Nav from "../sections/nav";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = { password: "" };
  }

  toggle_reavel_password = () =>
    this.setState({ reveal_password: !this.state.reveal_password });

  sign_up = async () => {
    let { firstname, lastname, email, password, loading, referral } =
      this.state;

    if (
      !firstname ||
      !lastname ||
      !password ||
      !email_regex.test(email) ||
      loading
    )
      return;

    if (password.length < 6)
      return this.setState({ message: "Password must be above 5 characters" });

    this.setState({ loading: true });

    let user = { firstname, lastname, email, password, referral };

    let res = await post_request("signup", user);
    if (!res._id) return this.setState({ message: res, loading: false });

    delete user.password;
    user._id = res._id;
    user.created = res.created;
    this.reset_state();

    document.getElementById("click_verify").click();
  };

  reset_state = () =>
    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      loading: false,
    });

  render() {
    let {
      firstname,
      lastname,
      loading,
      email,
      message,
      password,
      reveal_password,
    } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ login }) => {
          this.login = login;
          return (
            <div id="main-wrapper">
              <Nav page="signup" />
              <Padder />
              <section>
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-12 col-sm-12">
                      <form>
                        <div className="crs_log_wrap">
                          <div className="crs_log__thumb">
                            <img
                              src={require(`../assets/img/loginbg4.jpg`)}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                          <div className="crs_log__caption">
                            <div className="rcs_log_123">
                              <div className="rcs_ico">
                                <i className="fas fa-user"></i>
                              </div>
                            </div>

                            <div className="rcs_log_124">
                              <div className="Lpo09">
                                <h4>Register Your Account</h4>
                              </div>
                              <div className="form-group row mb-0">
                                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="First Name"
                                      value={firstname}
                                      onChange={({ target }) =>
                                        this.setState({
                                          firstname: target.value,
                                          message: "",
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Last Name"
                                      value={lastname}
                                      onChange={({ target }) =>
                                        this.setState({
                                          lastname: target.value,
                                          message: "",
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="form-group">
                                <label>Email</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="you@mail.com"
                                  value={email}
                                  onChange={({ target }) =>
                                    this.setState({
                                      email: target.value,
                                      message: "",
                                    })
                                  }
                                />
                              </div>
                              <div className="form-group">
                                <label>Password</label>

                                <input
                                  type={reveal_password ? "text" : "password"}
                                  className="form-control"
                                  placeholder="*******"
                                  value={password}
                                  onChange={({ target }) =>
                                    this.setState({
                                      password: target.value,
                                      message: "",
                                    })
                                  }
                                />
                                <a
                                  onClick={() =>
                                    this.setState({
                                      reveal_password:
                                        !this.state.reveal_password,
                                    })
                                  }
                                  style={{ cursor: "pointer" }}
                                  className="text-dark"
                                >
                                  {`${reveal_password ? "Hide" : "Show"}`}
                                </a>
                              </div>
                              {message ? (
                                <div
                                  className="alert alert-danger"
                                  role="alert"
                                >
                                  {message}
                                </div>
                              ) : null}

                              <div className="form-group">
                                <Link
                                  id="click_verify"
                                  to={`/verify_email?addr=${email}`}
                                ></Link>
                                {loading ? (
                                  <Loadindicator />
                                ) : (
                                  <button
                                    type="button"
                                    className="btn full-width btn-md theme-bg text-white"
                                    onClick={this.sign_up}
                                  >
                                    Sign Up
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="crs_log__footer d-flex justify-content-between">
                            <div className="fhg_45">
                              <p className="musrt">
                                Already have account?{" "}
                                <Link to="/login" className="theme-cl">
                                  Login
                                </Link>
                              </p>
                            </div>
                            <div className="fhg_45">
                              <p className="musrt">
                                <Link
                                  to="/forgot_password"
                                  className="text-danger"
                                >
                                  Forgot Password?
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

export default Signup;
