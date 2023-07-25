import React from "react";
import { Link } from "react-router-dom";
import { email_regex, phone_regex } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import { Loggeduser } from "../Contexts";
import Footer, { save_to_session, scroll_to_top } from "../sections/footer";
import Nav from "../sections/nav";
import { client_domain } from "../assets/js/utils/constants";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = { password: "" };
  }

  componentDidMount = () => {
    scroll_to_top();
  };

  toggle_reavel_password = () =>
    this.setState({ reveal_password: !this.state.reveal_password });

  sign_up = async (vendor) => {
    let {
      firstname,
      phone_number,
      lastname,
      email,
      password,
      loading,
      referral,
    } = this.state;

    if (
      !firstname ||
      !lastname ||
      !password ||
      !phone_regex.test(phone_number) ||
      !email_regex.test(email) ||
      loading
    )
      return;

    if (password.length < 6)
      return this.setState({ message: "Password must be above 5 characters" });

    this.setState({ loading: true });

    let user = {
      firstname,
      vendor,
      phone_number,
      lastname,
      email,
      password,
      referral,
    };

    let res = await post_request("signup", { ...user, vendor });
    if (!res._id) return this.setState({ message: res, loading: false });

    delete user.password;
    user._id = res._id;
    user.created = res.created;
    this.reset_state();

    vendor
      ? (save_to_session("loggeduser", user),
        window.location.assign(
          `${client_domain}/become_a_vendor?u=${user._id}`
        ))
      : document.getElementById("click_verify").click();
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
      phone_number,
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
                              <div className="row">
                                <div className="form-group col-md-6 col-sm-12">
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
                                <div className="form-group col-md-6 col-sm-12">
                                  <label>Phone Number</label>
                                  <input
                                    className="form-control"
                                    placeholder="234 901 111 2234"
                                    value={phone_number}
                                    onChange={({ target }) =>
                                      this.setState({
                                        phone_number: target.value,
                                        message: "",
                                      })
                                    }
                                  />
                                </div>
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
                                    onClick={() => this.sign_up()}
                                  >
                                    Sign Up
                                  </button>
                                )}
                              </div>
                              <hr />
                              <div className="form-group">
                                {loading ? null : (
                                  <button
                                    type="button"
                                    class="btn theme-light enroll-btn text-dark full-width"
                                    onClick={() => this.sign_up(true)}
                                  >
                                    Create Vendor Profile
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
                              <p className="musrt"></p>
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
