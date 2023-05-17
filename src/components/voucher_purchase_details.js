import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Modal from "./modal";
import Text_btn from "./text_btn";
import Ticket_codes from "./ticket_codes";

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

  toggle_ticket_codes = () => this.codes?.toggle();

  render() {
    let { copied } = this.state;
    let { details, event } = this.props || new Object();
    let { voucher_code, quantity, firstname, lastname, ticket_id, email, _id } =
      details;
    let is_event = _id && _id.startsWith("event");

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
            {is_event ? "Ticket" : "Voucher"} code copied to clipboard!
          </div>
        ) : null}

        <p>
          Hello,{" "}
          <span style={{ textTransform: "capitalize", fontWeight: "bold" }}>
            {firstname} {lastname}
          </span>
        </p>
        <h4>{is_event ? "Ticket" : "Voucher"} Purchased Successfully</h4>
        <p>with {is_event ? "ticket" : "voucher"} code </p>
        {voucher_code &&
        Array.isArray(voucher_code) &&
        voucher_code.length > 1 ? (
          <>
            <span style={{ fontSize: 18 }}>
              <span>Quantity:</span>{" "}
              <span>
                <b>{quantity || voucher_code.length}</b>
              </span>
            </span>
            <br />
            <br />
            <Text_btn
              text="View ticket codes"
              style={{ fontWeight: "bold" }}
              action={this.toggle_ticket_codes}
            />
            <br />
          </>
        ) : (
          <CopyToClipboard
            text={Array.isArray(voucher_code) ? voucher_code[0] : voucher_code}
            onCopy={this.copy_alert}
          >
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
        )}
        <p>
          Details on your {is_event ? "ticket" : "voucher"} has been sent to
          your email at{" "}
          <b>
            <em>{email}</em>
          </b>
        </p>

        <p>Please do ensure to keep it safe!</p>

        <Modal ref={(codes) => (this.codes = codes)}>
          <Ticket_codes
            ticket={{ ...details, ticket_code: voucher_code, _id: ticket_id }}
            event={event}
            toggle={this.toggle_ticket_codes}
          />
        </Modal>
      </div>
    );
  }
}

export default Voucher_purchase_details;
