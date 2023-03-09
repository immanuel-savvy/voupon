import React from "react";
import Voucher_details from "./voucher_details";
import Voucher_media from "./voucher_media";
import Voucher_reviews from "./voucher_reviews";

class Voucher_overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { voucher, vendor } = this.props;

    return (
      <div class="col-lg-8 col-md-12 order-lg-first">
        <Voucher_media voucher={voucher} />

        <Voucher_details voucher={voucher} vendor={vendor} />

        <Voucher_reviews voucher={voucher} vendor={vendor} />
      </div>
    );
  }
}

export default Voucher_overview;
