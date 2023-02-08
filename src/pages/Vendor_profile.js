import React from "react";
import { get_request } from "../assets/js/utils/services";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Vendor_header from "../components/vender_header";
import { Loggeduser } from "../Contexts";
import Footer from "../sections/footer";
import Nav from "../sections/nav";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { to_title } from "../assets/js/utils/functions";
import Vendor_vouchers from "../components/vendor_vouchers";
import Vendor_coupons from "../components/vendor_coupons";
import Vendor_tickets from "../components/vendor_ticket";
import Vendor_settings from "../components/vendor_settings";
import { client_domain } from "../assets/js/utils/constants";
import Text_btn from "../components/text_btn";

const vendor_tabs = new Array("vouchers", "coupons", "tickets", "settings");

class Vendor_profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { active_tab: vendor_tabs[0] };
  }

  componentDidMount = async () => {
    if (!this.loggeduser) return window.history.go(-1);

    let vendor = await get_request(`vendor/${this.loggeduser.vendor}`);

    if (!vendor || (vendor && !vendor._id))
      return window.location.assign(client_domain);
    this.setState({ vendor });
  };

  render() {
    let { vendor, active_tab } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          return (
            <div id="main-wrapper">
              <Nav page="vendor" />
              <Padder />

              {typeof vendor !== "object" ? (
                <Loadindicator contained />
              ) : (
                <>
                  <Vendor_header loggeduser={loggeduser} vendor={vendor} />

                  <div className="container">
                    <div className="row align-items-center mb-5">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        {vendor.verified ? (
                          <Tabs
                            defaultActiveKey={active_tab}
                            id="uncontrolled-tab-example"
                            className="mb-3"
                          >
                            {vendor_tabs.map((tab) => (
                              <Tab
                                eventKey={tab}
                                title={to_title(tab)}
                                key={tab}
                              >
                                {tab === "vouchers" ? (
                                  <Vendor_vouchers vendor={vendor} />
                                ) : tab === "coupons" ? (
                                  <Vendor_coupons vendor={vendor} />
                                ) : tab === "tickets" ? (
                                  <Vendor_tickets vendor={vendor} />
                                ) : tab === "settings" ? (
                                  <Vendor_settings vendor={vendor} />
                                ) : null}
                              </Tab>
                            ))}
                          </Tabs>
                        ) : (
                          <div style={{ textAlign: "center" }}>
                            <Text_btn
                              text="go home"
                              action={() =>
                                window.location.assign(client_domain)
                              }
                              style={{
                                textTransform: "capitalize",
                                fontWeight: "bold",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <Footer />
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Vendor_profile;
