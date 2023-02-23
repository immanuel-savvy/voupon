import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { to_title } from "../assets/js/utils/functions";
import Text_btn from "./text_btn";

class Voucher_verified_details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { copied } = this.state;
    let { voucher, toggle } = this.props;
    let { user, state, voucher_code, voucher: voucher_ } = voucher;
    let { value } = voucher_;
    let { firstname, email, lastname } = user;

    return (
      <div
        style={{
          textAlign: "center",
          boxShadow: `rgba(0, 0, 0, 0.3) 5px 5px 12px`,
          borderRadius: 20,
          padding: 20,
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Text_btn
            action={toggle}
            icon="fa-window-close"
            style={{ paddingRight: 15 }}
          />
        </div>

        {copied ? (
          <div className="alert alert-info" role="alert">
            Voucher code copied to clipboard!
          </div>
        ) : null}

        <p>
          Hello,{" "}
          <span style={{ textTransform: "capitalize", fontWeight: "bold" }}>
            {firstname} {lastname}
          </span>
        </p>
        <h4>Voucher Verified</h4>
        <p>with voucher code</p>
        <CopyToClipboard text={voucher_code} onCopy={this.copy_alert}>
          <h2 style={{ cursor: "pointer" }}>
            {voucher_code}{" "}
            <span>
              <i
                style={{ color: "rgb(30, 144, 255, 0.8)", fontSize: 22 }}
                className="fas fa-copy"
              ></i>
            </span>
          </h2>
        </CopyToClipboard>

        <p>
          Voucher State:
          <br />
          <div className="crs_cates cl_1">
            <span>{to_title(state || "unused")}</span>
          </div>{" "}
        </p>

        <p>Please do ensure to keep it safe!</p>
      </div>
    );
  }
}

export default Voucher_verified_details;
