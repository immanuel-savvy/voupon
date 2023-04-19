import React from "react";
import { to_title } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import Bank_account from "./bank_account";
import Checkbox from "./checkbox";
import Manage_bank_accounts from "./manage_bank_accounts";
import Modal from "./modal";
import Modal_form_title from "./modal_form_title";
import Stretch_button from "./stretch_button";
import Text_btn from "./text_btn";
import Text_input from "./text_input";

class Withdraw_wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  balances = new Array("vouchers", "tickets", "balance");

  set_bank = (bank) => this.setState({ bank }, this.toggle_select_bank);

  is_set = () => {
    let { wallet } = this.props;
    let { balance, amount } = this.state;

    return balance && Number(amount) > 0 && Number(amount) <= wallet[balance];
  };

  toggle_select_bank = () => this.banks?.toggle();

  withdraw = async () => {
    let { wallet, on_withdraw } = this.props;
    let { amount, balance, bank } = this.state;

    this.setState({ loading: true });

    let details = {
      amount,
      balance,
      vendor: wallet.vendor,
      wallet: wallet._id,
      bank,
    };

    let result = await post_request("withdraw_wallet", details);

    if (result && result.done) {
      on_withdraw({ balance, amount });
    } else
      this.setState({
        loading: false,
        message:
          (result && result.message) || "Cannot withdraw wallet at the moment.",
      });
  };

  render() {
    let { toggle, wallet } = this.props;
    let { amount, balance, loading, bank } = this.state;

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

                  <Modal_form_title title="withdraw" toggle={toggle} />

                  <>
                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group">
                        <label>Balance to Withdraw</label>

                        {this.balances.map((balance_) => {
                          return (
                            <Checkbox
                              type="radio"
                              title={to_title(balance_.replace(/_/g, " "))}
                              key={balance_}
                              _id={balance_}
                              checked={balance_ === balance}
                              action={(balance) => this.setState({ balance })}
                              name="balance"
                            />
                          );
                        })}
                      </div>
                    </div>

                    <Text_input
                      value={amount}
                      type="number"
                      title="Amount"
                      action={(amount) =>
                        this.setState({
                          amount,
                          message: "",
                        })
                      }
                      info={
                        wallet[balance] < Number(amount)
                          ? `Insufficient balance`
                          : ""
                      }
                      important
                    />

                    <Text_btn
                      text="Select Account"
                      style={{ textAlign: "center" }}
                      action={this.toggle_select_bank}
                    />

                    {bank ? <Bank_account account={bank} /> : null}

                    <Stretch_button
                      title="Withdraw"
                      action={this.withdraw}
                      disabled={!this.is_set()}
                      loading={loading}
                    />
                  </>
                </div>
              </form>
            </div>
          </div>
        </div>

        <Modal ref={(banks) => (this.banks = banks)}>
          <Manage_bank_accounts
            wallet={wallet}
            toggle={this.toggle_select_bank}
            on_select={this.set_bank}
          />
        </Modal>
      </section>
    );
  }
}

export default Withdraw_wallet;
