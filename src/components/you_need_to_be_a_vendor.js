import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import Small_btn from "./small_btn";

class You_need_to_be_a_vendor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
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
        <p className="lead">
          Hello,{" "}
          <span style={{ textTransform: "capitalize", fontWeight: "bold" }}>
            User
          </span>
        </p>
        <h4 className="my-5">
          you need to be a vendor to proceed with selected action
        </h4>

        <Small_btn
          title="Proceed to Create Vendor Profile"
          action={() =>
            window.location.assign(`${client_domain}/become_a_vendor`)
          }
        />
        <Small_btn
          title="Go Home"
          action={() => window.location.assign(client_domain)}
        />
      </div>
    );
  }
}

export default You_need_to_be_a_vendor;
