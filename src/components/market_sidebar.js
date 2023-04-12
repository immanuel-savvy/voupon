import React from "react";
import { to_title } from "../assets/js/utils/functions";
import { get_request } from "../assets/js/utils/services";
import { installments } from "../pages/Add_product_et_service";
import { categories } from "../pages/Become_a_vendor";
import Loadindicator from "./loadindicator";

class Market_sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let vendors = await get_request("top_vendors");

    this.setState({ vendors });
  };

  render() {
    let { vendors } = this.state;

    return (
      <div class="col-xl-4 col-lg-4 col-md-12 order-lg-2">
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
                    placeholder="Search Products / Services"
                  />
                  <i class="ti-search"></i>
                </div>
              </div>

              <div class="form-group">
                <div class="simple-input">
                  <select
                    onChange={({ target }) =>
                      this.setState({ category: target.value })
                    }
                    id="cates"
                    class="form-control"
                  >
                    <option value="">-- Select Categories --</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat._id}>
                        {to_title(cat.title)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {!vendors || (vendors && vendors.length) ? (
                <div class="form-group">
                  <h6>Top Vendors</h6>
                  <ul class="no-ul-list mb-3">
                    {vendors ? (
                      vendors.map((vendor) => (
                        <li key={vendor._id}>
                          <input
                            id="aa-41"
                            class="checkbox-custom"
                            name="aa-41"
                            type="checkbox"
                          />
                          <label for="aa-41" class="checkbox-custom-label">
                            {to_title(vendor.name)}
                            <i class="count">{vendor.products}</i>
                          </label>
                        </li>
                      ))
                    ) : (
                      <Loadindicator />
                    )}
                  </ul>
                </div>
              ) : null}

              <div class="form-group">
                <h6>Installments</h6>
                <ul class="no-ul-list mb-3">
                  {installments.map((i, index) => (
                    <li key={index}>
                      <input
                        id="l1"
                        class="checkbox-custom"
                        name="l1"
                        type="checkbox"
                      />
                      <label for="l1" class="checkbox-custom-label">
                        {to_title(i)}
                      </label>
                    </li>
                  ))}
                </ul>
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

export default Market_sidebar;
