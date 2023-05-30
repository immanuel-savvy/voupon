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
    let sb = this.data_.find((d) => d?._id?.startsWith("subscription"));
    if (sb) this.setState({ datum: sb }, this.details.toggle);
  };

  render() {
    let { transaction, in_vendor, datum } = this.props;

    let { title, data, customer, vendor, type, credit, value, created } =
      transaction;
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

    return (
      <div className="col-md-6 col-lg-6 col-sm-12">
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
              <a href="#" onClick={this.tx_clicked}>
                {title || "Voucher used"}
              </a>

              <div className="ml-2 crs_cates cl_1">
                <span style={{ fontWeight: "normal" }}>
                  {to_title(type || "voucher")}
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

                {this.data_.length ? (
                  <>
                    <Text_btn
                      text="View details"
                      action={this.handle_details}
                    />
                    <br />
                  </>
                ) : null}
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
                &#8358; {commalise_figures(value)}
              </small>
            </b>
            <span class="small">
              {time_string(created)}, {date_string(created)}
            </span>
          </div>
        </div>

        <Modal ref={(details) => (this.details = details)}>
          <Product_subscription subscription={datum} />
        </Modal>
      </div>
    );
  }
}

export default Transaction;
