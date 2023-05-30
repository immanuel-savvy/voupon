import React from "react";
import { commalise_figures, to_title } from "../assets/js/utils/functions";
import Alert_box from "./alert_box";
import Loadindicator from "./loadindicator";
import Product_subscription from "./product_subscription";

class Installment_summary extends React.Component {
  constructor(props) {
    super(props);

    let { product, installment } = this.props;
    let { down_payment } = product;
    down_payment = down_payment || 0;

    let { part_payments, number_of_payments } = this.calc_payments(
      product[`${installment}_product_price`] - down_payment,
      product[`number_of_${installment}_payments`],
      installment
    );

    this.state = {
      part_payments,
      number_of_payments,
    };
  }

  calc_payments = (total, days, i) => {
    let { on_part_payment } = this.props;

    total = Number(total);
    days = Number(days);

    if (!total) return "";

    days = Number(days);

    let part_payments = total / days;

    on_part_payment && on_part_payment(part_payments);

    return {
      number_of_payments: days,
      part_payments,
    };
  };

  render = () => {
    let { part_payments, number_of_payments } = this.state;
    let { product, installment, proceed, what_to_do_next, subscribed } =
      this.props;
    let { value, down_payment } = product;
    down_payment = down_payment || 0;

    return (
      <div class="col-12">
        <div class="cart_totals checkout">
          <h4>Summary</h4>
          <div class="cart-wrap">
            <ul class="cart_list">
              <li>
                Actual Price<strong>&#8358; {commalise_figures(value)}</strong>
              </li>
              <li>
                Down Payment
                <strong>&#8358; {commalise_figures(down_payment)}</strong>
              </li>
              <li>
                Payments
                <strong> &#8358; {commalise_figures(part_payments)}</strong>
              </li>
              <li>
                Number of Payments<strong>{number_of_payments}</strong>
              </li>
              <li>
                Interval<strong>{to_title(installment)}</strong>
              </li>
            </ul>
            <div class="flex_cart">
              <div class="flex_cart_1">Total Cost</div>
              <div class="flex_cart_2">&#8358; {commalise_figures(value)}</div>
            </div>
            {subscribed === "loading" ? (
              <Loadindicator />
            ) : subscribed?._id ? (
              <>
                <Alert_box type="info" message="Subscription is running..." />

                <Product_subscription subscription={subscribed} />
              </>
            ) : proceed ? (
              <button
                type="button"
                onClick={proceed}
                class="btn theme-bg text-light checkout_btn"
              >
                Proceed To Apply
              </button>
            ) : (
              what_to_do_next || null
            )}
          </div>
        </div>
      </div>
    );
  };
}

export default Installment_summary;
