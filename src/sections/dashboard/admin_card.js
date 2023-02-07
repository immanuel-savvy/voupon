import React from "react";
import { domain, default_admin } from "../../assets/js/utils/constants";
import { to_title } from "../../assets/js/utils/functions";
import { Logged_admin } from "../../Contexts";

class Admin_card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Logged_admin.Consumer>
        {({ admin_logged }) => {
          let { firstname, lastname, image: _image, _id } = admin_logged;
          return (
            <div class="d-user-avater">
              <img
                src={`${domain}/Images/${_image || "logo_single.png"}`}
                class="img-fluid avater"
                alt=""
              />
              <h4>{to_title(`${firstname} ${lastname}`.trim())}</h4>
              <span>{_id === default_admin ? "Default Admin" : "Admin"}</span>
              <div class="elso_syu89">
                <ul>
                  <li>
                    <a href="#">
                      <i class="ti-pencil"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          );
        }}
      </Logged_admin.Consumer>
    );
  }
}

export default Admin_card;
