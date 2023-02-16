import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import { post_request } from "../assets/js/utils/services";
import { Loggeduser } from "../Contexts";
import Stretch_button from "./stretch_button";
import Text_btn from "./text_btn";

class Close_vendor_account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  proceed = async () => {
    let { vendor, toggle } = this.props;

    let res = await post_request(`close_vendor_account/${vendor._id}`);

    if (res && res._id) {
      delete this.loggeduser.vendor;
      delete this.loggeduser.vendor_status;

      this.set_loggeduser(this.loggeduser);
      toggle();

      window.history.go(-1);
    } else toggle();
  };

  render() {
    let { vendor, toggle } = this.props;
    if (!vendor) return;

    let { name } = vendor;

    return (
      <Loggeduser>
        {({ set_loggeduser, loggeduser }) => {
          this.loggeduser = loggeduser;
          this.set_loggeduser = set_loggeduser;

          return (
            <div className="m-5">
              <Text_btn icon="fa-window-close" action={toggle} />
              <h1>{name}</h1>

              <span className="mb-3">
                Are you sure you want to close vendor profile?
              </span>

              <Stretch_button title="proceed" action={this.proceed} />
            </div>
          );
        }}
      </Loggeduser>
    );
  }
}

export default Close_vendor_account;
