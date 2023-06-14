import React from "react";
import Section_header from "../components/section_headers";
import { Link } from "react-router-dom";

class Why_choose_us extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <section class="pt-5 gray">
          <Section_header title="Why choose" color_title="Us" />

          <div class="container">
            <div class="row align-items-center justify-content-between">
              <div class="col-xl-5 col-lg-5 col-md-6 col-sm-12">
                <div class="lmp_caption">
                  <ol class="list-unstyled p-0">
                    <li class="d-flex align-items-start my-3 my-md-4">
                      <div class="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg">
                        <div class="position-absolute text-white h5 mb-0">
                          1
                        </div>
                      </div>
                      <div class="ml-3 ml-md-4">
                        <h4>Increase Revenue</h4>
                        <p>
                          as you leverage on baits and customer satisfaction as
                          strength.
                        </p>
                      </div>
                    </li>
                    <li class="d-flex align-items-start my-3 my-md-4">
                      <div class="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg">
                        <div class="position-absolute text-white h5 mb-0">
                          2
                        </div>
                      </div>
                      <div class="ml-3 ml-md-4">
                        <h4>Enjoy massive brand awareness</h4>
                        <p>
                          when we promote our platform and blogs, featured
                          vendors would gain advantage of visibility.
                        </p>
                      </div>
                    </li>
                    <li class="d-flex align-items-start my-3 my-md-4">
                      <div class="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg">
                        <div class="position-absolute text-white h5 mb-0">
                          3
                        </div>
                      </div>
                      <div class="ml-3 ml-md-4">
                        <h4>Use as C.R.M tool</h4>
                        <p>
                          know where customers and prospects are and manage
                          their datas such as phone number and email.
                        </p>
                      </div>
                    </li>
                    <li class="d-flex align-items-start my-3 my-md-4">
                      <div class="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg">
                        <div class="position-absolute text-white h5 mb-0">
                          4
                        </div>
                      </div>
                      <div class="ml-3 ml-md-4">
                        <h4>Brand visibility</h4>
                        <p>
                          Brands with or without website(s) can have this as an
                          opportunity to get their stores known online.
                        </p>
                      </div>
                    </li>
                  </ol>

                  <div class="foot-news-last mt-4">
                    <Link to="/" className="btn btn-md text-light theme-bg">
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
              <div class="col-xl-5 col-lg-5 col-md-6 col-sm-12">
                <div class="lmp_caption">
                  <ol class="list-unstyled p-0">
                    <li class="d-flex align-items-start my-3 my-md-4">
                      <div class="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg">
                        <div class="position-absolute text-white h5 mb-0">
                          5
                        </div>
                      </div>
                      <div class="ml-3 ml-md-4">
                        <h4>Generate Traffic</h4>
                        <p>
                          you have the choice to redirect your customer to your
                          website and also your contact details would be visible
                          to them and other potential prospects.
                        </p>
                      </div>
                    </li>
                    <li class="d-flex align-items-start my-3 my-md-4">
                      <div class="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg">
                        <div class="position-absolute text-white h5 mb-0">
                          6
                        </div>
                      </div>
                      <div class="ml-3 ml-md-4">
                        <h4>Validate</h4>
                        <p>
                          our system is built to validate every coupon, ticket
                          or voucher created to disabuse continuous usage by
                          customer.
                        </p>
                      </div>
                    </li>
                    <li class="d-flex align-items-start my-3 my-md-4">
                      <div class="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg">
                        <div class="position-absolute text-white h5 mb-0">
                          7
                        </div>
                      </div>
                      <div class="ml-3 ml-md-4">
                        <h4>Seamless Integration</h4>
                        <p>
                          our system A.P.I is available to be integrated to
                          existing platforms and websites.
                        </p>
                      </div>
                    </li>
                    <li class="d-flex align-items-start my-3 my-md-4">
                      <div class="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg">
                        <div class="position-absolute text-white h5 mb-0">
                          8
                        </div>
                      </div>
                      <div class="ml-3 ml-md-4">
                        <h4>Vendor</h4>
                        <p>
                          Vendors and verified users earn as we make money.
                          Share from our revenue.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div class="clearfix"></div>{" "}
      </>
    );
  }
}

export default Why_choose_us;
