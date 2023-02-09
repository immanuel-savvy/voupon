import React from "react";
import { client_domain, domain } from "../assets/js/utils/constants";
import { Loggeduser } from "../Contexts";
import Text_btn from "./text_btn";

class Voucher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { voucher, vendor, full, in_vendor } = this.props;
    if (!vendor) window.location.assign(client_domain);

    let { logo, _id } = vendor;

    let { title, value, quantities, total_sales, description } = voucher;

    return (
      <Loggeduser>
        {({ loggeduser }) => {
          return (
            <div className={full ? "" : "col-lg-4 col-md-4 col-sm-6"}>
              <div className="edu_cat_2 cat-1">
                <div className="edu_cat_icons">
                  <a className="pic-main" href="#">
                    <img
                      src={`${domain}/images/${logo}`}
                      className="img-fluid"
                      alt=""
                    />
                  </a>
                </div>
                <div className="edu_cat_data">
                  <h4 className="title">
                    <a href="#">{title}</a>
                    {loggeduser && loggeduser.vendor === _id ? (
                      <div>
                        <Text_btn text="Remove" />
                      </div>
                    ) : null}
                  </h4>
                  <ul className="meta">
                    <li style={{ fontWeight: "bold" }} className="video">
                      <span>&#8358;</span>
                      {value}
                    </li>

                    {in_vendor ? (
                      <li className="video">
                        <span>Total Sales:</span>
                        {total_sales}
                      </li>
                    ) : null}
                    <li className="video">
                      <span>Quantities:</span>
                      {quantities}
                    </li>
                  </ul>
                </div>
              </div>
              <span>{description}</span>
            </div>
          );
        }}
      </Loggeduser>
    );
  }
}

export default Voucher;
