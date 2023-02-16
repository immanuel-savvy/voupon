import React from "react";
import { domain } from "../assets/js/utils/constants";
import { commalise_figures, to_title } from "../assets/js/utils/functions";
import { get_request } from "../assets/js/utils/services";
import { Loggeduser } from "../Contexts";
import Dropdown_menu from "./dropdown_menu";
import Modal from "./modal";
import Redeem_voucher from "./redeem_voucher";
import Text_btn from "./text_btn";
import Transfer_voucher from "./transfer_voucher";

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

  remove_voucher = () => {};

  render() {
    let { vendor, redeemed, transferred } = this.state;

    let { voucher, full, in_vendor, voucher_code } = this.props;

    let { logo, _id } = vendor || new Object();

    let { title, value, quantities, state, total_sales, description } = voucher;

    if (!state) state = "unused";
    if (redeemed) state = "redeemed";
    if (transferred) state = "transferred";

    return (
      <Loggeduser>
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
                    <a href="#">{title}</a>
                    {in_vendor && loggeduser && loggeduser.vendor === _id ? (
                      <div>
                        <Text_btn text="Remove" action={this.remove_voucher} />
                      </div>
                    ) : null}
                  </h4>
                  <ul className="meta">
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
                </div>

                {full || in_vendor ? null : state === "unused" ? (
                  <div className="edu_cat_data">
                    <div className="meta">
                      <Dropdown_menu
                        items={
                          new Array(
                            {
                              title: "redeem",
                              action: this.redeem_voucher,
                            },
                            { title: "transfer", action: this.transfer_voucher }
                          )
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="crs_cates cl_1">
                    <span>{to_title(state)}</span>
                  </div>
                )}
              </div>
              <span>{description}</span>

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
            </div>
          );
        }}
      </Loggeduser>
    );
  }
}

export default Voucher;
