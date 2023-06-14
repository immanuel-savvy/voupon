import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { domain } from "../assets/js/utils/constants";
import {
  date_string,
  time_string,
  to_title,
} from "../assets/js/utils/functions";
import { Loggeduser } from "../Contexts";
import { emitter } from "../Voupon";
import Dropdown_menu from "./dropdown_menu";
import Modal from "./modal";
import Obtain_coupon from "./obtain_coupon";
import Small_btn from "./small_btn";
import Text_btn from "./text_btn";
import Coupon_created_details from "./coupon_created_details";

class Coupon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  copy_alert = () => {
    clearTimeout(this.clear_copy);
    this.setState({ copied: true });

    emitter.emit("toggle_toast", {
      message: this.props.coupon.coupon_code,
      title: "Coupon code copied!",
    });
    this.clear_copy = setTimeout(() => this.setState({ copied: false }), 3000);
  };

  toggle_obtain_coupon = () => this.obtain_coupon?.toggle();

  toggle_copy_coupon_code = () => this.coupon_code?.toggle();

  handle_coupon = () => {
    let { coupon } = this.props;
    let { type } = coupon;

    if (type === "open") {
      this.toggle_copy_coupon_code();
    } else this.toggle_obtain_coupon();
  };

  render() {
    let { copied } = this.state;

    let {
      coupon,
      in_user,
      applied,
      vendor: vendor_,
      in_vendor,
      full,
    } = this.props;
    let {
      vendor,
      title,
      _id: coupon_id,
      value,
      quantities,
      state,
      coupon_code,
      duration,
      obtained,
      total_usage,
      type,
    } = coupon;
    if (typeof vendor !== "object") vendor = vendor_;
    let { logo, _id } = vendor || new Object();

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          return (
            <div
              className={full || applied ? "" : "col-lg-4 col-md-4 col-sm-6"}
            >
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
                      <a>{title}</a>{" "}
                      {applied ? (
                        <div className="ml-2 crs_cates cl_2">
                          <span>Applied</span>
                        </div>
                      ) : state === "closed" ? (
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
                                title: "update coupon",
                                action: this.update_coupon,
                              },
                              {
                                title: "delete coupon",
                                action: this.delete_coupon,
                              }
                            )
                          }
                        />
                      ) : null}
                    </div>
                  </h4>
                  <ul className="meta">
                    {coupon_id?.startsWith("offer_voucher") ? null : (
                      <li className="video">
                        {type === "premium" && !in_user ? (
                          <Text_btn text="Premium" />
                        ) : copied ? (
                          <Text_btn icon="fa-check" />
                        ) : (
                          <></> || (
                            <CopyToClipboard
                              text={coupon_code}
                              onCopy={this.copy_alert}
                            >
                              <span>
                                <Text_btn
                                  text={coupon_code}
                                  icon={copied ? "fa-check" : "fa-copy"}
                                />
                              </span>
                            </CopyToClipboard>
                          )
                        )}
                      </li>
                    )}
                    <li style={{ fontWeight: "bold" }} className="video">
                      <span style={{ fontWeight: "normal" }}>Discount: </span>
                      {value}
                      <span>%</span>
                    </li>

                    {in_vendor ||
                    !Number(quantities) ||
                    Number(quantities) < 0 ? (
                      <li className="video">
                        <span>Total Usage:</span>
                        <b> {total_usage || 0}</b>
                      </li>
                    ) : null}
                    {in_user ||
                    !Number(quantities) ||
                    Number(quantities) < 0 ? null : (
                      <li className="video">
                        <span>Quantities:</span>
                        <b> {quantities}</b>
                      </li>
                    )}
                    {in_vendor && type === "premium" ? (
                      <li className="video">
                        <span>Total Obtained:</span>
                        <b> {obtained}</b>
                      </li>
                    ) : null}

                    <li className="video">
                      <span>Valid till:</span>&nbsp;
                      <b>
                        {duration
                          ? ` ${time_string(duration)}, ${date_string(
                              duration
                            )}`
                          : "-"}
                      </b>
                    </li>

                    {in_user || applied ? null : (
                      <Small_btn
                        style={{ marginTop: 10 }}
                        title={
                          type === "open" ? "Get coupon code" : "Obtain coupon"
                        }
                        action={this.handle_coupon}
                      />
                    )}
                  </ul>
                </div>

                <CopyToClipboard
                  ref={(copy_code) => (this.copy_code = copy_code)}
                  text={coupon_code}
                >
                  {<></>}
                </CopyToClipboard>
                {state === "outlived" ? (
                  <div className="ml-2 crs_cates cl_1">
                    <span>{to_title(state)}</span>
                  </div>
                ) : null}
              </div>

              <Modal
                ref={(obtain_coupon) => (this.obtain_coupon = obtain_coupon)}
              >
                <Obtain_coupon
                  coupon={coupon}
                  toggle={this.toggle_obtain_coupon}
                  user={loggeduser}
                />
              </Modal>

              <Modal ref={(coupon_code) => (this.coupon_code = coupon_code)}>
                <Coupon_created_details
                  coupon={coupon}
                  toggle={this.toggle_copy_coupon_code}
                  user={loggeduser}
                  need_user
                />
              </Modal>
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Coupon;
