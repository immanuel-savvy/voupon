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

  remove_from_wishlist = async (product) => {
    let { user } = this.props;

    await post_request("remove_from_wishlist", {
      user: user._id,
      product: product._id,
    });
    let { list } = this.state;

    list = list.filter((item) => item.product._id !== product._id);
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
                    <Product_alt
                      remove_wishlist={this.remove_from_wishlist}
                      wished
                      product={p.product}
                      key={p._id}
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
        </div>
      </div>
    );
  }
}

export default Wishlist;
