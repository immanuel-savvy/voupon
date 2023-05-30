import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import { post_request } from "../assets/js/utils/services";
import { Loggeduser } from "../Contexts";
import Installment_summary from "./installment_summary";
import Login from "./login";
import Make_payment from "./make_payment";
import Modal from "./modal";
import Modal_form_title from "./modal_form_title";
import Product_alt from "./product_alt";

class Installment_application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subscribed: "loading",
    };
  }

  check_product_subscription = async (loggeduser) => {
    if (!this.loggeduser) this.loggeduser = loggeduser;

    let { product, installment } = this.props;

    let subscribed = await post_request("product_subscription", {
      user: this.loggeduser._id,
      product: product._id,
      installment,
    });

    this.setState({ subscribed });
  };

  componentDidMount = async () => {
    this.loggeduser && this.check_product_subscription();
  };

  proceed = () => this.make_payment && this.make_payment?.toggle();

  on_payment = (subscribed) => this.setState({ subscribed });

  get_verified = () =>
    window.location.assign(
      `${client_domain}/get_verified/${this.loggeduser?._id}`
    );

  toggle_login = () => this.login?.toggle();

  render() {
    let { part_payment, subscribed } = this.state;
    let { toggle, product, installment } = this.props;
    let { vendor, down_payment } = product;

    let number_of_payments = product[`number_of_${installment}_payments`];

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          if (!loggeduser)
            return (
              <Login no_redirect action={this.check_product_subscription} />
            );

          this.loggeduser = loggeduser;

          return (
            <section style={{ paddingTop: 20, paddingBottom: 20 }}>
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <Modal_form_title
                      title="Apply for Installment Payment"
                      toggle={toggle}
                    />
                    <form>
                      <div className="crs_log_wrap pt-3">
                        <Product_alt product={product} />

                        <h5 className="text-center">{installment} Payment</h5>
                        <Installment_summary
                          installment={installment}
                          on_part_payment={(part_payment) =>
                            this.setState({ part_payment })
                          }
                          product={product}
                          subscribed={subscribed}
                          proceed={
                            loggeduser && Number(loggeduser.kyc_verified)
                              ? this.proceed
                              : null
                          }
                          what_to_do_next={
                            <>
                              {loggeduser &&
                              !Number(loggeduser.kyc_verified) ? (
                                <p className="alert alert-info">
                                  Only applicable to verified users
                                </p>
                              ) : null}
                              <button
                                onClick={
                                  !loggeduser
                                    ? this.toggle_login
                                    : loggeduser &&
                                      !Number(loggeduser.kyc_verified)
                                    ? this.get_verified
                                    : null
                                }
                                type="button"
                                class="btn checkout_btn theme-bg text-light"
                              >
                                {!loggeduser
                                  ? "Login to Proceed"
                                  : loggeduser &&
                                    !Number(loggeduser.kyc_verified)
                                  ? "Get Verified"
                                  : null}
                              </button>
                            </>
                          }
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <Modal ref={(login) => (this.login = login)}>
                <Login no_redirect action={this.toggle_login} />
              </Modal>

              <Modal ref={(make_payment) => (this.make_payment = make_payment)}>
                <Make_payment
                  on_payment={this.on_payment}
                  details={{
                    to: vendor._id,
                    total: product.value,
                    part_payments: part_payment,
                    installment,
                    number_of_payments,
                    email: loggeduser.email,
                    user: loggeduser._id,
                    type: "pay_small_small",
                    title: "Installmental Payment Initiation",
                    data: product,
                    value: Number(down_payment) || 50,
                  }}
                  toggle={this.proceed}
                />
              </Modal>
            </section>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Installment_application;
