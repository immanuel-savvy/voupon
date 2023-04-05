import React from "react";
import { email_regex } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import { Loggeduser } from "../Contexts";
import Alert_box from "./alert_box";
import Coupon_created_details from "./coupon_created_details";
import Login from "./login";
import Modal_form_title from "./modal_form_title";
import Premium_user from "./premium_user";
import Stretch_button from "./stretch_button";
import Text_input from "./text_input";

class Obtain_coupon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    let { user } = this.props;
    user && this.setState({ email: user.email });
  };

  generate = async () => {
    let { coupon, user } = this.props;
    let { email } = this.state;

    let result = await post_request("premium_coupon_obtained", {
      email,
      coupon: coupon._id,
      user: user && user._id,
    });

    if (result && result.coupon) this.setState({ coupon: result.coupon });
    else
      this.setState({
        message:
          (result && result.message) || "Cannot obtain coupon at the moment",
      });
  };

  can_proceed = () => this.setState({ can_proceed: true });

  render() {
    let { toggle } = this.props;
    let { coupon, email, can_proceed, message } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          if (!loggeduser) return <Login no_redirect />;
          if (!loggeduser.premium || can_proceed)
            return <Premium_user toggle={this.can_proceed} />;

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
                          title="obtain coupon"
                          toggle={toggle}
                        />

                        {coupon ? (
                          <Coupon_created_details
                            coupon={coupon}
                            toggle={toggle}
                          />
                        ) : (
                          <>
                            <Text_input
                              value={email}
                              title="Your email"
                              action={(email) =>
                                this.setState({
                                  email,
                                  message: "",
                                })
                              }
                              important
                            />

                            {message ? <Alert_box message={message} /> : null}

                            <span>
                              <Stretch_button
                                title="generate code"
                                disabled={!email_regex.test(email)}
                                action={this.generate}
                              />
                            </span>
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
  }
}

export default Obtain_coupon;
