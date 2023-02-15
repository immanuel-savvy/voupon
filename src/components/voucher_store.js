import React from "react";
import { domain } from "../assets/js/utils/constants";
import Get_voucher from "./get_voucher";
import Modal from "./modal";

class Voucher_store extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_get_voucher = () => this.get_voucher?.toggle();

  render() {
    let { vendor, voucher } = this.props;
    let { title, value, description, total_sales } = voucher;
    let { logo, address } = vendor;

    return (
      <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6">
        <div class="cates_crs_wrip">
          <div class="crs_trios">
            <div class="crs_cate_icon">
              <img
                style={{ maxHeight: 40, maxWidth: 100 }}
                src={`${domain}/images/${logo}`}
              />
            </div>
            <div onClick={this.toggle_get_voucher} class="crs_cate_link">
              <a href="#">Purchase</a>
            </div>
          </div>
          <div class="crs_capt_cat">
            <h4>{title}</h4>
            <p>&#8358; {value}</p>

            <span>{address}</span>

            <span>{description}</span>
          </div>

          {total_sales ? <div>Total sold: {total_sales}</div> : null}
        </div>

        <Modal ref={(get_voucher) => (this.get_voucher = get_voucher)}>
          <Get_voucher voucher={voucher} vendor={vendor} />
        </Modal>
      </div>
    );
  }
}

export default Voucher_store;
