import React from "react";
import { Link } from "react-router-dom";
import Padder from "../components/padder";
import Footer from "../sections/footer";
import Nav from "../sections/nav";

class Page_not_found extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="main-wrapper">
        <Nav page="404" />
        <Padder />
        <section class="error-wrap">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-6 col-md-10">
                <div class="text-center">
                  <img
                    src={require("../assets/img/404.png")}
                    class="img-fluid"
                    alt=""
                  />
                  <p>
                    "To be globally acclaimed as an innovative organization
                    working towards fulfilling the information technology needs
                    of our clients."
                  </p>
                  <Link class="btn theme-bg text-white btn-md" to="/">
                    Back To Home
                  </Link>
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

export default Page_not_found;
