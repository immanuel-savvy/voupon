import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Modal_form_title from "./modal_form_title";
import Login from "./login";

class Coupon_created_details extends React.Component {
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
    let { coupon, toggle, verified, user, need_user } = this.props;
    let { coupon_code, value, title } = coupon;

    if (need_user && !user) return <Login no_redirect />;

    return (
      <>
        {need_user ? <Modal_form_title toggle={toggle} /> : null}
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
              Coupon code copied to clipboard!
            </div>
          ) : null}

          <p style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ flex: 1 }} />
            <span
              style={{ textTransform: "capitalize", fontWeight: "bold" }}
              className="text-success"
            >
              {need_user
                ? "Coupon Details"
                : `Coupon ${verified ? "verified" : "created"} Successfully`}
            </span>

            {need_user ? (
              <div style={{ flex: 1 }} />
            ) : (
              <span
                style={{ flex: 1, textAlign: "right", cursor: "pointer" }}
                onClick={toggle}
              >
                Close
              </span>
            )}
          </p>
          <h4>{title}</h4>
          {coupon_code ? (
            <>
              <p>with coupon code </p>
              <CopyToClipboard text={coupon_code} onCopy={this.copy_alert}>
                <h2 style={{ cursor: "pointer" }}>
                  {coupon_code}{" "}
                  <span>
                    <i
                      style={{ color: "rgb(30, 144, 255, 0.8)", fontSize: 22 }}
                      className="fas fa-copy"
                    ></i>
                  </span>
                </h2>
              </CopyToClipboard>
            </>
          ) : null}
          <p>
            <span style={{ textTransform: "capitalize", fontWeight: "bold" }}>
              Value:
            </span>
          </p>
          <h4>{value}%</h4>
        </div>
      </>
    );
  }
}

export default Coupon_created_details;
