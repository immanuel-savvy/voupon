import React from "react";
import { commalise_figures, to_title } from "../assets/js/utils/functions";
import { installments as installments_ } from "../pages/Add_product_et_service";
import Alert_box from "./alert_box";
import Loadindicator from "./loadindicator";
import Product_subscription from "./product_subscription";

class Installment_summary extends React.Component {
  constructor(props) {
    super(props);

    let { product, installment } = this.props;
    let { payment_duration, value, down_payment } = product;
    down_payment = down_payment || 0;

    let { part_payments, number_of_payments } = this.calc_payments(
      value - down_payment,
      payment_duration,
      installment
    );

    this.state = {
      part_payments,
      number_of_payments,
    };
  }

  i_days = new Object({
    [installments_[0]]: 1,
    [installments_[1]]: 7,
    [installments_[2]]: 30,
    [installments_[3]]: 90,
    [installments_[4]]: 365,
  });

  calc_payments = (total, days, i) => {
    let { on_part_payment } = this.props;

    total = Number(total);
    days = Number(days);

    if (!total) return "";

    days = Number(days);

    if (days < this.i_days[i]) return total;

    let fracs = total / days;
    let part_payments = (this.i_days[i] * fracs).toFixed(2);

    on_part_payment && on_part_payment(part_payments);

    return {
      number_of_payments: parseInt(total / part_payments),
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
