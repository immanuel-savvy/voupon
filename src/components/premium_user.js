import React from "react";
import { Loggeduser } from "../Contexts";
import { PaystackConsumer } from "react-paystack";
import { Paystack_public_key } from "./get_voucher";
import Login from "./login";
import Stretch_button from "./stretch_button";
import { post_request } from "../assets/js/utils/services";
import Alert_box from "./alert_box";

class Premium_user extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  subscribe = async () => {
    let { toggle } = this.props;
    let { _id } = this.loggeduser;

    let result = await post_request(`premium_user_subscription/${_id}`);
    if (result && result.date) {
      this.loggeduser.premium = result.date;
      this.set_loggeduser(this.loggeduser);
      toggle && toggle();
    } else {
      this.setState({
        message:
          "Your subscription couldn't be completed at this time, Please ensure to contact our customer support at voucherafrica@digitaladplanet.com",
      });
    }
  };

  cancle = () => {};

  render() {
    let { message } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          if (!loggeduser) return <Login no_redirect />;

          let { email, firstname, lastname } = loggeduser;
          loggeduser = this.loggeduser;

          let payment_props = {
            email,
            metadata: { firstname, lastname },
            publicKey: Paystack_public_key,
            amount: 700 * 20 * 100,
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

                        <div className="rcs_log_124">
                          <div className="Lpo09">
                            <h4>Premium User</h4>
                          </div>

                          <div className="mb-5">
                            <p className="text-center">
                              The action you are about to carry out requires you
                              to be a <br />
                              <b>Premium User</b> to proceed:
                            </p>
                          </div>

                          {message ? <Alert_box message={message} /> : null}

                          <PaystackConsumer {...payment_props}>
                            {({ initializePayment }) => (
                              <Stretch_button
                                title="Subscribe to Premium"
                                action={() => {
                                  initializePayment(
                                    this.subscribe,
                                    this.cancel
                                  );
                                }}
                              />
                            )}
                          </PaystackConsumer>
                        </div>
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

export default Premium_user;
