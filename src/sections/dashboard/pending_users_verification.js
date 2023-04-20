import React from "react";
import { post_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import User_card from "../../components/user_card";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Pending_users_verification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let users = await post_request("pending_user_verifications");

    this.setState({ users });
  };

  on_verify = (user) => {
    let { users } = this.state;

    users = users.filter((usr) => usr._id !== user._id);

    this.setState({ users });
  };

  render() {
    let { users } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="pending users verification" />
        <div className="row">
          {users ? (
            users.length ? (
              users.map((user) => (
                <User_card
                  on_verify={this.on_verify}
                  admin
                  user={user}
                  key={user._id}
                />
              ))
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>
      </div>
    );
  }
}

export default Pending_users_verification;
