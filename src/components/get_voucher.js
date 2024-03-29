import React from "react";
import { Loggeduser } from "../Contexts";
import Stretch_button from "./stretch_button";
import Text_input from "./text_input";
import Voucher from "./voucher";
import { PaystackConsumer } from "react-paystack";
import { email_regex } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import Login from "./login";
import Voucher_purchase_details from "./voucher_purchase_details";
import { PAYMENT_LIVE } from "../assets/js/utils/constants";
import Coupon from "./coupon";
import Modal from "./modal";
import Apply_coupon from "./apply_coupon";

const Paystack_public_key = PAYMENT_LIVE
  ? "pk_live_6cd13fb4fd5c17c366bbd44862d639aea71e5670"
  : "pk_test_88c19524a2abc3ad156a72952316e0f77ca87f4e";
const Paystack_private_key = PAYMENT_LIVE
  ? "sk_live_195a61d2e959c741a42ca1b9eafeb35d53b4e169"
  : "sk_test_8f53d8f0d9303a18a856d4aeba97603d0795fdcb";

class Get_voucher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
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
    let { voucher, on_purchase } = this.props;
    let { email, firstname, coupon, lastname, phone, updating } = this.state;
    if (updating) return;

    this.setState({ updating: true });

    post_request("voucher_purchased", {
      user: this.loggeduser?._id,
      email,
      firstname,
      voucher: voucher._id,
      lastname,
      phone,
      coupon: coupon?._id,
      vendor: voucher.vendor._id || voucher.vendor,
    })
      .then((res) => {
        res.voucher_code && on_purchase && on_purchase(res.voucher_code);
        this.setState({ updating: false, voucher_code: res.voucher_code });
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
    let { firstname, coupon, lastname, email, updating, voucher_code, phone } =
      this.state;
    let { voucher, vendor, toggle } = this.props;
    let { value } = voucher;

    let payment_props = {
      email,
      metadata: { firstname, lastname, phone },
      publicKey: Paystack_public_key,
      amount: this.calculate_coupon(value) * 100,
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
                      <div className="rcs_log_124">
                        <div className="Lpo09">
                          <h4>Get Offer Voucher</h4>
                        </div>
                      </div>

                      <div
                        className="col-xl-12 col-lg-12 col-md-12 col-sm-12"
                        style={{ width: "100%" }}
                      >
                        <Voucher full no_q voucher={voucher} vendor={vendor} />
                      </div>
                      {voucher_code ? (
                        <Voucher_purchase_details
                          toggle={toggle}
                          details={{ voucher_code, email, firstname, lastname }}
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
                                  this.calculate_coupon(value) > 0
                                    ? `Proceed to Payment`
                                    : "Proceed"
                                }
                                disabled={!this.is_set()}
                                loading={updating}
                                action={() => {
                                  this.calculate_coupon(value) > 0
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

export default Get_voucher;
export { Paystack_public_key, Paystack_private_key };
