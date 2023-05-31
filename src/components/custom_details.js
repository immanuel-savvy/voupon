import React from "react";
import { commalise_figures, to_title } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import { installments as installments_ } from "../pages/Add_product_et_service";
import Installment_application from "./installment_aplication";
import Modal from "./modal";
import Product_subscription from "./product_subscription";
import Small_btn from "./small_btn";

class Custom_details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { loggeduser, product } = this.props;

    if (loggeduser) {
      let subscriptions = await post_request("user_product_subscriptions", {
        user: loggeduser._id,
        product: product._id,
      });
      this.setState({ subscriptions });
    }
  };

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

    let fracs = total / days;

    return fracs.toFixed(2);
  };

  toggle_apply = (i) => {
    if (this.apply?.state.show) {
      this.setState({ installment: null }, this.apply.toggle);
    } else {
      this.setState({ installment: i }, this.apply.toggle);
    }

    this.setState({ installment: i });
  };

  toggle_subscription = (subscription) => {
    subscription && this.setState({ subscription });
    this.sub?.toggle();
  };

  render() {
    let { installment, subscriptions, subscription } = this.state;
    let { product } = this.props;
    let { installments, down_payment } = product;
    down_payment = down_payment || 0;

    return (
      <div className="edu_wraper">
        <h4 className="edu_title">Installment Details</h4>
        <div className="table-responsive">
          <table className="table">
            <tbody>
              <tr>
                <th scope="row">
                  <b>Intervals</b>
                </th>
                <td>
                  <b>Down Payment</b>
                </td>
                <td>
                  <b>Payments unit</b>
                </td>
                <td>
                  <b>Number of Payments</b>
                </td>
                <td>
                  <b>Total</b>
                </td>
                <td></td>
              </tr>

              {installments.map((i, index) => {
                return (
                  <tr key={index}>
                    <td scope="row">{to_title(i)}</td>
                    <td>&#8358; {down_payment}</td>
                    <td>
                      &#8358;{" "}
                      {commalise_figures(
                        this.calc_payments(
                          product[`${i}_product_price`] - down_payment,
                          product[`number_of_${i}_payments`],
                          i
                        )
                      )}
                    </td>

                    <td>{product[`number_of_${i}_payments`]}</td>
                    <td>
                      &#8358; {commalise_figures(product[`${i}_product_price`])}
                    </td>
                    <td>
                      <Small_btn
                        disabled={!product[`${i}_plan_code`]}
                        title={
                          subscriptions && subscriptions[i]
                            ? "View Subscription"
                            : "Apply"
                        }
                        action={() =>
                          subscriptions && subscriptions[i]
                            ? this.toggle_subscription(subscriptions[i])
                            : this.toggle_apply(i)
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Modal ref={(sub) => (this.sub = sub)}>
            <Product_subscription
              subscription={subscription}
              user_subscriptions
              toggle={() => this.toggle_subscription()}
            />
          </Modal>

          <Modal ref={(apply) => (this.apply = apply)}>
            <Installment_application
              product={product}
              installment={installment}
              toggle={this.toggle_apply}
            />
          </Modal>
        </div>
      </div>
    );
  }
}

export default Custom_details;
