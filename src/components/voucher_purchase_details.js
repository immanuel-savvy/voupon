import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

class Voucher_purchase_details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  copy_alert = () => {
    clearTimeout(this.clear_copy);
    this.setState({ copied: true });

    this.clear_copy = setTimeout(() => this.setState({ copied: false }), 3000);
  };

  render() {
    let { copied } = this.state;
    let { details } = this.props || new Object();
    let { voucher_code, firstname, lastname, email } = details;

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
        <h4>Voucher Purchased Successfully</h4>
        <p>with voucher code </p>
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
          Details on your voucher has been sent to your email at{" "}
          <b>
            <em>{email}</em>
          </b>
        </p>

        <p>Please do ensure to keep it safe!</p>
      </div>
    );
  }
}

export default Voucher_purchase_details;
