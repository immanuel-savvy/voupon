import React from "react";
import { get_request } from "../assets/js/utils/services";
import Custom_details from "../components/custom_details";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Product_description from "../components/product_description";
import Product_reviews from "../components/product_reviews";
import Product_sidebar from "../components/product_sidebar";
import { Loggeduser } from "../Contexts";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer, { get_session } from "../sections/footer";
import Custom_nav from "../sections/nav";

let product_tabs = new Array("description", "installments", "reviews");

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active_tab: product_tabs[0],
    };
  }

  componentDidMount = async () => {
    let product = get_session("product");
    let search = window.location.search?.slice(1);

    if (
      (!search && !product) ||
      (search &&
        !search.startsWith("product" || !search.split("~").length === 3))
    )
      return window.history.go(-1);

    if (!product) product = await get_request(`product/${search}`);

    this.setState({ product });
  };

  render() {
    let { product, active_tab } = this.state;
    let { _id, title } = product || new Object();

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          return (
            <div>
              <Custom_nav page="product" />
              <Padder />

              <Breadcrumb_banner
                title={title || "Product Detail"}
                page="Product Detail"
              />

              {product ? (
                <>
                  <section className="pr_detail">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          <Product_sidebar
                            product={product}
                            loggeduser={loggeduser}
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="pt-0 gray">
                    <div className="container">
                      <div className="col-12 pt-4">
                        <Product_description
                          product={product}
                          loggeduser={loggeduser}
                        />
                        <Custom_details
                          product={product}
                          loggeduser={loggeduser}
                        />
                        <Product_reviews
                          product={product}
                          loggeduser={loggeduser}
                        />

                        {/* <Tabs
                          defaultActiveKey={active_tab}
                          id="uncontrolled-tab-example"
                          // className="mb-3"
                        >
                          {product_tabs.map((tab) => {
                            return (
                              <Tab
                                eventKey={tab}
                                title={to_title(tab.replace(/_/g, " "))}
                                key={tab}
                              >
                                {tab === product_tabs[0] ? (
                                  <Product_description
                                    product={product}
                                    loggeduser={loggeduser}
                                  />
                                ) : tab === product_tabs[1] ? (
                                  <Custom_details
                                    product={product}
                                    loggeduser={loggeduser}
                                  />
                                ) : tab === product_tabs[2] ? (
                                  <Product_reviews
                                    product={product}
                                    loggeduser={loggeduser}
                                  />
                                ) : null}
                              </Tab>
                            );
                          })}
                        </Tabs> */}
                      </div>
                    </div>
                  </section>
                </>
              ) : (
                <Loadindicator />
              )}

              <Footer />
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Product;
