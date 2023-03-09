import React from "react";
import { developer_domain } from "../assets/js/utils/constants";
import Padder from "../components/padder";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Custom_Nav from "../sections/nav";

class Developer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    window.open(developer_domain);
    window.history.go(-1);
  };

  render() {
    return (
      <div>
        <Custom_Nav page="developer" />

        <Padder />
        <Breadcrumb_banner page="Developer" />

        <section className="min">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-8">
                <div className="sec-heading center">
                  <h1>Developer</h1>

                  <p>Redirecting...</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

export default Developer;
