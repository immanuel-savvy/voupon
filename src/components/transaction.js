import React from "react";
import { Link } from "react-router-dom";
import {
  commalise_figures,
  date_string,
  time_string,
  to_title,
} from "../assets/js/utils/functions";
import { save_to_session } from "../sections/footer";
import Modal from "./modal";
import Product_subscription from "./product_subscription";
import Text_btn from "./text_btn";
import Coupon from "./coupon";
import Modal_form_title from "./modal_form_title";

class Transaction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  tx_clicked = (e) => {
    e.preventDefault();
  };

  handle_click = (datatype, data, vendor) => {
    save_to_session(datatype, data);
    save_to_session("vendor", vendor);
  };

  handle_details = () => {
    let { transaction } = this.props;
    let { subscription: sb } = transaction;

    if (sb && typeof sb === "object")
      this.setState({ datum: sb }, this.details.toggle);
  };

  toggle_coupon = () => this.coupon?.toggle();

  render() {
    let { datum } = this.state;
    let { transaction, in_vendor } = this.props;

    let {
      title,
      data,
      customer,
      subscription,
      vendor,
      type,
      credit,
      value,
      created,
      authorisation,
      coupon,
    } = transaction;

    this.data_ = data;
    if (Array.isArray(data))
      data = data.find((d) =>
        new Array("events", "vouchers", "products").includes(
          d?._id?.split("~")[0]
        )
      );
    this.data_ = new Array();

    let routename = "";
    if (data)
      routename = data._id.startsWith("events")
        ? "event"
        : data._id?.startsWith("vouchers")
        ? "voucher"
        : data._id?.startsWith("products")
        ? "product"
        : "";

    authorisation && console.log(authorisation);

    return (
      <div
        className="col-md-5 col-lg-5 col-sm-12"
        style={{
          borderBottom: "1px solid #eee",
          boxShadow: "5px 5px 20px #eee",
          margin: 20,
          boxSizing: "border-box",
          borderRadius: 10,
        }}
      >
        <div class="ground ground-list-single">
          <div
            class={`rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center bg-light-${
              credit ? "success" : "warning"
            }`}
          >
            <div
              class={`position-absolute text-${
                credit ? "success" : "warning"
              } h5 mb-0`}
            >
              <i class={`fas fa-arrow-${credit ? "down" : "up"}`}></i>
            </div>
          </div>

          <div class="ground-content">
            <h6>
              {datum || subscription ? (
                <a href="#" onClick={this.handle_details}>
                  {title}
                </a>
              ) : (
                <span>{title}</span>
              )}

              <div className="ml-2 crs_cates cl_1">
                <span style={{ fontWeight: "normal" }}>
                  {to_title(type?.replace(/_/g, " ") || "voucher")}
                </span>
              </div>
            </h6>

            {data && data._id ? (
              <>
                <Link
                  onClick={() => this.handle_click(routename, data, vendor)}
                  to={`/${routename}`}
                >
                  <h5 style={{ marginBottom: 0 }}>{data.title}</h5>
                </Link>
              </>
            ) : null}

            {(customer && in_vendor) || (vendor && !in_vendor) ? (
              <p>
                {in_vendor ? "User" : "Vendor"}:{" "}
                <Link
                  onClick={
                    in_vendor ? null : () => save_to_session("vendor", vendor)
                  }
                  to={in_vendor ? "" : `/vendor?${vendor._id}`}
                >
                  <b>
                    {to_title(
                      in_vendor
                        ? `${customer.firstname} ${customer.lastname}`
                        : vendor.name
                    )}
                  </b>
                </Link>
              </p>
            ) : null}

            <b>
              <small class="text-fade">
                {type === "reward_token" ? "RTK" : <>&#8358;</>}{" "}
                {commalise_figures(value)}
                {coupon ? (
                  <div
                    className="ml-2 crs_cates cl_2 cursor-pointer"
                    onClick={this.toggle_coupon}
                  >
                    <span style={{ fontWeight: "normal" }}>
                      {`${coupon?.value}% OFF`}
                    </span>
                  </div>
                ) : null}
              </small>
            </b>

            <br />

            {authorisation ? (
              <span>
                <b>Authorisation:</b>
                <br />
                <span className="">
                  <em>
                    <b>Type</b>
                  </em>
                  : {authorisation.authorisation.card_type}
                  &nbsp; &nbsp;
                  <em>
                    <b>Last4</b>
                  </em>
                  : {authorisation.authorisation.last4}
                  &nbsp; &nbsp;
                  <em>
                    <b>Expiry</b>
                  </em>
                  : {authorisation.authorisation.exp_month}/
                  {authorisation.authorisation.exp_year}
                  <br />
                </span>

                {/* {subscription && subscription.running !== false ? (
                  <Text_btn text="Update Card" action={this.update_card} />
                ) : null} */}
                <hr />
              </span>
            ) : (
              <span>
                <b>Authorisation:</b> Wallet
              </span>
            )}

            <span class="small">
              {time_string(created)}, {date_string(created)}
            </span>
          </div>
        </div>

        <Modal ref={(details) => (this.details = details)}>
          <Product_subscription
            subscription={{ subscription: datum }}
            toggle={this.handle_details}
          />
        </Modal>

        <Modal ref={(coupon) => (this.coupon = coupon)}>
          <div className="px-4">
            <Modal_form_title title="Coupon" toggle={this.toggle_coupon} />
            <Coupon coupon={coupon} full />
          </div>
        </Modal>
      </div>
    );
  }
}

export default Transaction;
