import React from "react";
import { get_request } from "../assets/js/utils/services";
import Create_open_voucher from "../components/create_open_voucher";
import Listempty from "../components/listempty";
import Loadindicator from "../components/loadindicator";
import Modal from "../components/modal";
import Offer_voucher from "../components/offer_voucher";
import Padder from "../components/padder";
import Text_btn from "../components/text_btn";
import Voucher_store from "../components/voucher_store";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Nav from "../sections/nav";

class Vouchers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { vouchers, vendors } = await get_request("get_offer_vouchers/all");

    this.setState({ vouchers, vendors });
  };

  toggle_create_voucher = () => this.create_voucher?.toggle();

  render() {
    let { vouchers, vendors } = this.state;

    return (
      <div>
        <Nav page="vouchers" />

        <Padder />
        <Breadcrumb_banner page="vouchers" />

        <section className="min">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-8">
                <div className="sec-heading center">
                  <h2>
                    Your favorite vouchers <span className="theme-cl"></span>
                  </h2>
                  <p>Find vouchers to your favorite vendors here. </p>
                  <p>
                    or{" "}
                    <Text_btn
                      action={this.toggle_create_voucher}
                      text="Create Open Voucher"
                      style={{ fontSize: 18, fontWeight: "bold" }}
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              {vouchers ? (
                vouchers.length ? (
                  vouchers.map((voucher, index) => (
                    <Offer_voucher
                      vendor={vendors[voucher.vendor]}
                      voucher={voucher}
                      key={index}
                    />
                  ))
                ) : (
                  <Listempty />
                )
              ) : (
                <Loadindicator />
              )}
            </div>
          </div>
        </section>
        <Footer />

        <Modal ref={(create_voucher) => (this.create_voucher = create_voucher)}>
          <Create_open_voucher toggle={this.toggle_create_voucher} />
        </Modal>
      </div>
    );
  }
}

export default Vouchers;
