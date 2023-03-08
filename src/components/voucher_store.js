import React from "react";
import { domain } from "../assets/js/utils/constants";
import { commalise_figures, to_title } from "../assets/js/utils/functions";
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
    let { title, value, total_sales } = voucher;
    let { logo, address } = vendor;

    return (
      <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
        <div className="cates_crs_wrip">
          <div className="crs_trios">
            <div className="crs_cate_icon">
              <img
                style={{ maxHeight: 40, maxWidth: 100 }}
                src={`${domain}/images/${logo}`}
              />
            </div>
            <div onClick={this.toggle_get_voucher} className="crs_cate_link">
              <a href="#">Purchase</a>
            </div>
          </div>
          <div className="crs_capt_cat">
            <h4>{title}</h4>
            <p>&#8358; {commalise_figures(Number(value))}</p>

            <span>{to_title(address)}</span>
            {/* <br />
            <span>{description}</span> */}
          </div>

          <div>Total sold: {total_sales || 0}</div>
        </div>

        <Modal ref={(get_voucher) => (this.get_voucher = get_voucher)}>
          <Get_voucher voucher={voucher} vendor={vendor} />
        </Modal>
      </div>
    );
  }
}

export default Voucher_store;
