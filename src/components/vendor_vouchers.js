import React from "react";
import { get_request } from "../assets/js/utils/services";
import Loadindicator from "./loadindicator";
import Listempty from "./listempty";
import { emitter } from "./../Voupon";
import User_voucher_header from "./user_voucher_header";
import Modal from "./modal";
import Use_voucher from "./use_voucher";
import Offer_voucher from "./offer_voucher";
import { client_domain } from "../assets/js/utils/constants";
import { save_to_session } from "../sections/footer";

class Vendor_vouchers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      state: this.voucher_states[0],
    };
  }

  voucher_states = new Array("running", "closed", "expired");

  componentDidMount = async () => {
    let { vendor } = this.props;
    let offer_vouchers = await get_request(`offer_vouchers/${vendor._id}`);

    this.setState({ offer_vouchers });

    this.new_offer_voucher = (voucher) => {
      if (voucher.vendor !== vendor._id) return;

      let { offer_vouchers } = this.state;
      offer_vouchers = new Array(voucher, ...offer_vouchers);
      this.setState({ offer_vouchers });
    };
    emitter.listen("new_offer_voucher", this.new_offer_voucher);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("new_offer_voucher", this.new_offer_voucher);
  };

  toggle_create_voucher = () => this.create_offer?.toggle();

  toggle_use_voucher = () => this.use_voucher?.toggle();

  edit = (voucher, vendor) => emitter.emit("edit_voucher", { voucher, vendor });

  render() {
    let { vendor, loggeduser } = this.props;
    let { offer_vouchers, filter, use_voucher } = this.state;

    return (
      <div className="container">
        <div class="row justify-content-center">
          <div class="col-lg-7 col-md-8">
            <div class="sec-heading center">
              <h2>
                Offer <span class="theme-cl">Vouchers</span>
              </h2>
              <p>Vouchers that are service specific.</p>
            </div>
          </div>
        </div>
        {vendor._id === loggeduser?.vendor ? (
          <User_voucher_header
            voucher_filters={this.voucher_states}
            set_voucher_filter={(filter) => this.setState({ filter })}
            voucher_type={"offer voucher"}
            side_buttons={
              new Array(
                {
                  title: "create offer voucher",
                  action: () => {
                    window.location.assign(
                      `${client_domain}/create_offer_voucher`
                    );
                    save_to_session("vendor", vendor);
                  },
                },
                { title: "use voucher", action: this.toggle_use_voucher }
              )
            }
          />
        ) : null}
        <div className="row align-items-center">
          {offer_vouchers ? (
            offer_vouchers.length ? (
              offer_vouchers.map((voucher) =>
                voucher.state === filter ||
                (!voucher.state && filter === "running") ? (
                  <Offer_voucher
                    in_vendor
                    edit={
                      (loggeduser && loggeduser.vendor) ===
                      (vendor && vendor._id)
                        ? () => this.edit(voucher, vendor)
                        : null
                    }
                    vendor={vendor}
                    voucher={voucher}
                    key={voucher._id}
                  />
                ) : null
              )
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>
        <Modal ref={(use_voucher) => (this.use_voucher = use_voucher)}>
          <Use_voucher
            toggle={this.toggle_use_voucher}
            voucher={use_voucher}
            vendor={vendor}
          />
        </Modal>
      </div>
    );
  }
}

export default Vendor_vouchers;
