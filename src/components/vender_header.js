import React from "react";
import Preview_image from "./preview_image";
import Text_btn from "./text_btn";
import Modal from "./modal";
import Create_offer_voucher from "./create_offer_voucher";
import Close_vendor_account from "./close_vendor_account";

class Vendor_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_create_offer_voucher = () => this.create_offer_voucher.toggle();

  toggle_close_vendor_account = () => this.close_vendor_account.toggle();

  render() {
    let { vendor, loggeduser } = this.props;
    if (!loggeduser || !vendor) return;

    let { logo, name, logo_hash, offer_vouchers } = vendor;
    let { firstname, lastname } = loggeduser;

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
                  {vendor.verified ? null : (
                    <div className="crs_cates cl_1">
                      <span>Pending Approval</span>
                    </div>
                  )}
                  <div className="ed_header_caption">
                    <h4 className="ed_title">{`${firstname} ${lastname}`}</h4>
                    <h2 className="ed_title">{`${name}`}</h2>
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

              <Text_btn
                text="Create offer voucher"
                action={this.toggle_create_offer_voucher}
              />
              <Text_btn
                style={{ color: "red" }}
                text="Close vendor account"
                action={this.toggle_close_vendor_account}
              />
            </div>
          </div>
        </div>

        <Modal
          ref={(create_offer_voucher) =>
            (this.create_offer_voucher = create_offer_voucher)
          }
        >
          <Create_offer_voucher
            vendor={vendor}
            toggle={this.toggle_create_offer_voucher}
          />
        </Modal>

        <Modal
          ref={(close_vendor_account) =>
            (this.close_vendor_account = close_vendor_account)
          }
        >
          <Close_vendor_account
            vendor={vendor}
            toggle={this.toggle_close_vendor_account}
          />
        </Modal>
      </div>
    );
  }
}

export default Vendor_header;
