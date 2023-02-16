import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import Dash_header from "../components/dash_header";
import Padder from "../components/padder";
import { Loggeduser } from "../Contexts";
import Footer from "../sections/footer";
import Custom_Nav from "../sections/nav";
import User_vouchers from "../sections/user_vouchers";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    if (!this.loggeduser) window.location.assign(client_domain);
  };

  render() {
    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          if (!loggeduser) return;

          return (
            <div id="main-wrapper">
              <Custom_Nav page="vendor" />
              <Padder />

              <section className="gray pt-4">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-3 col-md-3">
                      <div className="dashboard-navbar">
                        <Dash_header user={loggeduser} />
                      </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-12">
                      <div className="row mt-3">
                        <div className="col-lg-12 col-md-12 col-sm-12 pb-4">
                          <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                My Vouchers
                              </li>
                            </ol>
                          </nav>
                        </div>
                      </div>

                      <User_vouchers style={{ padding: 0 }} />
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

export default Dashboard;
