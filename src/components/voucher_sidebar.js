import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { commalise_figures, to_title } from "../assets/js/utils/functions";
import Get_voucher from "./get_voucher";
import Modal from "./modal";
import Redeem_voucher from "./redeem_voucher";
import Transfer_voucher from "./transfer_voucher";

class Voucher_sidebar extends React.Component {
  constructor(props) {
    super(props);

    let { voucher_code } = this.props;
    this.state = { voucher_code };
  }

  redeem_voucher = () => this.redeem_voucher_?.toggle();

  transfer_voucher = () => this.transfer_voucher_?.toggle();

  componentDidMount = async () => {};

  purchase_voucher = () => this.purchase_voucher_?.toggle();

  render() {
    let { voucher_code } = this.state;
    let { voucher, vendor, on_redeem, on_tranfer } = this.props;
    let { address } = vendor;
    let { value, actual_price, state, quantities, short_description } = voucher;

    voucher_code = voucher_code || voucher.voucher_code;

    return (
      <div className="col-lg-4 col-md-12 order-lg-last">
        <div className="ed_view_box style_2 border ovrlio stick_top min pt-3">
          <span className="ml-3">
            {voucher_code ? "Voucher Code:" : "Voucher Value"}
          </span>
          <div className="ed_author">
            {voucher_code ? (
              <>
                <CopyToClipboard
                  text={state !== "unused" ? null : voucher_code}
                >
                  <h2 style={{ cursor: "pointer" }} className="theme-cl m-0">
                    {voucher_code}&nbsp;&nbsp;
                    {state !== "unused" ? (
                      <div className="crs_cates cl_1">
                        <span>{state}</span>
                      </div>
                    ) : (
                      <span>
                        <i
                          style={{
                            color: "rgb(30, 144, 255, 0.8)",
                            fontSize: 22,
                          }}
                          className="fas fa-copy"
                        ></i>
                      </span>
                    )}
                  </h2>
                </CopyToClipboard>
              </>
            ) : (
              <h2 className="theme-cl m-0">
                &#8358;{commalise_figures(value)}
                {actual_price ? (
                  <span className="old_prc">
                    &#8358;{commalise_figures(actual_price)}
                  </span>
                ) : null}
              </h2>
            )}
          </div>
          {voucher_code ? (
            state !== "unused" ? null : (
              <div className="ed_view_link">
                <a
                  href="#"
                  onClick={this.redeem_voucher}
                  class="btn theme-light enroll-btn"
                >
                  Redeem Voucher<i class="ti-angle-right"></i>
                </a>
                <a
                  href="#"
                  onClick={this.transfer_voucher}
                  class="btn theme-light enroll-btn"
                >
                  Transfer Ownership<i class="ti-angle-right"></i>
                </a>
              </div>
            )
          ) : (
            <div className="ed_view_link">
              <a
                href="#"
                onClick={this.purchase_voucher}
                className="btn theme-bg enroll-btn"
              >
                Get Voucher<i className="ti-angle-right"></i>
              </a>
            </div>
          )}
          <div className="ed_view_features">
            <div className="eld mb-3">
              <h5 className="font-medium">What this offer is about:</h5>
              <p>{short_description}</p>
            </div>
            <div className="eld mb-3">
              <ul className="edu_list right">
                <li>
                  <i className="ti-time"></i>Quantities Remaining:
                  <strong>{quantities}</strong>
                </li>
                <li>
                  <i className="ti-map"></i>Location:
                  <strong>{to_title(address)}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Modal
          ref={(redeem_voucher_) => (this.redeem_voucher_ = redeem_voucher_)}
        >
          <Redeem_voucher
            voucher={{ ...voucher, voucher_code }}
            on_redeem={on_redeem}
            toggle={this.redeem_voucher}
          />
        </Modal>

        <Modal
          ref={(transfer_voucher_) =>
            (this.transfer_voucher_ = transfer_voucher_)
          }
        >
          <Transfer_voucher
            voucher={{ ...voucher, voucher_code }}
            on_tranfer={on_tranfer}
            toggle={this.transfer_voucher}
          />
        </Modal>

        <Modal
          ref={(purchase_voucher_) =>
            (this.purchase_voucher_ = purchase_voucher_)
          }
        >
          <Get_voucher
            voucher={voucher}
            vendor={vendor}
            on_purchase={(voucher_code) => this.setState({ voucher_code })}
            toggle={this.purchase_voucher}
          />
        </Modal>
      </div>
    );
  }
}

export default Voucher_sidebar;
