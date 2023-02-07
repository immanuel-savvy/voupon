import React from "react";
import { get_request } from "../assets/js/utils/services";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Vendor_header from "../components/vender_header";
import { Loggeduser } from "../Contexts";
import Footer from "../sections/footer";
import Nav from "../sections/nav";

class Vendor_profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    if (!this.loggeduser) return window.history.go(-1);

    let vendor = await get_request(`vendor/${this.loggeduser.vendor}`);
    console.log(vendor);

    if (!vendor || (vendor && !vendor._id)) return window.history.go(-1);
    this.setState({ vendor });
  };

  render() {
    let { vendor } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          return (
            <div id="main-wrapper">
              <Nav page="vendor" />
              <Padder />

              {typeof vendor !== "object" ? (
                <Loadindicator contained />
              ) : (
                <>
                  <Vendor_header loggeduser={loggeduser} vendor={vendor} />
                </>
              )}

              <Footer />
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Vendor_profile;
