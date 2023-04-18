import React from "react";
import { Link } from "react-router-dom";
import { commalise_figures } from "../assets/js/utils/functions";
import { save_to_session } from "../sections/footer";
import Preview_image from "./preview_image";

class Product_alt extends React.Component {
  constructor(props) {
    super(props);

    let { wished } = this.props;

    this.state = {
      wished,
    };
  }

  handle_product = () => {
    let { product } = this.props;

    save_to_session("product", product);
  };

  render() {
    let { wished } = this.state;
    let { class_name, product, remove_wishlist } = this.props;
    let { vendor, title, images, value, _id } = product;

    return (
      <div class={class_name || "col-12"}>
        <div class="prd_grid_box list_view">
          <div class="prd_grid_thumb">
            <Link to={`/product?${_id}`} onClick={this.handle_product}>
              <Preview_image
                image={images[0].url}
                image_hash={images[0].image_hash}
              />
            </Link>
          </div>
          <div class="prd_grid_caption">
            <div class="prd_center_capt">
              <div class="tag_shby">
                <Link
                  to={`/vendor?${vendor._id}`}
                  onClick={() => save_to_session("vendor", vendor)}
                >
                  <span>By {vendor.name}</span>
                </Link>
              </div>
              <div class="prd_title">
                <Link to={`/product?${_id}`} onClick={this.handle_product}>
                  <h4>{title}</h4>
                </Link>
              </div>
              {/* <div class="prd_review">
                <i class="fa fa-star filled"></i>
                <i class="fa fa-star filled"></i>
                <i class="fa fa-star filled"></i>
                <i class="fa fa-star filled"></i>
                <i class="fa fa-star"></i>
                <span>(34)</span>
              </div> */}
              <div class="prd_price_info">
                <h5 class="org_prc">
                  <span class="old_prc"></span>&#8358;{commalise_figures(value)}
                </h5>
              </div>
            </div>
            <div class="prd_bot_capt">
              <div class="prd_button">
                <a href="product-detail.html" class="bth bth_prd">
                  Add To Cart
                </a>
              </div>
              <div
                class="prd_shaved"
                onClick={() => remove_wishlist && remove_wishlist(product)}
              >
                <div class="prt_saveed_12lk">
                  <label
                    class="toggler toggler-danger"
                    style={{ color: wished ? "#198754" : null }}
                  >
                    <input type="checkbox" />
                    <i class="fas fa-heart"></i>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product_alt;
