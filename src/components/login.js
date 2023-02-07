import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { toggle } = this.props;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <div class="modal-header">
            <h5 class="modal-title">Login Your Account</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => toggle && toggle()}
            >
              <span aria-hidden="true">
                <i class="fas fa-times-circle"></i>
              </span>
            </button>
          </div>
          <div class="modal-body">
            <div class="login-form">
              <form>
                <div class="form-group">
                  <label>User Name</label>
                  <div class="input-with-icon">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="User or email"
                    />
                    <i class="ti-user"></i>
                  </div>
                </div>

                <div class="form-group">
                  <label>Password</label>
                  <div class="input-with-icon">
                    <input
                      type="password"
                      class="form-control"
                      placeholder="*******"
                    />
                    <i class="ti-unlock"></i>
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-xl-4 col-lg-4 col-4">
                    <input
                      id="admin"
                      class="checkbox-custom"
                      name="admin"
                      type="checkbox"
                    />
                    <label for="admin" class="checkbox-custom-label">
                      Admin
                    </label>
                  </div>
                  <div class="col-xl-4 col-lg-4 col-4">
                    <input
                      id="student"
                      class="checkbox-custom"
                      name="student"
                      type="checkbox"
                      checked
                    />
                    <label for="student" class="checkbox-custom-label">
                      Student
                    </label>
                  </div>
                  <div class="col-xl-4 col-lg-4 col-4">
                    <input
                      id="instructor"
                      class="checkbox-custom"
                      name="instructor"
                      type="checkbox"
                    />
                    <label for="instructor" class="checkbox-custom-label">
                      Tutors
                    </label>
                  </div>
                </div>

                <div class="form-group">
                  <button
                    type="submit"
                    class="btn btn-md full-width theme-bg text-white"
                  >
                    Login
                  </button>
                </div>

                {/* <div class="rcs_log_125 pt-2 pb-3">
                  <span>Or Login with Social Info</span>
                </div>
                <div class="rcs_log_126 full">
                  <ul class="social_log_45 row">
                    <li class="col-xl-4 col-lg-4 col-md-4 col-4">
                      <a href="javascript:void(0);" class="sl_btn">
                        <i class="ti-facebook text-info"></i>Facebook
                      </a>
                    </li>
                    <li class="col-xl-4 col-lg-4 col-md-4 col-4">
                      <a href="javascript:void(0);" class="sl_btn">
                        <i class="ti-google text-danger"></i>Google
                      </a>
                    </li>
                    <li class="col-xl-4 col-lg-4 col-md-4 col-4">
                      <a href="javascript:void(0);" class="sl_btn">
                        <i class="ti-twitter theme-cl"></i>Twitter
                      </a>
                    </li>
                  </ul>
                </div> */}
              </form>
            </div>
          </div>
          <div class="crs_log__footer d-flex justify-content-between mt-0">
            <div class="fhg_45">
              <p class="musrt">
                Don't have account?{" "}
                <a href="signup.html" class="theme-cl">
                  SignUp
                </a>
              </p>
            </div>
            <div class="fhg_45">
              <p class="musrt">
                <a href="forgot.html" class="text-danger">
                  Forgot Password?
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
