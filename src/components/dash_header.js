import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import { to_title } from "../assets/js/utils/functions";
import Kyc_docs from "./kyc_docs";
import Modal from "./modal";
import Text_btn from "./text_btn";

const panels = new Array("vouchers", "coupons", "tickets", "transactions");

class Dash_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  get_verified = () => {
    let { user } = this.props;

    window.location.assign(`${client_domain}/get_verified/${user._id}`);
  };

  toggle_kyc_docs = () => this.kyc_docs?.toggle();

  render() {
    let { user, set_panel } = this.props;
    let { firstname, lastname, email, premium, kyc_verified } = user;

    return (
      <div className="d-user-avater">
        <img
          src={require("../assets/img/user_image_placeholder.png")}
          className="img-fluid avater"
          alt=""
        />
        <h4>
          {to_title(`${firstname} ${lastname}`)}{" "}
          {premium ? (
            <span className="theme-cl">
              <i className="fas fa-star"></i>
            </span>
          ) : null}
          {Number(kyc_verified) ? (
            <span className="theme-cl">
              <i className="fas fa-shield-alt"></i>
            </span>
          ) : null}
        </h4>
        <span>{email}</span>
        <br />
        {kyc_verified === "pending" ? (
          <span>
            <Text_btn
              style={{ fontStyle: "italic" }}
              text="Pending Verification"
              action={this.toggle_kyc_docs}
            />
          </span>
        ) : !kyc_verified ? (
          <Text_btn text="Get Verified" action={this.get_verified} />
        ) : null}

        <div className="elso_syu89"></div>
        <div className="elso_syu77 mx-5">
          {panels.map((panel) => (
            <div
              onClick={() => set_panel(panel)}
              key={panel}
              className="one_third cursor-pointer"
            >
              <div className="one_45ic text-info bg-light-info">
                <i className="fas fa-star"></i>
              </div>
              <span>{to_title(panel)}</span>
            </div>
          ))}
        </div>

        <Modal ref={(kyc_docs) => (this.kyc_docs = kyc_docs)}>
          <Kyc_docs user={user} toggle={this.toggle_kyc_docs} />
        </Modal>
      </div>
    );
  }
}

export default Dash_header;
export { panels };
