import React from "react";
import { Link } from "react-router-dom";
import { commalise_figures } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import { Loggeduser } from "../Contexts";
import { save_to_session } from "../sections/footer";
import Login from "./login";
import Preview_image from "./preview_image";

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  save_to_wishlist = async (loggeduser) => {
    if (!loggeduser)
      return <Login no_redirect action={this.save_to_wishlist} />;

    let { product } = this.props;

    await post_request("add_to_wishlist", {
      product: product._id,
      user: loggeduser._id,
    });
    return;
  };

  handle_product = () => save_to_session("product", this.props.product);

  render() {
    let { class_name, product } = this.props;

    let { title, images, value, _id } = product;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          return (
            <div
              className={class_name || "col-xl-3 col-lg-4 col-md-6 col-sm-12"}
            >
              <div className="prd_grid_box">
                {/* <div className="prd_label hot">Hot</div> */}
                <div className="shd_142">
                  <div
                    className="prt_saveed_12lk"
                    onClick={() => this.save_to_wishlist(loggeduser)}
                  >
                    <label className="toggler toggler-danger">
                      <input type="checkbox" />
                      <i className="fas fa-heart"></i>
                    </label>
                  </div>
                </div>
                <div className="prd_grid_thumb">
                  <Link to={`/product?${_id}`} onClick={this.handle_product}>
                    <Preview_image
                      image={images[0].url}
                      image_hash={images[0].image_hash}
                    />
                  </Link>
                </div>
                <div className="prd_grid_caption">
                  <div className="prd_center_capt">
                    {/* <div className="prd_review">
                <i className="fa fa-star filled"></i>
                <i className="fa fa-star filled"></i>
                <i className="fa fa-star filled"></i>
                <i className="fa fa-star filled"></i>
                <i className="fa fa-star"></i>
                <span>(34)</span>
              </div> */}
                    <Link to={`/product?${_id}`} onClick={this.handle_product}>
                      <div className="prd_title">
                        <h4>{title}</h4>
                      </div>
                    </Link>
                    <div className="prd_price_info">
                      <h5 className="org_prc">
                        <span className="old_prc"></span>&#8358;
                        {commalise_figures(value)}
                      </h5>
                    </div>
                  </div>
                  <div className="prd_bot_capt">
                    <div className="prd_button">
                      <a href="product-detail.html" className="bth bth_prd">
                        Add To Cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Product;
