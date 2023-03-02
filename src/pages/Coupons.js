import React from "react";
import { post_request } from "../assets/js/utils/services";
import Coupon from "../components/coupon";
import Listempty from "../components/listempty";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Small_btn from "../components/small_btn";
import User_voucher_header from "../components/user_voucher_header";
import { coupon_types } from "../components/vendor_coupons";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Nav from "../sections/nav";

class Coupons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 15,
      page: 1,
    };
  }

  componentDidMount = async () => {
    let { type, limit, page } = this.state;
    let coupons = await post_request("coupons", {
      limit,
      skip: limit * (page - 1),
      type,
    });

    this.setState({ coupons });
  };

  search_coupon = async () => {
    let { search_param, type, searching } = this.state;
    if (searching || !search_param) return;

    this.setState({ searching: true });

    let coupons = await post_request("search_coupons", { search_param, type });
    this.setState({ coupons, searching: false });
  };

  render() {
    let { coupons, type, searching } = this.state;

    return (
      <div>
        <Nav page="coupons" />
        <Padder />
        <Breadcrumb_banner
          page="coupons"
          bg={require("../assets/img/coupons1.jpg")}
        />

        <section className="min">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-8">
                <div className="sec-heading center">
                  <h2>
                    Coupons <span className="theme-cl"></span>
                  </h2>
                  <p>Find coupons to your favorite vendors here. </p>
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="form-group col-lg-6 col-md-6 col-xl-4 col-sm-12">
                <div className="input-with-icon mb-2">
                  <i className="ti-search"></i>
                  <input
                    type="text"
                    className="form-control"
                    style={{ backgroundColor: "#eee" }}
                    autoFocus
                    placeholder="Search Your Coupon"
                    onChange={({ target }) =>
                      this.setState({ search_param: target.value })
                    }
                  />
                </div>

                <div style={{ textAlign: "center" }}>
                  <Small_btn title="Search" action={this.search_coupon} />
                </div>
              </div>
            </div>

            <User_voucher_header
              on_search={this.search_coupon}
              voucher_filters={new Array("all", ...coupon_types).map(
                (type) => `${type} coupons`
              )}
              set_voucher_filter={(type) =>
                this.setState({
                  type: type === "all coupons" ? null : type.split(" ")[0],
                })
              }
            />

            <div className="row justify-content-center">
              {coupons && !searching ? (
                coupons.length ? (
                  coupons.map((coupon) =>
                    type && coupon.type !== type ? null : (
                      <Coupon coupon={coupon} key={coupon._id} />
                    )
                  )
                ) : (
                  <Listempty text="No coupons yet" />
                )
              ) : (
                <Loadindicator />
              )}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Coupons;
