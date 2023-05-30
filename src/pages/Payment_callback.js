import React from "react";
import { post_request } from "../assets/js/utils/services";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Footer from "../sections/footer";
import Custom_nav from "../sections/nav";

class Payment_callback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let search = window.location.search.split("&");

    if (search.length !== 2) return window.history.go(-1);

    search = search[1].split("=");
    if (search[0] !== "reference") return window.history.go(-1);

    let res = await post_request(`payment_callbacks/${search[1]}`);

    res?.redirect ? window.location.assign(res.redirect) : new Array();
  };

  render() {
    return (
      <div>
        <Custom_nav />
        <Padder />

        <div
          style={{
            height: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loadindicator text="Processing your payments..." />
        </div>

        <Footer />
      </div>
    );
  }
}

export default Payment_callback;
