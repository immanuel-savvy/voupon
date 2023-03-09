import React from "react";
import { to_title } from "../assets/js/utils/functions";
import { get_request } from "../assets/js/utils/services";
import { categories } from "../pages/Become_a_vendor";
import Loadindicator from "./loadindicator";

class Vouchers_sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let top_vendors = await get_request(`vendors/all`);

    this.setState({ top_vendors });
  };

  render() {
    let { top_vendors } = this.state;

    return (
      <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12">
        <div class="page-sidebar p-0">
          <a
            class="filter_links"
            data-toggle="collapse"
            href="#fltbox"
            role="button"
            aria-expanded="false"
            aria-controls="fltbox"
          >
            Open Advance Filter<i class="fa fa-sliders-h ml-2"></i>
          </a>
          <div class="collapse" id="fltbox">
            <div class="sidebar-widgets p-4">
              <div class="form-group">
                <div class="input-with-icon">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search Your Voucher"
                  />
                  <i class="ti-search"></i>
                </div>
              </div>

              <div class="form-group">
                <div class="simple-input">
                  <select id="cates" class="form-control">
                    <option disabled selected value="">
                      --Select Categories--
                    </option>
                    {categories.map((cat) => (
                      <option value={cat._id} key={cat._id}>
                        {to_title(cat.title)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div class="form-group">
                <h6>Top Vendor</h6>
                <ul class="no-ul-list mb-3">
                  {top_vendors ? (
                    top_vendors.map((vendor) => (
                      <li key={vendor._id}>
                        <input
                          id="aa-41"
                          class="checkbox-custom"
                          name="aa-41"
                          type="checkbox"
                          onChange={this.handle_top_vendors}
                        />
                        <label for="aa-41" class="checkbox-custom-label">
                          {to_title(vendor.name)}
                          <i class="count"></i>
                        </label>
                      </li>
                    ))
                  ) : (
                    <Loadindicator />
                  )}
                </ul>
              </div>

              <div class="form-group">
                <h6>Find Voucher by Vendor</h6>
                <div class="input-with-icon">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search Vendor"
                  />
                  <i class="ti-search"></i>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 pt-4">
                  <button class="btn theme-bg rounded full-width">
                    Apply Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Vouchers_sidebar;
