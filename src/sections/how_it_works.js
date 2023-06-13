import React from "react";
import { developer_domain } from "../assets/js/utils/constants";

class How_it_works extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <section className="gray">
        <div className="container">
          <div className="row align-items-center justify-content-between mb-5">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="lmp_caption">
                <h2 className="mb-3">How it Works</h2>
                <p>
                  Get started in a Thriving Market- Connect with Customers by
                  Selling Your Offers on Our Platform!!
                  <br />
                  <b>COUPONS-VOUCHERS-TICKETS-E.N.P.L</b>
                </p>
                <p>
                  You can integrate our API to your existing platform or website
                  from our{" "}
                  <a href={developer_domain} target="_blank">
                    “DEVELOPER”
                  </a>{" "}
                  menu
                </p>
                <div className="mb-3 mr-4 ml-lg-0 mr-lg-4">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                      <i className="fas fa-check"></i>
                    </div>
                    <h6 className="mb-0 ml-3">Fine New Audience</h6>
                  </div>
                </div>
                <div className="mb-3 mr-4 ml-lg-0 mr-lg-4">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                      <i className="fas fa-check"></i>
                    </div>
                    <h6 className="mb-0 ml-3">Connect With Existing Clients</h6>
                  </div>
                </div>
                <div className="mb-3 mr-4 ml-lg-0 mr-lg-4">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                      <i className="fas fa-check"></i>
                    </div>
                    <h6 className="mb-0 ml-3">Increase Brand Visibility</h6>
                  </div>
                </div>
                <div className="mb-3 mr-4 ml-lg-0 mr-lg-4">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                      <i className="fas fa-check"></i>
                    </div>
                    <h6 className="mb-0 ml-3">Enjoy More Sales</h6>
                  </div>
                </div>
                {/* <div className="text-left mt-4">
                  <a href="#" className="btn btn-md text-light theme-bg">
                    Enrolled Today
                  </a>
                </div> */}
              </div>
            </div>

            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
              <div className="lmp_thumb">
                <img
                  src={require("../assets/img/logo_dark.png")}
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default How_it_works;
