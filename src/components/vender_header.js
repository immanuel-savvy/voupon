import React from "react";
import Preview_image from "./preview_image";
import Modal from "./modal";
import Create_offer_voucher from "./create_offer_voucher";
import Close_vendor_account from "./close_vendor_account";
import Dropdown_menu from "./dropdown_menu";
import Wallet from "./wallet";
import Text_btn from "./text_btn";
import CopyToClipboard from "react-copy-to-clipboard";

const parse_vendor_id = (vendor_id) => {
  vendor_id = vendor_id.split("~");
  vendor_id.splice(0, 1);
  vendor_id.unshift(vendor_id[1].slice(5));
  vendor_id[2] = vendor_id[2].slice(0, 5);

  return vendor_id.join("$");
};

const reset_vendor_id = (vendor_id) => {
  vendor_id = vendor_id.split("$");
  vendor_id = ["vendors", vendor_id[1], `${vendor_id[2]}${vendor_id[0]}`];

  return vendor_id.join("~");
};

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
    loggeduser = loggeduser || new Object();

    let { logo, name, logo_hash, director, verified, _id } = vendor;
    let { firstname, lastname } = director;

    return (
      <div
        className="ed_detail_head bg-cover mb-5"
        style={{
          backgroundImage: `url(${require("../assets/img/vouchers1.png")})`,
          backgroundRepeat: "no-repeat",
        }}
        data-overlay="8"
      >
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-3 col-md-12 col-sm-12">
              <div className="authi_125">
                <div className="authi_125_thumb p-2">
                  <Preview_image
                    style={{
                      maxHeight: 150,
                      borderWidth: 4,
                      borderColor: "#fff",
                      borderStyle: "solid",
                      borderRadius: 10,
                    }}
                    image={
                      logo ||
                      require("../assets/img/user_image_placeholder.png")
                    }
                    image_hash={logo_hash}
                  />
                </div>
              </div>

              <span className="">
                <CopyToClipboard text={parse_vendor_id(_id)}>
                  <>
                    <span className="text-light">Your vendor ID:</span>
                    <br />
                    <span className="">
                      <Text_btn
                        style={{ marginLeft: 0 }}
                        text={parse_vendor_id(_id)}
                        icon="fa-copy"
                      />
                    </span>
                  </>
                </CopyToClipboard>
              </span>
            </div>

            <div className="col-lg-9 col-md-12 col-sm-12">
              <div className="dlkio_452">
                <div className="ed_detail_wrap">
                  {vendor.verified ? null : (
                    <div className="crs_cates cl_1">
                      <span style={{ color: "#fff" }}>Pending Approval</span>
                    </div>
                  )}
                  <div className="ed_header_caption">
                    <h4 className="ed_title text-light">{`${firstname} ${lastname}`}</h4>
                    <h2 className="ed_title text-light">{`${name}`}</h2>
                    <ul>
                      {/* <li className="text-light">
                        <i className="ti-calendar"></i>
                        {`${offer_vouchers || 0} Offer vouchers`}
                      </li> */}
                    </ul>
                  </div>
                  <div className="ed_header_short"></div>
                </div>
                <div className="dlkio_last">
                  <div className="ed_view_link"></div>
                </div>

                {verified &&
                loggeduser.vendor &&
                loggeduser.vendor === vendor._id ? (
                  <>
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
                            style: {
                              backgroundColor: "#d9534f",
                              color: "#fff",
                            },
                            action: this.toggle_close_vendor_account,
                          }
                        )
                      }
                      style={{ alignSelf: "flex-start", marginTop: 24 }}
                    />
                  </>
                ) : null}
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
