import React from "react";
import { to_title } from "../assets/js/utils/functions";

const panels = new Array("vouchers", "coupons", "tickets", "transactions");

class Dash_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { user, set_panel } = this.props;
    let { firstname, lastname, email } = user;

    return (
      <div className="d-user-avater">
        <img
          src={require("../assets/img/user_image_placeholder.png")}
          className="img-fluid avater"
          alt=""
        />
        <h4>{to_title(`${firstname} ${lastname}`)}</h4>
        <span>User</span>
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
      </div>
    );
  }
}

export default Dash_header;
export { panels };
