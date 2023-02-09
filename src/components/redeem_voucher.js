import React from "react";
import { email_regex, to_title } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import { Loggeduser } from "../Contexts";
import Checkbox from "./checkbox";
import Form_divider from "./form_divider";
import Login from "./login";
import Stretch_button from "./stretch_button";
import Text_input from "./text_input";
import Voucher_redeemed_details from "./voucher_redeemed_details";

const voucher_types = new Array("open voucher", "offer voucher");

class Redeem_voucher extends React.Component {
  constructor(props) {
    super(props);

    this.state = { voucher_type: voucher_types[0] };
  }

  componentDidMount = () => {
    if (this.loggeduser) {
      let { firstname, lastname, email } = this.loggeduser;
      this.setState({ firstname, lastname, email });
    }
  };

  is_set = () => {
    let { firstname, proceeding, lastname, email, phone, value, title } =
      this.state;

    return (
      firstname &&
      lastname &&
      email_regex.test(email) &&
      phone &&
      Number(value) > 0 &&
      title &&
      !proceeding
    );
  };

  set_details = ({ firstname, lastname, email }) =>
    this.setState({ firstname, lastname, email });

  payment_successful = () => {
    let { title, value, firstname, lastname, email, phone, proceeding } =
      this.state;

    if (proceeding) return;

    this.setState({ proceeding: true });

    let voucher = {
      title,
      value,
      firstname,
      lastname,
      email,
      phone,
      user: this.loggeduser._id,
    };

    post_request("create_open_voucher", voucher)
      .then((res) => {
        this.setState({ proceeding: false, voucher_code: res.voucher_code });
      })
      .catch((e) => console.log(e));
  };

  cancel = () => {};

  set_voucher_type = (voucher_type) => this.setState({ voucher_type });

  render() {
    let { toggle } = this.props;
    let {
      voucher_code,
      firstname,
      lastname,
      proceeding,
      account_number,
      email,
      phone,
      voucher_type,
    } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          if (!loggeduser)
            return <Login action={this.set_details} no_redirect />;

          return (
            <section>
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
                            <h4>Redeem Voucher</h4>
                          </div>
                        </div>

                        {voucher_code ? (
                          <Voucher_redeemed_details
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
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                              <div className="form-group">
                                <label>Voucher Type</label>

                                {voucher_types.map((voucher_type_) => {
                                  return (
                                    <Checkbox
                                      type="radio"
                                      title={to_title(
                                        voucher_type_.replace(/_/g, " ")
                                      )}
                                      key={voucher_type_}
                                      _id={voucher_type_}
                                      checked={voucher_type_ === voucher_type}
                                      action={(_id) =>
                                        this.set_voucher_type(_id)
                                      }
                                      name="voucher_type"
                                    />
                                  );
                                })}
                              </div>
                            </div>

                            <Text_input
                              value={voucher_code}
                              title="voucher code"
                              action={(voucher_code) =>
                                this.setState({
                                  voucher_code,
                                  message: "",
                                })
                              }
                              important
                            />

                            <Text_input
                              value={email}
                              title={`Authorised email`}
                              action={(email) =>
                                this.setState({
                                  email,
                                  message: "",
                                })
                              }
                              type="email"
                              important
                            />

                            <Form_divider text="Bank Account" />

                            <Text_input
                              value={account_number}
                              title="account number"
                              action={(account_number) =>
                                this.setState({
                                  account_number,
                                  message: "",
                                })
                              }
                              type="number"
                              important
                            />

                            <Stretch_button
                              title={`Proceed`}
                              loading={proceeding}
                              disabled={!this.is_set()}
                              action={() => this.proceed()}
                            />
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

export default Redeem_voucher;
