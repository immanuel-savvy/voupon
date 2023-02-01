import React from "react";

class Voucher_store extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { voucher } = this.props;
    let { image, title } = voucher;

    return (
      <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6">
        <div class="cates_crs_wrip">
          <div class="crs_trios">
            <div class="crs_cate_icon">
              <img style={{ maxHeight: 40 }} src={image} />
            </div>
            <div class="crs_cate_link">
              <a href="#">Get Voucher</a>
            </div>
          </div>
          <div class="crs_capt_cat">
            <h4>{title}</h4>
            <p>At vero eos et accusamus et iusto odio dignissimos.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Voucher_store;
