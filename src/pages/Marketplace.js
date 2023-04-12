import React from "react";
import { post_request } from "../assets/js/utils/services";
import Listempty from "../components/listempty";
import Loadindicator from "../components/loadindicator";
import Market_sidebar from "../components/market_sidebar";
import Padder from "../components/padder";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Custom_nav from "../sections/nav";
import Product from "./../components/product";

class Marketplace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 30,
      page: 1,
    };
  }

  componentDidMount = async () => {
    let { limit, page } = this.state;

    let products = await post_request("products", {
      limit,
      skip: limit * (page - 1),
    });

    this.setState({ products });
  };

  render() {
    let { products } = this.state;

    return (
      <div>
        <Custom_nav page="marketplace" />
        <Padder />
        <Breadcrumb_banner
          page="marketplace"
          bg={require("../assets/img/coupons1.jpg")}
        />

        <section className="gray">
          <div className="container">
            <div className="row">
              <Market_sidebar />

              <div class="col-xl-8 col-lg-8 col-md-12 order-lg-1">
                <div class="row">
                  {products ? (
                    products.length ? (
                      products.map((product) => (
                        <Product
                          class_name="col-xl-4 col-lg-6 col-md-6 col-sm-12"
                          product={product}
                          key={product._id}
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
        </section>

        <Footer />
      </div>
    );
  }
}

export default Marketplace;
