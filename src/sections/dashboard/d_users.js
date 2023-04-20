import React from "react";
import { post_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import User_card from "../../components/user_card";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class D_users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let users = await post_request("users");

    this.setState({ users });
  };

  render() {
    let { users } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="users" />
        <div className="row">
          {users ? (
            users.length ? (
              users.map((user) => <User_card user={user} key={user._id} />)
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

export default D_users;
