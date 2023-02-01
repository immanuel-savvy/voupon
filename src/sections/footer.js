import React from "react";

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <footer
        class="dark-footer skin-dark-footer style-2"
        style={{ backgroundColor: "#000" }}
      >
        <div class="footer-middle">
          <div class="container">
            <div class="row">
              <div class="col-lg-5 col-md-5">
                <div class="footer_widget">
                  {/* <img src="assets/img/logo-light.png" class="img-footer small mb-2" alt="" /> */}
                  <h2 className="text-light">Voupon</h2>

                  <h6 class="extream text-light mb-3">Nigeria</h6>
                  <p className="text-light">
                    18, Afolabi Aina Street, Allen Avenue, <br />
                    Ikeja, Lagos state.
                  </p>
                </div>
              </div>

              <div class="col-lg-6 col-md-7 ml-auto">
                <div class="row">
                  <div class="col-lg-4 col-md-4">
                    <div class="footer_widget">
                      <h4 class="widget_title">Useful Links</h4>
                      <ul class="footer-menu">
                        <li>
                          <a href="#">Home</a>
                        </li>
                        <li>
                          <a href="#">Vouchers</a>
                        </li>
                        <li>
                          <a href="#">Coupons</a>
                        </li>
                        <li>
                          <a href="#">Gift cards</a>
                        </li>
                        <li>
                          <a href="#">Tickets</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="col-lg-4 col-md-4">
                    <div class="footer_widget">
                      <h4 class="widget_title">Company</h4>
                      <ul class="footer-menu">
                        <li>
                          <a href="#">About</a>
                        </li>
                        <li>
                          <a href="#">Contact</a>
                        </li>
                        <li>
                          <a href="#">Login</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bottom" style={{ backgroundColor: "#000" }}>
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-12 col-md-12 text-center">
                <p class="mb-0">
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
