import React from "react";
import { Loggeduser } from "../Contexts";
import Stretch_button from "./stretch_button";
import Text_input from "./text_input";
import { PaystackConsumer } from "react-paystack";
import { email_regex } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import Login from "./login";
import Voucher_purchase_details from "./voucher_purchase_details";
import { Paystack_public_key } from "./get_voucher";
import Modal_form_title from "./modal_form_title";
import Modal from "./modal";
import Apply_coupon from "./apply_coupon";
import Coupon from "./coupon";

class Buy_ticket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
    };
  }

  componentDidMount = () => {
    if (this.loggeduser) {
      let { firstname, lastname, email } = this.loggeduser;
      this.setState({ firstname, lastname, email });
    }
  };

  is_set = () => {
    let { email, updating, firstname, lastname, phone } = this.state;
    return (
      !updating && email_regex.test(email) && firstname && lastname && phone
    );
  };

  payment_successful = () => {
    let { event, on_purchase } = this.props;
    let { email, quantity, firstname, lastname, phone, updating, coupon } =
      this.state;
    if (updating) return;

    this.setState({ updating: true });

    post_request("ticket_purchased", {
      user: this.loggeduser?._id,
      email,
      firstname,
      event: event._id,
      lastname,
      coupon: coupon._id,
      phone,
      quantity: Number(quantity),
      vendor: event.vendor._id || event.vendor,
    })
      .then((res) => {
        res.ticket_code && on_purchase && on_purchase(res.ticket_code);
        this.setState({
          updating: false,
          ticket_id: res._id,
          ticket_code: res.ticket_code,
        });
      })
      .catch((e) => console.log(e));
  };

  cancel = () => {};

  set_details = ({ firstname, lastname, email }) =>
    this.setState({ firstname, lastname, email });

  toggle_apply_coupon = () => this.apply_coupon?.toggle();

  coupon = async (coupon, cb) => {
    let res = await post_request("applied_coupon", {
      user: this.loggeduser?._id,
      coupon: coupon.coupon_id,
      verbose: true,
    });

    if (res?.success) {
      cb({ applied: true });
      this.apply_coupon.setState({ show: false }, () =>
        this.setState({ coupon: res.detailed_coupon })
      );
    } else cb({ message: res?.message });
  };

  calculate_coupon = (price) => {
    let { coupon } = this.state;

    if (!coupon) return price;

    price = Number(price);
    let val = price * (coupon.value / 100);

    val = price - val;
    return val < 0 ? 0 : val;
  };

  render() {
    let {
      firstname,
      lastname,
      ticket_id,
      quantity,
      email,
      updating,
      ticket_code,
      phone,
      coupon,
    } = this.state;
    let { event, toggle } = this.props;
    let { value, _id, vendor } = event;

    let payment_props = {
      email,
      metadata: { firstname, lastname, phone },
      publicKey: Paystack_public_key,
      amount: this.calculate_coupon(Number(quantity) * value) * 100,
      onSuccess: this.payment_successful,
      onClose: this.cancel,
    };

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          if (!this.loggeduser)
            return (
              <Login action={this.set_details} no_redirect toggle={toggle} />
            );

          return (
            <section>
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <form>
                      <div className="crs_log_wrap">
                        <div className="crs_log__caption">
                          <div className="rcs_log_123">
                            <div className="rcs_ico">
                              <i className="fas fa-users"></i>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Modal_form_title toggle={toggle} title="Buy Ticket" />

                      {ticket_code ? (
                        <Voucher_purchase_details
                          toggle={toggle}
                          event={event}
                          details={{
                            voucher_code: ticket_code,
                            _id,
                            email,
                            firstname,
                            lastname,
                            quantity,
                            ticket_id,
                          }}
                        />
                      ) : (
                        <>
                          <Text_input
                            value={firstname}
                            title="firstname"
                            action={(firstname) =>
                              this.setState({
                                firstname,
                                message: "",
                              })
                            }
                            important
                          />
                          <Text_input
                            value={lastname}
                            title="lastname"
                            action={(lastname) =>
                              this.setState({
                                lastname,
                                message: "",
                              })
                            }
                            important
                          />

                          <Text_input
                            value={email}
                            title="email"
                            action={(email) =>
                              this.setState({
                                email,
                                message: "",
                              })
                            }
                            important
                          />

                          <Text_input
                            value={phone}
                            title="phone"
                            action={(phone) =>
                              this.setState({
                                phone,
                                message: "",
                              })
                            }
                            important
                          />

                          <Text_input
                            value={quantity}
                            title="quantity"
                            type="number"
                            action={(quantity) =>
                              this.setState({
                                quantity: quantity < 1 ? 1 : quantity,
                                message: "",
                              })
                            }
                            important
                          />

                          {coupon ? (
                            <Coupon coupon={coupon} applied />
                          ) : (
                            <Stretch_button
                              inverted
                              title="Apply Coupon"
                              action={this.toggle_apply_coupon}
                            />
                          )}
                          <PaystackConsumer {...payment_props}>
                            {({ initializePayment }) => (
                              <Stretch_button
                                title={
                                  this.calculate_coupon(
                                    Number(quantity) * value
                                  ) > 0
                                    ? `Proceed to Payment`
                                    : "Proceed"
                                }
                                disabled={!this.is_set()}
                                loading={updating}
                                action={() => {
                                  this.calculate_coupon(
                                    Number(quantity) * value
                                  ) > 0
                                    ? initializePayment(
                                        this.payment_successful,
                                        this.cancel
                                      )
                                    : this.payment_successful();
                                }}
                              />
                            )}
                          </PaystackConsumer>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </div>

              <Modal ref={(apply_coupon) => (this.apply_coupon = apply_coupon)}>
                <Apply_coupon
                  toggle={toggle}
                  user={loggeduser}
                  vendor={vendor}
                  on_coupon={this.coupon}
                />
              </Modal>
            </section>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Buy_ticket;
