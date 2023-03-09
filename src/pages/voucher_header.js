import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import { gen_random_int } from "../assets/js/utils/functions";
import Preview_image from "../components/preview_image";
import { save_to_session } from "../sections/footer";

class Voucher_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handle_vendor = () => {
    let { vendor } = this.props;

    save_to_session("vendor", vendor);
    window.location.assign(`${client_domain}/vendor?${vendor._id}`);
  };

  render() {
    let { vendor, voucher } = this.props;
    let { name, logo, logo_hash, category } = vendor;
    let { title, total_sales } = voucher;

    return (
      <div className="ed_detail_head">
        <div className="container">
          <div className="row align-items-center justify-content-between mb-2">
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12">
              <div className="dlkio_452">
                <div className="ed_detail_wrap">
                  <div className="crs_cates cl_1">
                    <span>{category}</span>
                  </div>

                  <div className="ed_header_caption">
                    <h2 className="ed_title">{title}</h2>
                  </div>
                  <div className="d-flex align-items-center mt-4">
                    <div className="rounded-circle d-flex align-items-center justify-content-center">
                      <Preview_image
                        image={logo}
                        action={this.handle_vendor}
                        image_hash={logo_hash}
                        class_name="img img-fluid circle"
                        height={70}
                      />
                    </div>
                    <div className="ml-2 ml-md-3">
                      <span>Vendor</span>
                      <h6
                        onClick={this.handle_vendor}
                        style={{ cursor: "pointer" }}
                        className="m-0"
                      >
                        {name}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-5 col-md-5 col-sm-12">
              <ul className="row p-0">
                <li className="col-lg-6 col-md-6 col-sm-6 pt-2 pb-2">
                  <i className="fas fa-star mr-1 text-warning"></i>
                  <span>4.9 Star (5,254)</span>
                </li>
                <li className="col-lg-6 col-md-6 col-sm-6 pt-2 pb-2">
                  <i className="fas fa-clock mr-1 text-success"></i>
                  <span>4 Hour 47 min</span>
                </li>
                <li className="col-lg-6 col-md-6 col-sm-6 pt-2 pb-2">
                  <i className="fas fa-user mr-1 text-info"></i>
                  <span>
                    {total_sales || gen_random_int(500, 100)} Purchased
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Voucher_header;
