import React from "react";
import { get_request } from "../assets/js/utils/services";
import Alert_box from "./alert_box";
import Dropdown_menu from "./dropdown_menu";
import Loadindicator from "./loadindicator";
import Manage_bank_accounts from "./manage_bank_accounts";
import Modal from "./modal";
import Small_btn from "./small_btn";
import Withdraw_wallet from "./withdraw_wallet";

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { vendor, user } = this.props;
    let wallet = await get_request(
      `vendor_wallet/${vendor ? vendor._id : user._id}`
    );
    this.setState({ wallet });
  };

  on_withdraw = ({ amount, balance }) => {
    let { wallet } = this.state;
    wallet[balance] -= Number(amount);
    this.setState({ wallet }, this.toggle_withdraw);
  };

  net_balance = () => {
    let { wallet } = this.state;

    let { vouchers, coupons, tickets } = wallet;

    return ((vouchers || 0) + (coupons || 0) + (tickets || 0)).toFixed(2);
  };

  toggle_bank_accounts = () => this.bank_accounts?.toggle();

  toggle_withdraw = () => this.withdraw?.toggle();

  render() {
    let { vendor, user } = this.props;
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
          <div className="dashboard_stats_wrap_content text-light">
            <h3 className="text-light">NGN {this.net_balance()}</h3>
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
            className="text-light"
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
            <div className="dashboard_stats_wrap_content text-light">
              <h6 className="text-light">
                NGN {(wallet.vouchers || 0).toFixed(2)}
              </h6>
              <span>Vouchers</span>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="dashboard_stats_wrap_content text-light">
              <h6 className="text-light">
                NGN {(wallet.tickets || 0).toFixed(2)}
              </h6>
              <span>Tickets</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
      </div>
    );
  }
}

export default Wallet;
