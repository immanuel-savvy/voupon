import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { to_title } from "../assets/js/utils/functions";
import { get_request } from "../assets/js/utils/services";
import Create_open_voucher from "../components/create_open_voucher";
import Listempty from "../components/listempty";
import Loadindicator from "../components/loadindicator";
import Modal from "../components/modal";
import Padder from "../components/padder";
import User_voucher_header from "../components/user_voucher_header";
import Voucher from "../components/voucher";
import { Loggeduser } from "../Contexts";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Nav from "../sections/nav";

const voucher_tabs = new Array("open vouchers", "offer vouchers");

class User_vouchers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active_tab: voucher_tabs[0],
      filter: "unused",
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

    this.setState({ open_vouchers, offer_vouchers });
  };

  on_create_open_voucher = (voucher) => {
    let { open_vouchers } = this.state;

    open_vouchers = new Array(voucher, ...open_vouchers);
    this.setState({ open_vouchers });
  };

  toggle_create_voucher = () => this.create_voucher?.toggle();

  voucher_states = new Array("unused", "redeemed");

  render() {
    let { active_tab, filter, open_vouchers, offer_vouchers } = this.state;

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
                        <>
                          <User_voucher_header
                            voucher_filters={this.voucher_states}
                            set_voucher_filter={(filter) =>
                              this.setState({ filter })
                            }
                            toggle_create_voucher={
                              tab === voucher_tabs[0] &&
                              this.toggle_create_voucher
                            }
                            voucher_type={tab}
                          />

                          {tab === "open vouchers" ? (
                            <div class="row justify-content-center">
                              {open_vouchers ? (
                                open_vouchers.length ? (
                                  open_vouchers.map((voucher, index) =>
                                    voucher.state === filter ||
                                    (!voucher.state && filter === "unused") ? (
                                      <Voucher
                                        voucher={voucher.voucher}
                                        key={index}
                                      />
                                    ) : null
                                  )
                                ) : (
                                  <Listempty />
                                )
                              ) : (
                                <Loadindicator />
                              )}
                            </div>
                          ) : tab === "offer vouchers" ? (
                            <div class="row justify-content-center">
                              {offer_vouchers ? (
                                offer_vouchers.length ? (
                                  offer_vouchers.map((voucher, index) => (
                                    <Voucher
                                      voucher={voucher.voucher}
                                      voucher_code={voucher.voucher_code}
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
                          ) : null}
                        </>
                      </Tab>
                    ))}
                  </Tabs>
                </div>
              </section>

              <Footer />

              <Modal
                ref={(create_voucher) => (this.create_voucher = create_voucher)}
              >
                <Create_open_voucher
                  on_create={this.on_create_open_voucher}
                  toggle={this.toggle_create_voucher}
                />
              </Modal>
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default User_vouchers;
