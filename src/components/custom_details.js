import React from "react";
import { commalise_figures, to_title } from "../assets/js/utils/functions";
import { installments as installments_ } from "../pages/Add_product_et_service";
import Small_btn from "./small_btn";

class Custom_details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  i_days = new Object({
    [installments_[0]]: 1,
    [installments_[1]]: 7,
    [installments_[2]]: 30,
    [installments_[3]]: 90,
    [installments_[4]]: 365,
  });

  calc_payments = (total, days, i) => {
    total = Number(total);
    if (!total) return "";

    days = Number(days);

    if (days < this.i_days[i]) return total;

    let fracs = total / days;

    return (this.i_days[i] * fracs).toFixed(2);
  };

  render() {
    let { product } = this.props;
    let { installments, value, down_payment, payment_duration } = product;
    down_payment = down_payment || 0;

    return (
      <div class="table-responsive">
        <table class="table">
          <tbody>
            <tr>
              <th scope="row">Intervals</th>
              <td>Payments</td>
              <td></td>
            </tr>

            {installments.map((i, index) => {
              return (
                <tr key={index}>
                  <td scope="row">{to_title(i)}</td>
                  <td>
                    &#8358;{" "}
                    {commalise_figures(
                      this.calc_payments(
                        value - down_payment,
                        payment_duration,
                        i
                      )
                    )}
                  </td>
                  <td>
                    <Small_btn title="Apply" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Custom_details;
