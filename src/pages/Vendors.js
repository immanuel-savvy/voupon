import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import { to_title } from "../assets/js/utils/functions";
import { get_request } from "../assets/js/utils/services";
import Dropdown_menu from "../components/dropdown_menu";
import Listempty from "../components/listempty";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Section_header from "../components/section_headers";
import Text_btn from "../components/text_btn";
import Vendor from "../components/vendor";
import { Loggeduser } from "../Contexts";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Custom_Nav from "../sections/nav";
import { categories } from "./Become_a_vendor";

class Vendors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 15,
      page: 1,
    };
  }

  fetch_vendors = async (param = "all") => {
    this.setState({ fetching: true });
    let vendors = await get_request(`vendors/${param}`);
    this.setState({ vendors, fetching: false });
  };

  componentDidMount = async () => {
    await this.fetch_vendors();
  };

  handle_user_vendor = () => {
    window.location.assign(
      `${client_domain}/${
        this.loggeduser && this.loggeduser.vendor
          ? `vendor?${this.loggeduser.vendor}`
          : "become_a_vendor"
      }`
    );
  };

  set_category = async (filter) => {
    this.setState({ filter });
    this.toggle_drop();

    await this.fetch_vendors(filter.title);
  };

  render() {
    let { vendors, filter } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          return (
            <div>
              <Custom_Nav page="vendors" />
              <Padder />

              <Breadcrumb_banner page="Vendors" />

              <section class="min gray">
                <div class="container">
                  <Section_header
                    title="Vendors"
                    description="Find your favorite vendors here. "
                  />

                  <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                      <div class="short_wraping">
                        <div class="row m-0 align-items-center justify-content-between">
                          <div class="col-lg-4 col-md-5 col-sm-12  col-sm-6">
                            <div class="shorting_pagination_laft">
                              <h6 class="m-0">Vendors</h6>
                            </div>
                          </div>

                          <div class="col-lg-8 col-md-7 col-sm-12 col-sm-6">
                            <div class="dlks_152">
                              <div class="shorting-right mr-2">
                                <label>Filter By Category:</label>
                                <Dropdown_menu
                                  items={categories.map(
                                    (filter) =>
                                      new Object({
                                        title: filter.title,
                                        action: () => this.set_category(filter),
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
                                            this.toggle_drop = onClick;
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
                                              {to_title(
                                                filter && filter.title
                                              ) || "All"}
                                            </span>
                                          </a>
                                        </div>
                                      );
                                    }
                                  )}
                                />
                              </div>
                              <div class="lmk_485">
                                <ul class="shorting_grid">
                                  <li class="list-inline-item">
                                    <Text_btn
                                      text={
                                        loggeduser && loggeduser.vendor
                                          ? "Vendor Profile"
                                          : "Become a Vendor"
                                      }
                                      action={this.handle_user_vendor}
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
                    {vendors ? (
                      vendors.length ? (
                        vendors.map((vendor) => (
                          <Vendor vendor={vendor} key={vendor._id} />
                        ))
                      ) : (
                        <Listempty />
                      )
                    ) : (
                      <Loadindicator />
                    )}
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

export default Vendors;
