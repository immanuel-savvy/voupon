import React from "react";
import { commalise_figures } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import { Loggeduser } from "../Contexts";
import Login from "./login";
import Modal from "./modal";
import Preview_image from "./preview_image";

class Product_sidebar extends React.Component {
  constructor(props) {
    super(props);

    let { images } = this.props.product;
    this.state = { images, active_image: images[0] };
  }

  set_image = (active_image) => this.setState({ active_image });

  save_to_wishlist = async (loggeduser) => {
    if (!loggeduser) return this.login?.toggle();

    let { product } = this.props;
    this.setState({ wished: true });

    await post_request("add_to_wishlist", {
      product: product._id,
      user: loggeduser._id,
    });
    return;
  };

  render() {
    let { active_image, wished } = this.state;
    let { product } = this.props;
    let {
      short_description,
      category,
      video,
      title,
      value,
      quantities,
      total_subscribers,
      images,
    } = product;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          return (
            <div class="woocommerce single_product quick_view_wrap">
              <div class="woo-single-images">
                <div class="feature-style-single">
                  <Preview_image
                    image={active_image.url}
                    image_hash={active_image.image_hash}
                  />
                </div>

                <div class="my-3">
                  {video ? (
                    <span class="bb-video-box">
                      <span
                        class="bb-video-box-inner"
                        style={{
                          display: "inline",
                          backgroundColor: "#eee",
                          padding: 15,
                          marginRight: 15,
                          cursor: "pointer",
                        }}
                      >
                        <span class="bb-video-box-innerup">
                          <a
                            href="https://www.youtube.com/watch?v=A8EI6JaFbv4"
                            data-toggle="modal"
                            data-target="#popup-video"
                            class="theme-cl"
                          >
                            <i
                              style={{ fontSize: 20 }}
                              class="ti-control-play"
                            ></i>
                          </a>
                        </span>
                      </span>
                    </span>
                  ) : null}
                  {images.map((image, index) => {
                    return (
                      <span key={index} class="thumb mr-3">
                        <Preview_image
                          image={image.url}
                          height={70}
                          style={{ borderRadius: 10, cursor: "pointer" }}
                          action={() => this.set_image(image)}
                          class_name="pro_img img-fluid img-rounded w100"
                        />
                      </span>
                    );
                  })}
                </div>
              </div>

              <div class="summary entry-summary">
                <div class="woo_inner">
                  {/* <div class="shop_status sell">New</div> */}
                  <h2 class="woo_product_title">
                    <a href="#">{title}</a>
                  </h2>
                  <ul class="woo_info my-2">
                    <li>
                      <strong>Category:</strong>&nbsp;{category}
                    </li>
                    <li>{/* <strong>SKU:</strong>#CDP0147 */}</li>
                  </ul>
                  <div class="woo_price_rate">
                    {/*
        <div class="woo_rating">
          <i class="fas fa-star filled"></i>
          <i class="fas fa-star filled"></i>
          <i class="fas fa-star filled"></i>
          <i class="fas fa-star filled"></i>
          <i class="fas fa-star"></i>
        </div> */}
                    <div class="woo_price_fix">
                      <h3 class="mb-0 theme-cl">
                        &#8358;{commalise_figures(value)}
                      </h3>
                    </div>
                  </div>
                  <div class="woo_short_desc">
                    <p>{short_description}</p>
                  </div>
                  <div class="quantity-button-wrapper">
                    <label style={{ fontWeight: "normal" }}>
                      Initial Quantity: <strong>{quantities}</strong>
                    </label>
                  </div>
                  <div class="quantity-button-wrapper">
                    <label style={{ fontWeight: "normal" }}>
                      Quantity Remaining:{" "}
                      <strong>{quantities - (total_subscribers || 0)}</strong>
                    </label>
                  </div>

                  <div class="woo_buttons">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        this.save_to_wishlist(loggeduser);
                      }}
                      href="#"
                      class="btn woo_btn_light"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Add To Wishlist"
                      style={{ color: wished ? "#198754" : null }}
                    >
                      <i class="ti-heart"></i>
                    </a>
                  </div>
                </div>
              </div>

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

export default Product_sidebar;
