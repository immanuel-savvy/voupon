import React from "react";
import { email_regex, to_title } from "../assets/js/utils/functions";
import { get_request, post_request } from "../assets/js/utils/services";
import { Loggeduser } from "../Contexts";
import Alert_box from "./alert_box";
import Checkbox from "./checkbox";
import Form_divider from "./form_divider";
import Listempty from "./listempty";
import Loadindicator from "./loadindicator";
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

  componentDidMount = async () => {
    if (this.loggeduser) {
      let { firstname, lastname, email } = this.loggeduser;
      this.setState({ firstname, lastname, email });
    }

    let banks = await get_request("https://api.paystack.co/bank?currency=NGN", {
      headers: {
        Authorization: `Bearer ${"sk_test_8f53d8f0d9303a18a856d4aeba97603d0795fdcb"}`,
      },
    });

    this.setState({ banks });
  };

  is_set = () => {
    let {
      proceeding,
      voucher_code,
      voucher_type,
      bank,
      account_number,
      email,
      message,
    } = this.state;

    return (
      email_regex.test(email) &&
      voucher_code &&
      voucher_type &&
      bank &&
      account_number &&
      !message &&
      !proceeding
    );
  };

  set_details = ({ firstname, lastname, email }) =>
    this.setState({ firstname, lastname, email });

  proceed = async () => {
    let { bank, account_number, email, voucher_code, voucher_type } =
      this.state;

    let details = {
      bank: bank.code,
      account_number,
      email,
      voucher_code,
      voucher_type,
      user: this.loggeduser._id,
    };

    let result = await post_request("can_redeem_voucher", {
      user: details.user,
      voucher_type: details.voucher_type,
      voucher_code: details.voucher_code,
    });

    if (result && result.can_redeem) {
      this.setState({ can_redeem: true });
      result = await post_request("redeem_voucher", details);
    }

    this.setState({ message: result.message, redeemed: result.redeemed });
  };

  cancel = () => {};

  set_voucher_type = (voucher_type) => this.setState({ voucher_type });

  set_bank = ({ target }) =>
    this.setState({
      bank: this.state.banks.find((bank) => bank.id === Number(target.value)),
    });

  render() {
    let { toggle } = this.props;
    let {
      voucher_code,
      firstname,
      message,
      lastname,
      proceeding,
      account_number,
      email,
      banks,
      redeemed,
      voucher_type,
      can_redeem,
    } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          if (!loggeduser)
            return <Login action={this.set_details} no_redirect />;

          return (
            <section style={{ paddingTop: 20, paddingBottom: 20 }}>
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

                        {redeemed ? (
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

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 form-group smalls">
                              <label>Bank</label>
                              {banks ? (
                                banks.length ? (
                                  <div className="simple-input">
                                    <select
                                      id="bank"
                                      onChange={this.set_bank}
                                      className="form-control"
                                    >
                                      <option value="">
                                        -- Select your bank --
                                      </option>
                                      {banks.map((bank) => (
                                        <option key={bank.id} value={bank.id}>
                                          {to_title(
                                            bank.name.replace(/_/g, " ")
                                          )}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                ) : (
                                  <Listempty text="Cannot get banks." />
                                )
                              ) : (
                                <Loadindicator smalls />
                              )}
                            </div>

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

                            {message ? <Alert_box message={message} /> : null}

                            <Stretch_button
                              title={
                                can_redeem
                                  ? "Redeeming"
                                  : proceeding
                                  ? "Verifying voucher"
                                  : `Proceed`
                              }
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
