import React from "react";
import { commalise_figures } from "../assets/js/utils/functions";
import { get_request, post_request } from "../assets/js/utils/services";
import Alert_box from "./alert_box";
import Dropdown_menu from "./dropdown_menu";
import Loadindicator from "./loadindicator";
import Manage_bank_accounts from "./manage_bank_accounts";
import Modal from "./modal";
import Small_btn from "./small_btn";
import Topup from "./topup";
import Withdraw_wallet from "./withdraw_wallet";

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { vendor, user, on_wallet } = this.props;
    let wallet = await post_request(`wallet`, {
      user: vendor ? vendor._id || vendor : user._id || user,
    });

    this.setState({ wallet }, () => on_wallet && on_wallet(wallet));
  };

  on_withdraw = ({ amount, balance }) => {
    let { wallet } = this.state;
    wallet[balance] -= Number(amount);
    this.setState({ wallet }, this.toggle_withdraw);
  };

  on_topup = (value) => {
    let { wallet } = this.state;

    wallet.balance += value;

    this.setState({ wallet });
  };

  net_balance = () => {
    let { user } = this.props;

    let { wallet } = this.state;

    if (user) return wallet.balance;

    let { vouchers, coupons, tickets, balance } = wallet;

    return commalise_figures(
      (
        (vouchers || 0) +
        (coupons || 0) +
        (tickets || 0) +
        (balance || 0)
      ).toFixed(2)
    );
  };

  toggle_bank_accounts = () => this.bank_accounts?.toggle();

  toggle_withdraw = () => this.withdraw?.toggle();

  toggle_topup = () => this.topup?.toggle();

  render() {
    let { vendor, user } = this.props;
    let { suspended } = vendor;

    let { wallet } = this.state;

    if (!wallet)
      return (
        <div className="text-center">
          <Loadindicator small />
        </div>
      );

    if (wallet && !wallet._id)
      return (
        <Alert_box
          style={{ marginTop: 15 }}
          message="Cannot fetch wallet at the moment"
        />
      );

    return (
      <div
        className={
          user ? "col-12 mt-3" : "col-xl-6 col-lg-8 col-md-6 col-sm-12"
        }
      >
        <div
          className="dashboard_stats_wrap"
          style={{
            background: "transparent",
            border: "1px solid #ccc",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          }}
        >
          <div className="rounded-circle p-4 p-sm-4 d-inline-flex align-items-center justify-content-center bg-primary mb-2">
            <div className="position-absolute text-white h5 mb-0">
              <i className="fas fa-dollar"></i>
            </div>
          </div>
          <div
            className={`dashboard_stats_wrap_content text-${
              user ? "dark" : "light"
            }`}
          >
            <h3 className="text-${user?'dark':'light'}">
              NGN {this.net_balance()}
            </h3>
            <span>Net value</span>
          </div>
          <br />

          <span
            style={{
              marginTop: 20,
              marginBottom: 20,
              fontWeight: "bold",
              textDecoration: "underline",
            }}
            className={`text-${user ? "dark" : "light"}`}
          >
            Revenues
          </span>
          <div
            style={{
              display: "flex",
              marginTop: 10,
              marginBottom: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {vendor ? (
              <>
                <div
                  className={`dashboard_stats_wrap_content text-${
                    user ? "dark" : "light"
                  }`}
                >
                  <h6 className="text-${user?'dark':'light'}">
                    NGN {commalise_figures((wallet.vouchers || 0).toFixed(2))}
                  </h6>
                  <span>Vouchers</span>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div
                  className={`dashboard_stats_wrap_content text-${
                    user ? "dark" : "light"
                  }`}
                >
                  <h6 className="text-${user?'dark':'light'}">
                    NGN {commalise_figures((wallet.tickets || 0).toFixed(2))}
                  </h6>
                  <span>Tickets</span>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </>
            ) : (
              <>
                <div
                  className={`dashboard_stats_wrap_content text-${
                    user ? "dark" : "light"
                  }`}
                >
                  <h6 className="text-${user?'dark':'light'}">
                    NGN{" "}
                    {commalise_figures((wallet.total_earning || 0).toFixed(2))}
                  </h6>
                  <span>Total Earnings</span>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </>
            )}
            {user ? (
              <div
                className={`dashboard_stats_wrap_content text-${
                  user ? "dark" : "light"
                }`}
              >
                <h6 className={`text-${user ? "dark" : "light"}`}>
                  RWT {commalise_figures((wallet.reward_token || 0).toFixed(2))}
                </h6>
                <span>Reward Token</span>
              </div>
            ) : null}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {suspended ? null : (
              <>
                <Small_btn title="Topup" action={this.toggle_topup} />

                <Small_btn
                  title="Withdraw"
                  action={this.toggle_withdraw}
                  disabled={wallet.value > 0}
                />

                <Dropdown_menu
                  items={
                    new Array({
                      title: "manage bank account",
                      action: this.toggle_bank_accounts,
                    })
                  }
                />
              </>
            )}
          </div>
        </div>

        <Modal ref={(withdraw) => (this.withdraw = withdraw)}>
          <Withdraw_wallet
            wallet={wallet}
            on_withdraw={this.on_withdraw}
            toggle={this.toggle_withdraw}
          />
        </Modal>

        <Modal ref={(bank_accounts) => (this.bank_accounts = bank_accounts)}>
          <Manage_bank_accounts
            vendor={vendor}
            wallet={wallet}
            toggle={this.toggle_bank_accounts}
          />
        </Modal>

        <Modal ref={(topup) => (this.topup = topup)}>
          <Topup
            on_topup={this.on_topup}
            wallet={wallet}
            toggle={this.toggle_topup}
          />
        </Modal>
      </div>
    );
  }
}

export default Wallet;
