import React from "react";
import { post_request } from "../assets/js/utils/services";
import Listempty from "./listempty";
import Loadindicator from "./loadindicator";
import Product_alt from "./product_alt";

class Wishlist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { user } = this.props;

    let list = await post_request(`wishlist/${user._id}`);
    this.setState({ list });
  };

  render() {
    let { toggle } = this.props;
    let { list } = this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <div class="modal-header">
            <h5 class="modal-title">Wishlist</h5>
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
              {list ? (
                list.length ? (
                  list.map((p) => (
                    <Product_alt product={p.product} key={p._id} />
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

export default Wishlist;
