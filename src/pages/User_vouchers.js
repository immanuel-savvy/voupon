import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { to_title } from "../assets/js/utils/functions";
import { get_request } from "../assets/js/utils/services";
import Create_open_voucher from "../components/create_open_voucher";
import Dropdown_menu from "../components/dropdown_menu";
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
                        {tab === "open vouchers" ? (
                          <>
                            <div class="row">
                              <div class="col-lg-12 col-md-12 col-sm-12">
                                <div class="short_wraping">
                                  <div class="row m-0 align-items-center justify-content-between">
                                    <div class="col-lg-4 col-md-5 col-sm-12  col-sm-6">
                                      <div class="shorting_pagination_laft">
                                        <h6 class="m-0">Open Vouchers</h6>
                                      </div>
                                    </div>

                                    <div class="col-lg-8 col-md-7 col-sm-12 col-sm-6">
                                      <div class="dlks_152">
                                        <div class="shorting-right mr-2">
                                          <label>Filter By:</label>
                                          <Dropdown_menu
                                            items={this.voucher_states.map(
                                              (state) =>
                                                new Object({
                                                  title: state,
                                                  action: () =>
                                                    this.setState({
                                                      filter: state,
                                                    }),
                                                })
                                            )}
                                            button={React.forwardRef(
                                              ({ onClick }, ref) => {
                                                return (
                                                  <div
                                                    class="dropdown show"
                                                    ref={ref}
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      onClick(e);
                                                    }}
                                                  >
                                                    <a
                                                      class="btn btn-filter dropdown-toggle"
                                                      href="#"
                                                      data-toggle="dropdown"
                                                      aria-haspopup="true"
                                                      aria-expanded="false"
                                                    >
                                                      <span class="selection">
                                                        Unused
                                                      </span>
                                                    </a>
                                                  </div>
                                                );
                                              }
                                            )}
                                          />

                                          {/* <div class="dropdown show">
                                            <a
                                              class="btn btn-filter dropdown-toggle"
                                              href="#"
                                              data-toggle="dropdown"
                                              aria-haspopup="true"
                                              aria-expanded="false"
                                            >
                                              <span class="selection">
                                                Unused
                                              </span>
                                            </a>
                                            <div class="drp-select dropdown-menu">
                                              <a
                                                class="dropdown-item"
                                                href="JavaScript:Void(0);"
                                              >
                                                Most Rated
                                              </a>
                                              <a
                                                class="dropdown-item"
                                                href="JavaScript:Void(0);"
                                              >
                                                Most Viewd
                                              </a>
                                              <a
                                                class="dropdown-item"
                                                href="JavaScript:Void(0);"
                                              >
                                                News Listings
                                              </a>
                                              <a
                                                class="dropdown-item"
                                                href="JavaScript:Void(0);"
                                              >
                                                High Rated
                                              </a>
                                            </div> */}
                                          {/* </div> */}
                                        </div>
                                        <div class="lmk_485">
                                          <ul class="shorting_grid">
                                            <li class="list-inline-item">
                                              <Text_btn
                                                text="Create Voucher"
                                                action={
                                                  this.toggle_create_voucher
                                                }
                                              />
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

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
