import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { to_title } from "../assets/js/utils/functions";
import { get_request } from "../assets/js/utils/services";
import Create_open_voucher from "../components/create_open_voucher";
import Listempty from "../components/listempty";
import Loadindicator from "../components/loadindicator";
import Modal from "../components/modal";
import Padder from "../components/padder";
import Text_btn from "../components/text_btn";
import Voucher from "../components/voucher";
import { Loggeduser } from "../Contexts";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Nav from "../sections/nav";

const voucher_tabs = new Array(
  "open vouchers",
  "offer vouchers",
  "transaction history"
);

class User_vouchers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active_tab: voucher_tabs[0],
    };
  }

  componentDidMount = async () => {
    if (!this.loggeduser) {
      this.loggeduser = window.sessionStorage.getItem("loggeduser");
      if (this.loggeduser) this.loggeduser = JSON.parse(this.loggeduser);
      else window.history.go(-1);
    }

    let { open_vouchers, offer_vouchers } = await get_request(
      `user_vouchers/${this.loggeduser._id}`
    );

    console.log(open_vouchers, offer_vouchers);

    this.setState({ open_vouchers, offer_vouchers });
  };

  toggle_create_voucher = () => this.create_voucher?.toggle();

  render() {
    let { vouchers, active_tab, open_vouchers, offer_vouchers, vendors } =
      this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          if (!this.loggeduser) return <Loadindicator />;

          return (
            <div>
              <Nav page="vouchers" />

              <Padder />
              <Breadcrumb_banner page="My Vouchers" />

              <section class="min">
                <div class="container">
                  <Tabs
                    defaultActiveKey={active_tab}
                    id="uncontrolled-tab-example"
                    className="mb-3"
                  >
                    {voucher_tabs.map((tab) => (
                      <Tab eventKey={tab} title={to_title(tab)} key={tab}>
                        {tab === "open vouchers" ? (
                          <>
                            <div class="row justify-content-center">
                              <div class="col-lg-7 col-md-8">
                                <div class="sec-heading center">
                                  <h2>
                                    Open Vouchers <span class="theme-cl"></span>
                                  </h2>
                                  <p>
                                    Find vouchers to your favorite vouchers
                                    here.{" "}
                                  </p>
                                  <p>
                                    or{" "}
                                    <Text_btn
                                      action={this.toggle_create_voucher}
                                      text="Create Voucher"
                                      style={{
                                        fontSize: 18,
                                        fontWeight: "bold",
                                      }}
                                    />
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="row justify-content-center">
                              {open_vouchers ? (
                                open_vouchers.length ? (
                                  open_vouchers.map((voucher, index) => (
                                    <Voucher voucher={voucher} key={index} />
                                  ))
                                ) : (
                                  <Listempty />
                                )
                              ) : (
                                <Loadindicator />
                              )}
                            </div>
                          </>
                        ) : tab === "offer vouchers" ? (
                          <>
                            <div class="row justify-content-center">
                              <div class="col-lg-7 col-md-8">
                                <div class="sec-heading center">
                                  <h2>
                                    Offer Vouchers{" "}
                                    <span class="theme-cl"></span>
                                  </h2>
                                  <p>
                                    Find vouchers to your favorite vouchers
                                    here.{" "}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="row justify-content-center">
                              {offer_vouchers ? (
                                offer_vouchers.length ? (
                                  offer_vouchers.map((voucher, index) => (
                                    <Voucher
                                      voucher={voucher.voucher}
                                      vendor={voucher.vendor}
                                      key={index}
                                    />
                                  ))
                                ) : (
                                  <Listempty />
                                )
                              ) : (
                                <Loadindicator />
                              )}
                            </div>
                          </>
                        ) : null}
                      </Tab>
                    ))}
                  </Tabs>
                </div>
              </section>

              <Footer />

              <Modal
                ref={(create_voucher) => (this.create_voucher = create_voucher)}
              >
                <Create_open_voucher toggle={this.toggle_create_voucher} />
              </Modal>
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default User_vouchers;
