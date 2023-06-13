import React from "react";
import { organisation_name } from "../assets/js/utils/constants";
import { get_request } from "../assets/js/utils/services";
import Contact_us_today from "../components/contact_us_today";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer, { scroll_to_top } from "../sections/footer";
import Custom_nav from "../sections/nav";

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    scroll_to_top();

    document.title = `About | ${organisation_name}`;

    let about_statement = await get_request("about_statement");
    this.setState({ about_statement });
  };

  render() {
    let { about_statement } = this.state;

    return (
      <div>
        <Custom_nav page="about" />
        <Padder />

        <Breadcrumb_banner title="Who we are?" page="About Us" />

        {about_statement && about_statement.text ? (
          <section>
            <div className="container">
              <div className="row align-items-center justify-content-between">
                <div className="col-xl-6 col-lg-6 col-md-7 col-sm-12 mb-3">
                  <div className="lmp_caption">
                    <span className="theme-cl">About Us</span>
                    <h2 className="mb-3">What We Do & Our Aim</h2>
                    {about_statement.text.split("\n").map((text, index) => (
                      <p key={index}>{text}</p>
                    ))}
                    <br />

                    {/* <div className="text-left mt-4">
                      <Link
                        to="/courses"
                        className="btn btn-md text-light theme-bg"
                      >
                        Enrolled Today
                      </Link>
                    </div> */}
                  </div>
                </div>

                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12">
                  <div className="lmp_thumb">
                    <img
                      src={require("../assets/img/bgg.jpg")}
                      className="img-fluid rounded"
                      alt=""
                    />

                    {/* <h2>Voucher Africa</h2> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <Loadindicator contained />
        )}

        <Contact_us_today />

        <Footer />
      </div>
    );
  }
}

export default About;
