import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import { post_request } from "../assets/js/utils/services";
import { save_to_session } from "../sections/footer";
import { emitter } from "../Voupon";
import Listempty from "./listempty";
import Loadindicator from "./loadindicator";
import Modal from "./modal";
import Product from "./product";
import Section_header from "./section_headers";
import User_voucher_header from "./user_voucher_header";
import Vendor_subscribers from "./vendor_subscribers";

class Vendor_marketplace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 25,
      page: 1,
    };
  }

  componentDidMount = async () => {
    let { limit, page } = this.state;
    let { vendor } = this.props;

    let products_et_services = await post_request(
      `vendor_products_et_service/${vendor._id}`,
      { limit, skip: limit * (page - 1) }
    );

    this.setState({ products_et_services });
  };

  edit_product = (product, vendor) => {
    emitter.emit("edit_product", { product, vendor });
  };

  remove = async (product) => {
    if (!window.confirm("Are you sure to remove product?")) return;

    let { products_et_services } = this.state;
    products_et_services = products_et_services.filter((p) => {
      if (p.product._id !== product._id) return true;
    });

    this.setState({ products_et_services });

    await post_request("close_product", {
      product: product?._id,
      vendor: product.vendor?._id,
    });
  };

  toggle_vendor_subscribers = () => this.vendor_subscribers?.toggle();

  render() {
    let { vendor, loggeduser } = this.props;
    let { products_et_services } = this.state;

    return (
      <div className="container">
        <Section_header
          title="Enjoy now, Pay later"
          description="Subscribe, deal, sell, buy and transact products and offerings with desirable payment plan."
        />

        {vendor._id === loggeduser?.vendor ? (
          <User_voucher_header
            voucher_type={"Products and Services"}
            side_buttons={
              vendor.suspended
                ? null
                : new Array(
                    {
                      title: "add product / service",
                      action: () => {
                        window.location.assign(
                          `${client_domain}/new_product_et_service`
                        );
                        save_to_session("vendor", vendor);
                      },
                    },
                    {
                      title: "product subscribers",
                      action: this.toggle_vendor_subscribers,
                    }
                  )
            }
          />
        ) : null}

        <div className="row justify-content-center">
          {products_et_services ? (
            products_et_services.length ? (
              products_et_services.map((p) => (
                <Product
                  remove={() => this.remove(p.product)}
                  edit={() => this.edit_product(p.product, vendor)}
                  product={p.product}
                  in_vendor={p.product?.vendor?._id === loggeduser?.vendor}
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

        <Modal
          ref={(vendor_subscribers) =>
            (this.vendor_subscribers = vendor_subscribers)
          }
        >
          <Vendor_subscribers
            vendor={vendor}
            toggle={this.toggle_vendor_subscribers}
          />
        </Modal>
      </div>
    );
  }
}

export default Vendor_marketplace;
