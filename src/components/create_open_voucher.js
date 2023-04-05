import React from "react";
import { PaystackConsumer } from "react-paystack";
import { email_regex } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import { Loggeduser } from "../Contexts";
import { rewards } from "../sections/footer";
import Alert_box from "./alert_box";
import Form_divider from "./form_divider";
import { Paystack_public_key } from "./get_voucher";
import Icon_btn from "./icon_btn";
import Login from "./login";
import Modal_form_title from "./modal_form_title";
import Stretch_button from "./stretch_button";
import Text_input from "./text_input";
import Voucher_purchase_details from "./voucher_purchase_details";

class Create_open_voucher extends React.Component {
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
    let { firstname, updating, lastname, email, phone, value, title } =
      this.state;

    return (
      firstname &&
      lastname &&
      email_regex.test(email) &&
      phone &&
      Number(value) > 0 &&
      title &&
      !updating
    );
  };

  set_details = ({ firstname, lastname, email }) =>
    this.setState({ firstname, lastname, email });

  payment_successful = () => {
    let { on_create } = this.props;
    let { title, value, firstname, lastname, email, phone, updating } =
      this.state;

    if (updating) return;

    this.setState({ updating: true });

    let voucher = {
      title,
      value: Number(value),
      firstname,
      lastname,
      email,
      phone,
      user: this.loggeduser._id,
    };

    post_request("create_open_voucher", voucher)
      .then((res) => {
        this.setState(
          { updating: false, voucher_code: res.voucher_code },
          () => on_create && on_create(res)
        );
      })
      .catch((e) => console.log(e));
  };

  cancel = () => {};

  render() {
    let { toggle } = this.props;
    let {
      title,
      value,
      voucher_code,
      firstname,
      updating,
      lastname,
      email,
      phone,
    } = this.state;

    let tx_fee = this.loggeduser?.premium
      ? rewards.create_voucher / 2
      : rewards.create_voucher;

    let payment_props = {
      email,
      metadata: { firstname, lastname, phone },
      publicKey: Paystack_public_key,
      amount: (Number(value) + tx_fee) * 100,
      onSuccess: this.payment_successful,
      onClose: this.cancel,
    };

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          if (!loggeduser)
            return (
              <Login toggle={toggle} action={this.set_details} no_redirect />
            );

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

                        <Modal_form_title
                          title="open voucher"
                          toggle={toggle}
                        />
                        {voucher_code ? (
                          <Voucher_purchase_details
                            toggle={toggle}
                            details={{
                              voucher_code,
                              email,
                              firstname,
                              lastname,
                            }}
                          />
                        ) : (
                          <>
                            <Text_input
                              value={title}
                              title="voucher title"
                              action={(title) =>
                                this.setState({
                                  title,
                                  message: "",
                                })
                              }
                              important
                            />

                            <Text_input
                              value={value}
                              title={`Value ${"(Naira)"}`}
                              action={(value) =>
                                this.setState({
                                  value,
                                  message: "",
                                })
                              }
                              type="number"
                              important
                            />

                            <Form_divider text="Owner Details" />
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

                            <Alert_box
                              type="info"
                              message={`Transaction Fee: N${tx_fee}`}
                            />

                            <PaystackConsumer {...payment_props}>
                              {({ initializePayment }) => (
                                <Stretch_button
                                  title={`Top-up Voucher`}
                                  loading={updating}
                                  disabled={!this.is_set()}
                                  action={() => {
                                    initializePayment(
                                      this.payment_successful,
                                      this.cancel
                                    );
                                  }}
                                />
                              )}
                            </PaystackConsumer>
                          </>
                        )}
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
    return;
  }
}

export default Create_open_voucher;
