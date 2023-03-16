import React from "react";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import { Loggeduser } from "../Contexts";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Nav from "../sections/nav";
import User_tickets from "../sections/user_tickets";

class User_tickets_dash extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          if (!this.loggeduser) return <Loadindicator />;

          return (
            <div>
              <Nav page="tickets" />

              <Padder />
              <Breadcrumb_banner page="My Tickets" />

              <User_tickets />

              <Footer />
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default User_tickets_dash;
