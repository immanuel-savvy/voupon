import React from "react";
import { post_request } from "../assets/js/utils/services";
import Explore_more from "../components/explore_more";
import Loadindicator from "../components/loadindicator";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Product from "../components/product";

class Enjoy_now_pay_later extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let products = await post_request("products", {
      limit: 12,
      shuffle: true,
    });

    this.setState({ products });
  };

  render() {
    let { products } = this.state;
    if (products && !products.length) return;

    return (
      <section className="">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-7 col-md-8">
              <div class="sec-heading center">
                <h2>
                  enjoy Now, <span class="theme-cl">Pay Later</span>
                </h2>
                <p>
                  Explore, manage subscription and trade product listings with
                  best price and plan
                </p>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            {products ? (
              <Swiper
                modules={[Autoplay, Pagination]}
                pagination={{ clickable: true }}
                slidesPerView={window.innerWidth < 650 ? 1 : 3}
                autoplay={{
                  delay: 2000,
                  pauseOnMouseEnter: true,
                  disableOnInteraction: false,
                }}
                loop
                className="swiper-container"
              >
                {products.map((product) => (
                  <SwiperSlide key={product._id}>
                    <Product product={product} class_name="col-11" />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Loadindicator />
            )}
          </div>

          {products && products.length ? <Explore_more to="products" /> : null}
        </div>
      </section>
    );
  }
}

export default Enjoy_now_pay_later;
