import React from "react";
import Preview_image from "./preview_image";

class Vendor_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { vendor, loggeduser } = this.props;
    if (!loggeduser || !vendor) return;

    let { logo, logo_hash, offer_vouchers } = vendor;
    let { firstname, lastname, email } = loggeduser;

    return (
      <div className="ed_detail_head">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-3 col-md-12 col-sm-12">
              <div className="authi_125">
                <div className="authi_125_thumb">
                  <Preview_image
                    image={
                      logo ||
                      require("../assets/img/user_image_placeholder.png")
                    }
                    image_hash={logo_hash}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-9 col-md-12 col-sm-12">
              <div className="dlkio_452">
                <div className="ed_detail_wrap">
                  {/* <div className="crs_cates cl_1">
                    <span>Web Design</span>
                  </div>
                  <div className="crs_cates cl_3">
                    <span>PHP</span>
                  </div> */}
                  <div className="ed_header_caption">
                    <h2 className="ed_title">{`${firstname} ${lastname}`}</h2>
                    <ul>
                      <li>
                        <i className="ti-calendar"></i>
                        {`${offer_vouchers || 0} Offer vouchers`}
                      </li>
                    </ul>
                  </div>
                  <div className="ed_header_short"></div>
                </div>
                <div className="dlkio_last">
                  <div className="ed_view_link"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Vendor_header;
