import React from "react";
import { commalise_figures, to_title } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import Alert_box from "./alert_box";
import Modal_form_title from "./modal_form_title";
import Product_alt from "./product_alt";
import Stretch_button from "./stretch_button";
import Wallet from "./wallet";

class Make_payment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  on_wallet = (wallet) => this.setState({ wallet });

  make_payment = async () => {
    let { details, on_payment, toggle } = this.props;
    let {
      user,
      to,
      value,
      number_of_payments,
      title,
      installment,
      total,
      part_payments,
      data,
    } = details;

    this.setState({ loading: true });

    let res = await post_request("subscribe_to_product" || "make_payment", {
      value,
      part_payments: Number(part_payments),
      payer: user,
      number_of_payments,
      recipient: to,
      total,
      installment,
      title,
      product: data?._id || data,
    });

    if (res?._id) {
      on_payment && on_payment(res);
      toggle();
    } else {
      this.setState({
        message: res?.message || "Cannot make payment at the moment",
        loading: false,
      });
    }
  };

  render() {
    let { wallet, loading } = this.state;
    let { toggle, details } = this.props;
    let { title, user, value, data } = details;

    return (
      <section style={{ paddingTop: 20, paddingBottom: 20 }}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <Modal_form_title title={title} toggle={toggle} />
              <form>
                <div className="crs_log_wrap pt-3">
                  <Wallet user={user} on_wallet={this.on_wallet} />

                  {wallet ? (
                    wallet.balance < value ? (
                      <Alert_box message="Insufficient wallet balance" />
                    ) : (
                      <>
                        <form>
                          <div className="crs_log_wrap pt-3">
                            <h5 className="text-center">Transaction Details</h5>

                            <Product_alt product={data} />

                            <div class="col-12">
                              <div class="cart_totals checkout">
                                <div class="cart-wrap">
                                  <ul class="cart_list">
                                    <li>
                                      Payments
                                      <strong>
                                        {" "}
                                        &#8358; {commalise_figures(value)}
                                      </strong>
                                    </li>

                                    <li>
                                      Recipient
                                      <strong>
                                        {to_title(data.vendor.name)}
                                      </strong>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              <Stretch_button
                                title="Make Payment"
                                loading={loading}
                                action={this.make_payment}
                              />
                            </div>
                          </div>
                        </form>
                      </>
                    )
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Make_payment;
