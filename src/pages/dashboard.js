import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import { to_title } from "../assets/js/utils/functions";
import Dash_header, { panels } from "../components/dash_header";
import Padder from "../components/padder";
import Transactions from "../components/transactions";
import { Loggeduser } from "../Contexts";
import Footer from "../sections/footer";
import Custom_Nav from "../sections/nav";
import User_coupons from "../sections/user_coupons";
import User_vouchers from "../sections/user_vouchers";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { panel: panels[0] };
  }

  componentDidMount = () => {
    if (!this.loggeduser) window.location.assign(client_domain);
  };

  set_panel = (panel) => this.setState({ panel });

  render() {
    let { panel } = this.state;

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
                        <Dash_header
                          user={loggeduser}
                          set_panel={this.set_panel}
                        />
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
                                {to_title(panel)}
                              </li>
                            </ol>
                          </nav>
                        </div>
                      </div>

                      {panel === panels[0] ? (
                        <User_vouchers style={{ padding: 0 }} />
                      ) : panel === panels[1] ? (
                        <User_coupons />
                      ) : panel === panels[2] ? (
                        <></>
                      ) : (
                        <Transactions user={loggeduser} />
                      )}
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
