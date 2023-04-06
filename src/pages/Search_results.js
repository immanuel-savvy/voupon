import React from "react";
import { get_request, post_request } from "../assets/js/utils/services";
import Coupon from "../components/coupon";
import Event from "../components/event";
import Loadindicator from "../components/loadindicator";
import Offer_voucher from "../components/offer_voucher";
import Padder from "../components/padder";
import Section_header from "../components/section_headers";
import Vendor from "../components/vendor";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Custom_nav from "../sections/nav";

class Search_results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let search_param = window.location.search.split("=")[1];
    search_param = (search_param || "").replace(/%20/g, " ").toLowerCase();
    this.setState({ search_param });

    let results = await post_request("search_query", { search_param });

    this.setState({ results });
  };

  render() {
    let { search_param, results } = this.state;

    return (
      <div>
        <Custom_nav page="search" />
        <Padder />
        <Breadcrumb_banner title={search_param} page="Search Results" />

        <section>
          {results ? (
            <>
              {Object.keys(results).map((res) => {
                if (!results[res].length) return null;

                return (
                  <span key={res}>
                    <Section_header title={res} />
                    <div class="row justify-content-center">
                      {res === "vouchers"
                        ? results[res].map((voucher) => (
                            <Offer_voucher
                              key={voucher._id}
                              voucher={voucher}
                              vendor={voucher.vendor}
                            />
                          ))
                        : res === "coupons"
                        ? results[res].map((coupon) => (
                            <Coupon coupon={coupon} key={coupon._id} />
                          ))
                        : res === "vendors"
                        ? results[res].map((vendor) => (
                            <Vendor vendor={vendor} key={vendor._id} />
                          ))
                        : res === "events"
                        ? results[res].map((event) => (
                            <Event event={event} key={event._id} />
                          ))
                        : null}
                    </div>
                  </span>
                );
              })}
            </>
          ) : (
            <Loadindicator />
          )}
        </section>

        <Footer />
      </div>
    );
  }
}

export default Search_results;
