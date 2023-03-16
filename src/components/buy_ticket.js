import React from "react";
import { Loggeduser } from "../Contexts";
import Stretch_button from "./stretch_button";
import Text_input from "./text_input";
import Voucher from "./event";
import { PaystackConsumer } from "react-paystack";
import { email_regex } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import Login from "./login";
import Voucher_purchase_details from "./voucher_purchase_details";
import { Paystack_public_key } from "./get_voucher";

class Buy_ticket extends React.Component {
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
    let { event, on_purchase } = this.props;
    let { email, firstname, lastname, phone, updating } = this.state;
    if (updating) return;

    this.setState({ updating: true });

    post_request("ticket_purchased", {
      user: this.loggeduser?._id,
      email,
      firstname,
      event: event._id,
      lastname,
      phone,
      vendor: event.vendor._id || event.vendor,
    })
      .then((res) => {
        res.ticket_code && on_purchase && on_purchase(res.ticket_code);
        this.setState({ updating: false, ticket_code: res.ticket_code });
      })
      .catch((e) => console.log(e));
  };

  cancel = () => {};

  set_details = ({ firstname, lastname, email }) =>
    this.setState({ firstname, lastname, email });

  render() {
    let { firstname, lastname, email, updating, ticket_code, phone } =
      this.state;
    let { event, toggle } = this.props;
    let { value, _id } = event;

    let payment_props = {
      email,
      metadata: { firstname, lastname, phone },
      publicKey: Paystack_public_key,
      amount: value * 100,
      onSuccess: this.payment_successful,
      onClose: this.cancel,
    };

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          if (!this.loggeduser)
            return (
              <Login action={this.set_details} no_redirect toggle={() => {}} />
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
                          <h4>Buy Ticket</h4>
                        </div>
                      </div>

                      {ticket_code ? (
                        <Voucher_purchase_details
                          toggle={toggle}
                          details={{
                            voucher_code: ticket_code,
                            _id,
                            email,
                            firstname,
                            lastname,
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

                          <PaystackConsumer {...payment_props}>
                            {({ initializePayment }) => (
                              <Stretch_button
                                title={`Proceed to Payment`}
                                disabled={!this.is_set()}
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
                        </>
                      )}
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

export default Buy_ticket;
