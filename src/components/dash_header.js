import React from "react";
import { to_title } from "../assets/js/utils/functions";

class Dash_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { user } = this.props;
    let { firstname, lastname, email } = user;

    return (
      <div className="d-user-avater">
        <img
          src="https://via.placeholder.com/500x500"
          className="img-fluid avater"
          alt=""
        />
        <h4>{to_title(`${firstname} ${lastname}`)}</h4>
        <span>User</span>
        <div className="elso_syu89">
          <ul>
            <li>
              <a href="#">
                <i className="ti-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="ti-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="ti-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="ti-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="elso_syu77">
          <div className="one_third">
            <div className="one_45ic text-warning bg-light-warning">
              <i className="fas fa-star"></i>
            </div>
            <span>Vouchers</span>
          </div>
          <div className="one_third">
            <div className="one_45ic text-success bg-light-success">
              <i className="fas fa-file-invoice"></i>
            </div>
            <span>Coupons</span>
          </div>
          <div className="one_third">
            <div className="one_45ic text-purple bg-light-purple">
              <i className="fas fa-user"></i>
            </div>
            <span>Tickets</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Dash_header;
