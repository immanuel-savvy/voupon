import React from "react";
import Alert_box from "./alert_box";
import Modal_form_title from "./modal_form_title";
import Stretch_button from "./stretch_button";
import Text_input from "./text_input";
import { PaystackConsumer } from "react-paystack";
import { Paystack_public_key } from "./get_voucher";
import { Loggeduser } from "../Contexts";
import { post_request } from "../assets/js/utils/services";

class Topup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  payment_successful = () => {
    let { wallet, on_topup, toggle } = this.props;
    let { value, updating } = this.state;
    if (updating) return;

    this.setState({ updating: true });

    console.log(value, wallet);
    post_request("topup", {
      value: Number(value),
      wallet: wallet._id,
    })
      .then((res) => {
        console.log(res);
        res.success && on_topup && on_topup(res.value);
        toggle();
      })
      .catch((e) => console.log(e));
  };

  cancel = () => {};

  render() {
    let { toggle } = this.props;
    let { value, message, updating } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          if (!this.loggeduser)
            return (
              <Login action={this.set_details} no_redirect toggle={toggle} />
            );

          let { email, firstname, lastname } = loggeduser;

          let payment_props = {
            email,
            metadata: { firstname, lastname },
            publicKey: Paystack_public_key,
            amount: Number(value) * 100,
            onSuccess: this.payment_successful,
            onClose: this.cancel,
          };

          return (
            <section style={{ paddingTop: 20 }}>
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <form>
                      <div className="crs_log_wrap">
                        <div className="crs_log__thumb">
                          <img
                            src={require(`../assets/img/vouchers1.png`)}
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="crs_log__caption">
                          <div className="rcs_log_123">
                            <div className="rcs_ico">
                              <i className="fas fa-users"></i>
                            </div>
                          </div>
                        </div>

                        <Modal_form_title title="Topup" toggle={toggle} />

                        <Text_input
                          value={value}
                          type="number"
                          title="Value"
                          action={(value) =>
                            this.setState({
                              value,
                              message: "",
                            })
                          }
                          important
                        />

                        {message ? <Alert_box message={message} /> : null}

                        <PaystackConsumer {...payment_props}>
                          {({ initializePayment }) => (
                            <Stretch_button
                              title="Proceed"
                              disabled={!/[0-9]{1,}/.test(value)}
                              loading={updating}
                              action={() => {
                                initializePayment(
                                  this.payment_successful,
                                  this.cancel
                                );
                              }}
                            />
                          )}
                        </PaystackConsumer>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Topup;
