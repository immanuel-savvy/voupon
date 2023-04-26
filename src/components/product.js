import React from "react";
import { Link } from "react-router-dom";
import { commalise_figures } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import { Loggeduser } from "../Contexts";
import { save_to_session } from "../sections/footer";
import Login from "./login";
import Modal from "./modal";
import Preview_image from "./preview_image";
import Product_subscribers from "./product_subscribers";

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  save_to_wishlist = async (loggeduser) => {
    if (!loggeduser) return this.login?.toggle();

    let { product } = this.props;

    await post_request("add_to_wishlist", {
      product: product._id,
      user: loggeduser._id,
    });
    return;
  };

  toggle_product_subscribers = () => this.product_subscribers?.toggle();

  handle_product = () => save_to_session("product", this.props.product);

  render() {
    let { class_name, product, in_vendor, edit } = this.props;

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
                  {edit ? (
                    <div
                      className="prt_saveed_12lk pr-3"
                      onClick={() => edit()}
                    >
                      <label className="toggler toggler-danger">
                        <input type="checkbox" />
                        <i className="fas fa-edit"></i>
                      </label>
                    </div>
                  ) : null}

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

                    {in_vendor ? (
                      <div className="prd_button mt-2">
                        <a
                          href="#"
                          onClick={this.toggle_product_subscribers}
                          className="bth bth_prd"
                        >
                          Subscribers
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <Modal
                ref={(product_subscribers) =>
                  (this.product_subscribers = product_subscribers)
                }
              >
                <Product_subscribers
                  product={product}
                  toggle={this.toggle_product_subscribers}
                />
              </Modal>

              <Modal ref={(login) => (this.login = login)}>
                <Login no_redirect action={this.save_to_wishlist} />
              </Modal>
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Product;
