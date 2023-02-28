import React from "react";
import { get_request } from "../assets/js/utils/services";
import Dropdown_menu from "./dropdown_menu";
import Loadindicator from "./loadindicator";
import Small_btn from "./small_btn";

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { vendor } = this.props;
    let wallet = await get_request(`vendor_wallet/${vendor._id}`);
    this.setState({ wallet });
  };

  net_balance = () => {
    let { wallet } = this.state;

    let { vouchers, coupons, giftcards, tickets } = wallet;

    return (
      (vouchers || 0) +
      (coupons || 0) +
      (giftcards || 0) +
      (tickets || 0)
    ).toFixed(2);
  };

  render() {
    let { wallet } = this.state;

    if (!wallet) return <Loadindicator small />;
    return (
      <div class="col-xl-6 col-lg-8 col-md-6 col-sm-12">
        <div
          class="dashboard_stats_wrap"
          style={{
            background: "transparent",
            border: "1px solid #ccc",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          }}
        >
          <div class="rounded-circle p-4 p-sm-4 d-inline-flex align-items-center justify-content-center bg-primary mb-2">
            <div class="position-absolute text-white h5 mb-0">
              <i class="fas fa-dollar"></i>
            </div>
          </div>
          <div class="dashboard_stats_wrap_content text-light">
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
            <div class="dashboard_stats_wrap_content text-light">
              <h6 className="text-light">
                NGN {(wallet.vouchers || 0).toFixed(2)}
              </h6>
              <span>Vouchers</span>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="dashboard_stats_wrap_content text-light">
              <h6 className="text-light">NGN 0.00</h6>
              <span>Coupons</span>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="dashboard_stats_wrap_content text-light">
              <h6 className="text-light">NGN 0.00</h6>
              <span>Tickets</span>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="dashboard_stats_wrap_content text-light">
              <h6 className="text-light">NGN 0.00</h6>
              <span>Giftcards</span>
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
            <Small_btn title="Withdraw" disabled={wallet.value > 0} />
            <Dropdown_menu
              items={
                new Array(
                  {
                    title: "add bank account",
                    action: this.toggle_add_bank_account,
                  },
                  { title: "bank accounts", action: this.bank_accounts }
                )
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Wallet;
