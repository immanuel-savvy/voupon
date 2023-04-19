import React from "react";
import { client_domain } from "../assets/js/utils/constants";
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

    this.state = {};
  }

  proceed = () => {};

  get_verified = () => {
    window.location.assign(
      `${client_domain}/get_verified/${this.loggeduser?._id}`
    );
  };

  toggle_login = () => this.login?.toggle();

  render() {
    let { part_payment } = this.state;
    let { toggle, product, installment } = this.props;
    let { vendor, down_payment } = product;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
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
                          proceed={
                            loggeduser && loggeduser.kyc_verified
                              ? this.proceed
                              : null
                          }
                          what_to_do_next={
                            <>
                              {loggeduser && !loggeduser.kyc_verified ? (
                                <p className="alert alert-info">
                                  Only applicable to verified users
                                </p>
                              ) : null}
                              <button
                                onClick={
                                  !loggeduser
                                    ? this.toggle_login
                                    : loggeduser && !loggeduser.kyc_verified
                                    ? this.get_verified
                                    : null
                                }
                                type="button"
                                class="btn checkout_btn theme-bg text-light"
                              >
                                {!loggeduser
                                  ? "Login to Proceed"
                                  : loggeduser && !loggeduser.kyc_verified
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
                  details={{
                    to: vendor._id,
                    user: loggeduser._id,
                    value: down_payment + (part_payment || 0),
                  }}
                  toggle={this.toggle_make_payment}
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
