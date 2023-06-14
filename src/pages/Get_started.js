import React from "react";
import Footer, { scroll_to_top } from "../sections/footer";
import Banner from "../sections/banner";
import { organisation_name } from "../assets/js/utils/constants";
import How_it_works from "../sections/how_it_works";
import Service from "../sections/service";
import Contact_us_today from "../components/contact_us_today";
import Faqs from "../sections/faqs";
import { Link } from "react-router-dom";
import Our_vendors from "../sections/our_vendors";
import Custom_nav from "../sections/nav";
import Why_choose_us from "../sections/why_choose_us";

class Get_started extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    scroll_to_top();

    document.title = `Get Started | ${organisation_name}`;
  };

  services = new Array(
    {
      title: "Vouchers",
      text: `offer you the opportunity to understand your market and their purchasing ability.

    A customer buys your voucher and then use it against the service you made the provision for.
    
    If a service or products sells in store for 1,000NGN and a voucher of 900NGN is created and you get a sell out, it makes you understand how much customers are willing to pay for your goods and services.
    Voucher also serves as your price list. Everyone, everywhere gets to see how much your products and services costs and you stand to get close to the market as such.
    
    Voucher is unlimited as it cuts across every industry and you can also create coupons to help drive your voucher sales faster.`,
      img: require("../assets/img/vouchers1.png"),
    },
    {
      title: "Coupons",
      text: `offer you the opportunity to attract potential leads with mouth-watering offer which is usually freebies.

    A customer gets your coupon code for free, then the customer heads on to use it against such service voucher or ticket on the platform or on your existing website.
    
    The coupon is an off price in percentage.
    e.g If you sell a Pen for 1,000NGN, then you create a coupon of 10% discount in 5 quantities. Then 5 different lucky customers that gets the freebie heads on to the voucher of the Pen. When they are about to pay for the pen, they would click on the apply coupon option and 10% would be deducted from the actual price. Such lucky customers get to pay only 900 instead of 1,000.
    
    Hence: you must create a Ticket or Voucher before heading to create a coupon for such offer.
    
    coupon uses sales, price slash and deals to make a prospect become your loyal customers. 
    
    NOTE: coupons generated on our portal can be used on your existing website or platform if you integrate our A.P.I to your existing website or platform.`,
      img: require("../assets/img/coupons1.jpg"),
    },
    {
      title: "ENPL",
      text: `stands for acronym Enjoy Now, Pay Later.
This allows access for leasing (such as housing and rentals) and subscription based services(such as spa, gym and even real estate plan) to get their products and services listed too.

You get to upload such service, how much you are willing to take as down payment, how you want your payment made- daily, weekly or monthly and how many quantities or space you have for such item and service.

Our platform makes the job easy for you as only KYC verified users can access E.N.P.L.
We also do the book records for you. You know the total subscribers you have for all products you listed on E.N.P.L, you know the total subscriber for each separate products listed, you know the amounts of payment each subscribers have made and of course the users full details including email and telephone for follow up and further engagements.

You also stand the chance to create coupons to help drive your voucher sales faster.`,
      img: require("../assets/img/bgg.jpg"),
    },
    {
      title: "Tickets",
      text: `allow buyers entry to your events, training, workshop, tour e.t.c. Tickets can be generated and validated via our platform.

    You just need to create a ticket for an event or training you want to host then you get the chance to sell and know who bought ticket.
    
    The ticket code is usually sent to buyer’s mail and also to you so you can always validate the code; you will get to know the name, email, phone no and code of the ticket sent to the particular buyers mail.
    
    NOTE: When you create a ticket, you can always share the ticket link out for promotion, anytime anyone clicks on the link, it takes them to your event page directly to make payment.
    
    You also stand the chance to create coupons to help drive your voucher sales faster.`,
      img: require("../assets/img/tickets2.jpeg"),
    }
  );

  render() {
    return (
      <div>
        <Custom_nav page="get_started" />
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
                      <Link to="/" className="btn btn-md text-light theme-bg">
                        Get Started
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div class="clearfix"></div>
          <How_it_works />

          {this.services.map((service, i) => (
            <Service service={service} index={i} />
          ))}

          <Why_choose_us />

          <Our_vendors />

          <Faqs />

          <Contact_us_today />
          <Footer />
        </div>
      </div>
    );
  }
}

export default Get_started;
