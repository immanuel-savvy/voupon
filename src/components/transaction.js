import React from "react";
import {
  date_string,
  time_string,
  to_title,
} from "../assets/js/utils/functions";

class Transaction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  tx_clicked = (e) => {
    e.preventDefault();
  };

  render() {
    let { transaction } = this.props;
    let { title, type, credit, value, created } = transaction;

    return (
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

          <b>
            <small class="text-fade">&#8358; {value}</small>
          </b>
          <span class="small">
            {time_string(created)}, {date_string(created)}
          </span>
        </div>
      </div>
    );
  }
}

export default Transaction;
