import React from "react";
import { get_request } from "../assets/js/utils/services";
import Create_open_voucher from "../components/create_open_voucher";
import Listempty from "../components/listempty";
import Loadindicator from "../components/loadindicator";
import Modal from "../components/modal";
import Offer_voucher from "../components/offer_voucher";
import Padder from "../components/padder";
import Vouchers_header from "../components/vouchers_header";
import Vouchers_sidebar from "../components/vouchers_sidebar";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Nav from "../sections/nav";

class Vouchers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 15,
      page: 1,
    };
  }

  componentDidMount = async () => {
    let { limit } = this.state;

    let { vouchers, vendors, total } = await get_request(
      `get_offer_vouchers/${limit}`
    );

    this.setState({ vouchers, vendors, total });
  };

  toggle_create_voucher = () => this.create_voucher?.toggle();

  render() {
    let { vouchers, vendors, total, page, limit } = this.state;

    return (
      <div>
        <Nav page="vouchers" />

        <Padder />
        <Breadcrumb_banner page="vouchers" />

        <section className="gray">
          <div className="container">
            <div className="row">
              <Vouchers_sidebar />

              <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                <Vouchers_header
                  length={vouchers && vouchers.length}
                  total={total}
                  page={page}
                  limit={limit}
                />

                <div class="row justify-content-center">
                  {vouchers ? (
                    vouchers.length ? (
                      vouchers.map((voucher, index) => (
                        <Offer_voucher
                          vendor={vendors[voucher.vendor]}
                          voucher={voucher}
                          in_vouchers
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
