import React from "react";
import { to_title } from "../assets/js/utils/functions";
import { get_request, post_request } from "../assets/js/utils/services";
import Bank_account from "./bank_account";
import Form_divider from "./form_divider";
import { Paystack_private_key } from "./get_voucher";
import Listempty from "./listempty";
import Loadindicator from "./loadindicator";
import Modal_form_title from "./modal_form_title";
import Stretch_button from "./stretch_button";
import Text_btn from "./text_btn";
import Text_input from "./text_input";

class Manage_bank_accounts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  is_set = () => {
    let { bank, account_number } = this.state;

    return !bank || !account_number;
  };

  set_bank = ({ target }) => this.setState({ bank: target.value });

  add_account = async () => {
    let { wallet } = this.props;
    let { bank, banks, account_number } = this.state;

    this.setState({ loading: true });

    bank = banks.find((bank_) => bank_.id == bank);

    bank = { id: bank.id, code: bank.code, name: bank.name };

    let account = { bank, account_number, wallet: wallet._id };

    let result = await post_request("add_account", account);

    if (result._id) {
      account._id = result._id;
      account.created = result.created;
      let { accounts } = this.state;
      accounts = new Array(account, ...accounts);

      this.setState({ accounts, loading: false, new_account: false });
    } else
      this.setState({
        loading: false,
        message: (result && result.message) || "Cannot add bank at the moment.",
      });
  };

  fetch_banks = async () => {
    let banks = await get_request("https://api.paystack.co/bank?currency=NGN", {
      headers: {
        Authorization: `Bearer ${Paystack_private_key}`,
      },
    });

    this.setState({ banks });
  };

  componentDidMount = async () => {
    let { wallet, toggle } = this.props;
    if (!wallet) return toggle && toggle();
    let accounts = await get_request(`accounts/${wallet._id}`);

    this.setState({ accounts });
  };

  toggle_new_account = () =>
    this.setState({ new_account: !this.state.new_account }, () => {
      let { new_account, banks } = this.state;
      new_account && !banks && this.fetch_banks();
    });

  render() {
    let { toggle, on_select } = this.props;
    let { accounts, banks, account_number, new_account, loading } = this.state;

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

                  <Modal_form_title
                    title="manage bank accounts"
                    toggle={toggle}
                  />

                  <>
                    {accounts ? (
                      accounts.length ? (
                        accounts.map((account) => (
                          <Bank_account
                            account={account}
                            action={on_select}
                            key={account._id}
                          />
                        ))
                      ) : (
                        <Listempty text="No accounts yet" />
                      )
                    ) : (
                      <Loadindicator />
                    )}

                    <Form_divider
                      action={this.toggle_new_account}
                      text="Add Account"
                    />

                    {new_account ? (
                      <>
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
                                      {to_title(bank.name.replace(/_/g, " "))}
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

                        <Stretch_button
                          loading={loading}
                          title="Add"
                          action={this.add_account}
                          disabled={!this.is_set}
                        />
                      </>
                    ) : null}
                  </>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Manage_bank_accounts;
