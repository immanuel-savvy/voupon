import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import Padder from "../components/padder";
import { Loggeduser } from "../Contexts";
import Footer from "../sections/footer";
import Nav from "../sections/nav";

class Become_a_vendor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    if (!this.loggeduser || typeof this.loggeduser === "string") {
      window.sessionStorage.setItem("redired", window.location.href);
      window.location.assign(`${client_domain}/login`);
    }
  };

  render() {
    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          return (
            <div>
              <Nav page="become a vendor" />
              <Padder />

              <Footer />
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Become_a_vendor;
