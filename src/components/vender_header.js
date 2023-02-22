import React from "react";
import Preview_image from "./preview_image";
import Text_btn from "./text_btn";
import Modal from "./modal";
import Create_offer_voucher from "./create_offer_voucher";
import Close_vendor_account from "./close_vendor_account";
import Small_btn from "./small_btn";
import Dropdown_menu from "./dropdown_menu";
import Wallet from "./wallet";

class Vendor_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_create_offer_voucher = () => this.create_offer_voucher.toggle();

  toggle_close_vendor_account = () => this.close_vendor_account.toggle();

  render() {
    let { vendor, loggeduser } = this.props;
    if (!vendor) return;

    let { logo, name, logo_hash, offer_vouchers, user, director } = vendor;
    let { firstname, lastname } = director;
    let { _id } = loggeduser || new Object();

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

                <Wallet vendor={vendor} />

                <Dropdown_menu
                  items={
                    new Array(
                      {
                        title: "Create offer voucher",
                        action: this.toggle_create_offer_voucher,
                      },
                      {
                        title: "Create coupon",
                        action: this.toggle_create_coupon,
                      },
                      {
                        title: "close vendor account",
                        style: { backgroundColor: "#d9534f", color: "#fff" },
                        action: this.toggle_close_vendor_account,
                      }
                    )
                  }
                  style={{ alignSelf: "flex-start", marginTop: 24 }}
                />
              </div>

              {/* {vendor.verified && user === _id ? (
                <>
                  <Small_btn
                    title="Create offer voucher"
                    action={this.toggle_create_offer_voucher}
                  />
                  <Small_btn
                    variant="danger"
                    title="Close vendor account"
                    action={this.toggle_close_vendor_account}
                  />
                </>
              ) : null} */}
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
