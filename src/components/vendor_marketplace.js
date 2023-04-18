import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import { post_request } from "../assets/js/utils/services";
import { save_to_session } from "../sections/footer";
import Listempty from "./listempty";
import Loadindicator from "./loadindicator";
import Product from "./product";
import Section_header from "./section_headers";
import User_voucher_header from "./user_voucher_header";

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

  render() {
    let { vendor, loggeduser } = this.props;
    let { products_et_services } = this.state;

    return (
      <div className="container">
        <Section_header
          title="marketplace"
          // color_title="vouchers"
          description="Eu eu minim magna esse."
        />

        {vendor._id === loggeduser?.vendor ? (
          <User_voucher_header
            // voucher_filters={this.voucher_states}
            // set_voucher_filter={(filter) => this.setState({ filter })}
            voucher_type={"Products and Services"}
            side_buttons={
              new Array(
                {
                  title: "add product / service",
                  action: () => {
                    window.location.assign(
                      `${client_domain}/new_product_et_service`
                    );
                    save_to_session("vendor", vendor);
                  },
                }
                // { title: "use voucher", action: this.toggle_use_voucher }
              )
            }
          />
        ) : null}

        {products_et_services ? (
          products_et_services.length ? (
            products_et_services.map((p) => (
              <Product product={p.product} key={p._id} />
            ))
          ) : (
            <Listempty />
          )
        ) : (
          <Loadindicator />
        )}
      </div>
    );
  }
}

export default Vendor_marketplace;