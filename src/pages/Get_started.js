import React from "react";
import Footer from "../sections/footer";
import Banner from "../sections/banner";
import { Nav } from "react-bootstrap";
import Small_btn from "../components/small_btn";
import { organisation_name } from "../assets/js/utils/constants";
import How_it_works from "../sections/how_it_works";

class Get_started extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    document.title = `Get Started | ${organisation_name}`;
  };

  render() {
    return (
      <div>
        <Nav page="get_started" />
        <div className="body">
          <Banner />

          <section class="pt-0">
            <div class="container">
              <div class="row align-items-center justify-content-between mt-5">
                <div class="col-xl-4 col-lg-5 col-md-6 col-sm-12">
                  <div class="lmp_thumb">
                    <img
                      src={require("../assets/img/vouchers1.png")}
                      class="img-fluid rounded"
                      alt=""
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div class="lmp_caption">
                    <span class="theme-cl">
                      Join the leading sales-boost platform
                    </span>
                    <h2 class="mb-3">Creating a Vendor Account</h2>
                    <p>
                      Creating an account means creating a user account
                      automatically then such user account created would be
                      upgraded to becoming a vendor account. Which implies that
                      as a brand, you can still interact like a user without
                      necessarily creating another user type of account. e.g. As
                      a brand, you can buy another brand ticket, join another
                      brand tour or enjoy every services other brands on the
                      platform enjoys. i.e. you are not limited in interaction
                      as a vendor. Likewise every user that eventually starts a
                      business does not need to create another account to become
                      a vendor. They just simply keep to the existing one by
                      just upgrading.
                    </p>
                    <p>
                      The difference that makes a vendor account is the
                      “vendors” menu. That is where you can create, validate,
                      confirm transactions, check your wallet and do everything
                      you want to do as an online store. If you click on
                      “Tickets” on the homepage, it would mean you want to buy
                      ticket, but if you click on “vendor profile, then click on
                      ticket”, it would mean you want to create ticket or track
                      ticket record of the one you have created.
                    </p>
                    <p>
                      This is the way the system works for every other modules.
                    </p>
                    <div class="foot-news-last mt-4">
                      <div class="input-group">
                        <Small_btn title="Get Started" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div class="clearfix"></div>
          <How_it_works />

          <Footer />
        </div>
      </div>
    );
  }
}

export default Get_started;
