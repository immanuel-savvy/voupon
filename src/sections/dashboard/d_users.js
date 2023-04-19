import React from "react";
import { post_request } from "../../assets/js/utils/services";

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
    return <></>;
  }
}

export default D_users;
