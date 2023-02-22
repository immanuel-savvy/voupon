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

  render() {
    let { vendor } = this.props;
    let { wallet } = this.state;

    if (!wallet) return <Loadindicator small />;
    return (
      <div class="col-xl-4 col-lg-8 col-md-6 col-sm-12">
        <div class="dashboard_stats_wrap">
          <div class="rounded-circle p-4 p-sm-4 d-inline-flex align-items-center justify-content-center bg-primary mb-2">
            <div class="position-absolute text-white h5 mb-0">
              <i class="fas fa-video"></i>
            </div>
          </div>
          <div class="dashboard_stats_wrap_content">
            <h3>NGN 0.00</h3>
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
            <div class="dashboard_stats_wrap_content">
              <h6>NGN 0.00</h6>
              <span>Vouchers</span>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="dashboard_stats_wrap_content">
              <h6>NGN 0.00</h6>
              <span>Coupons</span>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="dashboard_stats_wrap_content">
              <h6>NGN 0.00</h6>
              <span>Tickets</span>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="dashboard_stats_wrap_content">
              <h6>NGN 0.00</h6>
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
