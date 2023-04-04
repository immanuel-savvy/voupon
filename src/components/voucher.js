import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { domain } from "../assets/js/utils/constants";
import { commalise_figures, to_title } from "../assets/js/utils/functions";
import { get_request, post_request } from "../assets/js/utils/services";
import { Loggeduser } from "../Contexts";
import Dropdown_menu from "./dropdown_menu";
import Modal from "./modal";
import Redeem_voucher from "./redeem_voucher";
import Text_btn from "./text_btn";
import Transfer_voucher from "./transfer_voucher";
import Use_voucher from "./use_voucher";

class Voucher extends React.Component {
  constructor(props) {
    super(props);

    let { vendor, voucher } = this.props;
    this.state = { vendor, redeemed: voucher.redeemed };
  }

  componentDidMount = async () => {
    let { voucher } = this.props;
    let { vendor } = this.state;

    if (!vendor || (typeof vendor !== "object" && voucher.vendor)) {
      vendor = await get_request(`vendor/${voucher.vendor}`);
      this.setState({ vendor });
    }
  };

  on_redeem = () => {
    this.setState({ redeemed: true }, this.redeem_voucher);
  };

  redeem_voucher = () => this.redeem_voucher_?.toggle();

  on_tranfer = () => this.setState({ transferred: true });

  transfer_voucher = () => this.transfer_voucher_?.toggle();

  use_voucher = () => this.use_voucher_?.toggle();

  close_offer = async () => {
    if (!window.confirm("Are you sure to close voucher?")) return;

    let { voucher } = this.props;
    let { vendor } = this.state;

    let res = await post_request("close_voucher", {
      voucher: voucher._id,
      vendor: vendor._id,
    });

    if (res && res.voucher) this.setState({ closed: true });
  };

  copy_alert = () => {
    clearTimeout(this.clear_copy);
    this.setState({ copied: true });

    this.clear_copy = setTimeout(() => this.setState({ copied: false }), 3000);
  };

  render() {
    let { vendor, redeemed, closed, transferred, copied } = this.state;

    let { voucher, full, in_vendor, voucher_code } = this.props;

    let { logo, _id } = vendor || new Object();

    let {
      title,
      value,
      quantities,
      state,
      total_sales,
      _id: voucher_id,
      duration,
    } = voucher;

    if (duration && duration < Date.now()) state = "outlived";
    if (!state) state = "unused";
    if (redeemed) state = "redeemed";
    if (transferred) state = "transferred";
    if (closed) state = "closed";

    let voucher_btns = new Array(
      {
        title: "redeem",
        action: this.redeem_voucher,
      },
      {
        title: "transfer",
        action: this.transfer_voucher,
      },
      !voucher.vendor ? null : { title: "use", action: this.use_voucher }
    );

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          return (
            <div className={full ? "" : "col-lg-4 col-md-4 col-sm-6"}>
              <div className="edu_cat_2 cat-1">
                <div className="edu_cat_icons">
                  <a className="pic-main" href="#">
                    <img
                      src={`${domain}/images/${logo}`}
                      className="img-fluid"
                      alt=""
                    />
                  </a>
                </div>

                <div className="edu_cat_data">
                  <h4 className="title">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <a href="#">{title}</a>{" "}
                      {state === "closed" ? (
                        <div className="ml-2 crs_cates cl_1">
                          <span>{to_title(state)}</span>
                        </div>
                      ) : in_vendor &&
                        loggeduser &&
                        loggeduser.vendor === _id ? (
                        <Dropdown_menu
                          items={
                            new Array(
                              {
                                title: "update offer",
                                action: this.update_offer,
                              },
                              state === "closed"
                                ? null
                                : {
                                    title: "close offer",
                                    action: this.close_offer,
                                  }
                            )
                          }
                        />
                      ) : null}
                    </div>
                  </h4>
                  <ul className="meta">
                    {voucher_id.startsWith("offer_voucher") ? null : (
                      <li className="video">
                        {copied ? (
                          <Text_btn icon="fa-check" />
                        ) : (
                          <CopyToClipboard
                            text={voucher_code}
                            onCopy={this.copy_alert}
                          >
                            <span>
                              <Text_btn
                                text={voucher_code}
                                icon={copied ? "fa-check" : "fa-copy"}
                              />
                            </span>
                          </CopyToClipboard>
                        )}
                      </li>
                    )}
                    <li style={{ fontWeight: "bold" }} className="video">
                      <span>&#8358;</span>
                      {commalise_figures(Number(value))}
                    </li>

                    {in_vendor ? (
                      <li className="video">
                        <span>Total Sales:</span>
                        {total_sales}
                      </li>
                    ) : null}
                    <li className="video">
                      <span>Quantities:</span>
                      {quantities}
                    </li>
                  </ul>

                  {full || in_vendor ? null : state === "unused" ? (
                    <span className="mt-2">
                      {voucher_btns.map(
                        (v) =>
                          v && (
                            <Text_btn
                              text={to_title(v.title)}
                              action={v.action}
                            />
                          )
                      )}
                    </span>
                  ) : null}
                </div>

                {state === "outlived" ? (
                  <div className="ml-2 crs_cates cl_1">
                    <span>{to_title(state)}</span>
                  </div>
                ) : null}
                {full || in_vendor ? null : state === "unused" ? null : (
                  <div className="crs_cates cl_1">
                    <span>{to_title(state)}</span>
                  </div>
                )}
              </div>

              <Modal
                ref={(redeem_voucher_) =>
                  (this.redeem_voucher_ = redeem_voucher_)
                }
              >
                <Redeem_voucher
                  voucher={{ ...voucher, voucher_code }}
                  on_redeem={this.on_redeem}
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
                  on_tranfer={this.on_tranfer}
                  toggle={this.transfer_voucher}
                />
              </Modal>

              <Modal ref={(use_voucher_) => (this.use_voucher_ = use_voucher_)}>
                <Use_voucher
                  voucher={{ ...voucher, voucher_code }}
                  vendor={vendor}
                  on_use={this.on_use}
                  toggle={this.use_voucher}
                />
              </Modal>
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Voucher;
