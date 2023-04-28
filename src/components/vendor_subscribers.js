import React from "react";
import { post_request } from "../assets/js/utils/services";
import Listempty from "./listempty";
import Loadindicator from "./loadindicator";
import Product_subscription from "./product_subscription";

class Vendor_subscribers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { vendor } = this.props;

    let subscribers = await post_request("vendor_subscribers", {
      vendor: vendor._id,
    });

    this.setState({ subscribers });
  };

  render() {
    let { toggle } = this.props;
    let { subscribers } = this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <div class="modal-header">
            <h5 class="modal-title">Vender Subscribers</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => toggle && toggle()}
            >
              <span aria-hidden="true">
                <i class="fas fa-times-circle"></i>
              </span>
            </button>
          </div>
          <div class="modal-body">
            <div class="login-form">
              {subscribers ? (
                subscribers.length ? (
                  subscribers.map((s) => (
                    <Product_subscription subcription={s} key={s._id} />
                  ))
                ) : (
                  <Listempty />
                )
              ) : (
                <Loadindicator />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Vendor_subscribers;
