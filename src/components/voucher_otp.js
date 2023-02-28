import React from "react";
import Stretch_button from "./stretch_button";

class Voucher_otp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let {
      toggle,
      redeeming,
      tranferring,
      email,
      clear_message,
      message,
      proceed,
      proceed_title,
    } = this.props;
    let { code } = this.state;

    let title = proceed_title
      ? proceed_title
      : redeeming || !tranferring
      ? "redeem"
      : "transfer";
    redeeming = redeeming || tranferring;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <span
            className="text-info"
            style={{ marginTop: 10, textAlign: "center", fontSize: 16 }}
          >
            One-Time Password has been sent to <br />
            <b>{email || "test@mail.com"}</b>
          </span>

          <div class="modal-header">
            <h5 class="modal-title">Enter Voucher OTP</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => toggle && toggle()}
            >
              <span aria-hidden="true">
                <i class="fas fa-times-circle"></i>
              </span>
            </button>
          </div>
          <div class="modal-body">
            <div class="login-form">
              <form>
                <div class="form-group">
                  <label>OTP</label>
                  <div class="input-with-icon">
                    <input
                      type="text"
                      class="form-control"
                      value={code}
                      onChange={({ target }) =>
                        this.setState(
                          {
                            code: target.value,
                          },
                          clear_message
                        )
                      }
                      placeholder="* * * * * *"
                    />
                    <i class="ti-user"></i>
                  </div>
                </div>

                {message ? <p className="text-danger">{message}</p> : null}

                <div class="form-group">
                  <Stretch_button
                    title={redeeming ? `${title}ing` : title}
                    action={() => proceed && proceed(code)}
                    disabled={redeeming}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Voucher_otp;
