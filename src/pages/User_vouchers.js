import React from "react";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import { Loggeduser } from "../Contexts";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Nav from "../sections/nav";
import User_vouchers from "../sections/user_vouchers";

class User_vouchers_dash extends React.Component {
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
              <Nav page="vouchers" />

              <Padder />
              <Breadcrumb_banner page="My Vouchers" />

              <User_vouchers />

              <Footer />
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default User_vouchers_dash;
