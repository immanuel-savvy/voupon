import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import { commalise_figures, to_title } from "../assets/js/utils/functions";
import { save_to_session } from "../sections/footer";

class Product_subscription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handle_product = () => {
    let { product } = this.props.subscription.subscription;

    save_to_session("product", product);
    window.location.assign(`${client_domain}/product?${product._id}`);
  };

  handle_vendor = () => {
    let { vendor } = this.props.subscription.subscription.product;

    save_to_session("vendor", vendor);
    window.location.assign(`${client_domain}/vendor?${vendor.uri}`);
  };

  render = () => {
    let { subscription: subscription_, user_subscriptions } = this.props;

    let { subscription } = subscription_;
    let {
      installment,
      user,
      total,
      number_of_payments,
      part_payments,
      total_payments_made,
      product,
    } = subscription;
    let { firstname, lastname, email } = user;

    return (
      <div
        className="ed_view_box"
        style={{
          borderBottom: "1px solid #ccc",
          boxShadow: "5px 5px 5px #ccc",
        }}
      >
        <ul className="cart_list">
          {user_subscriptions ? (
            <>
              <li>
                Product
                <strong
                  className="cursor-pointer"
                  onClick={this.handle_product}
                >
                  {to_title(product.title)}
                </strong>
              </li>

              <li>
                Vendor{" "}
                <strong className="cursor-pointer" onClick={this.handle_vendor}>
                  {to_title(product.vendor.name)}
                </strong>
              </li>
            </>
          ) : (
            <>
              <li>
                User Name<strong>{to_title(`${firstname} ${lastname}`)}</strong>
              </li>

              <li>
                User Email <strong>{email}</strong>
              </li>
            </>
          )}

          <li>
            Type<strong>{installment}</strong>
          </li>
          <li>
            Subsequent Payments
            <strong>&#8358; {commalise_figures(part_payments)}</strong>
          </li>
          <li>
            Total
            <strong> &#8358; {commalise_figures(total)}</strong>
          </li>
          <li>
            Number of Payments
            <strong>
              {number_of_payments ||
                product[`number_of_${installment}_payments`]}
            </strong>
          </li>
          <li>
            Total Payments Made<strong>{total_payments_made || 0}</strong>
          </li>
        </ul>
      </div>
    );
  };
}

export default Product_subscription;
