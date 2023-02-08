import React from "react";
import { domain } from "../assets/js/utils/constants";
import { Loggeduser } from "../Contexts";
import Text_btn from "./text_btn";

class Voucher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { voucher, vendor } = this.props;
    let { logo, _id } = vendor;
    let { title, value, quantities } = voucher;

    return (
      <Loggeduser>
        {({ loggeduser }) => {
          return (
            <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="edu_cat_2 cat-1">
                <div class="edu_cat_icons">
                  <a class="pic-main" href="#">
                    <img
                      src={`${domain}/images/${logo}`}
                      class="img-fluid"
                      alt=""
                    />
                  </a>
                </div>
                <div class="edu_cat_data">
                  <h4 class="title">
                    <a href="#">{title}</a>
                  </h4>
                  <ul class="meta">
                    <li style={{ fontWeight: "bold" }} class="video">
                      <span>&#8358;</span>
                      {value}
                    </li>
                    <li class="video">
                      <span>Quantities:</span>
                      {quantities}
                    </li>
                  </ul>
                </div>
              </div>
              <span>
                Voluptate ex culpa do in sint consectetur ullamco excepteur eu
                culpa cupidatat. Est aliquip ut commodo laboris proident sit
                anim veniam. Tempor enim amet dolor ea nisi irure culpa in
                labore enim laborum do. Anim magna officia magna qui. Dolor
                fugiat commodo ipsum Lorem et do consectetur veniam consequat
                Lorem qui.
              </span>
              {loggeduser && loggeduser.vendor === _id ? (
                <div>
                  <Text_btn text="Remove" />
                </div>
              ) : null}
            </div>
          );
        }}
      </Loggeduser>
    );
  }
}

export default Voucher;
