import React from "react";

class Vouchers_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { total, page, limit, length } = this.props;

    return (
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="short_wraping">
            <div class="row m-0 align-items-center justify-content-between">
              <div class="col-lg-4 col-md-5 col-sm-12  col-sm-6">
                <div class="shorting_pagination_laft">
                  <h6 class="m-0">
                    Showing {limit * (page - 1) + 1}-
                    {limit * (page - 1) + length} of {total}
                  </h6>
                </div>
              </div>

              {/* <div class="col-lg-8 col-md-7 col-sm-12 col-sm-6">
                <div class="dlks_152">
                  <div class="shorting-right mr-2">
                    <label>Short By:</label>
                    <div class="dropdown show">
                      <a
                        class="btn btn-filter dropdown-toggle"
                        href="#"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span class="selection">Most Rated</span>
                      </a>
                      <div class="drp-select dropdown-menu">
                        <a class="dropdown-item" href="JavaScript:Void(0);">
                          Most Rated
                        </a>
                        <a class="dropdown-item" href="JavaScript:Void(0);">
                          Most Viewd
                        </a>
                        <a class="dropdown-item" href="JavaScript:Void(0);">
                          News Listings
                        </a>
                        <a class="dropdown-item" href="JavaScript:Void(0);">
                          High Rated
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="lmk_485">
                    <ul class="shorting_grid">
                      <li class="list-inline-item">
                        <a href="grid-layout-with-sidebar.html" class="active">
                          <span class="ti-layout-grid2"></span>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <a href="list-layout-with-sidebar.html">
                          <span class="ti-view-list"></span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Vouchers_header;
