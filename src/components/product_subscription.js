import React from "react";
import { commalise_figures, to_title } from "../assets/js/utils/functions";

class Product_subscription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render = () => {
    let { subscription: subscription_ } = this.props;

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
      <div>
        <ul class="cart_list">
          <li>
            User Names<strong>{`${firstname} ${lastname}`}</strong>
          </li>

          <li>
            User Email <strong>{email}</strong>
          </li>

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
