import React from "react";
import Preview_image from "./preview_image";
import { Link } from "react-router-dom";
import Text_btn from "./text_btn";
import Modal from "./modal";
import Vendor_verification_details from "./vendor_verification_details";
import { scroll_to_top } from "./explore_more";

class Vendor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_verification_details = () => this.verification_details.toggle();

  save_vendor = () => {
    window.sessionStorage.setItem("vendor", JSON.stringify(this.props.vendor));
    scroll_to_top();
  };

  render() {
    let { vendor, admin } = this.props;
    let { name, verified, suspended, logo, category, uri, _id, address } =
      vendor;

    return (
      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
        <div className="crs_trt_grid">
          <div className="crs_trt_thumb circle">
            <Link
              to={`/vendor?${uri}`}
              onClick={this.save_vendor}
              className="crs_trt_thum_link"
            >
              <Preview_image style={{ height: 60 }} image={logo} />
            </Link>
          </div>
          <div className="crs_trt_caption">
            <div className="instructor_tag dark">
              <span>{category || "Ecommerce"}</span>
            </div>
            <div className="instructor_title">
              <h4>
                <Link to={`/vendor?${uri}`} onClick={this.save_vendor}>
                  {name}
                </Link>
              </h4>
            </div>
            <p>{address}</p>
            {suspended ? <div className="crs_cates cl_1">Suspended</div> : null}
          </div>
          <div className="crs_trt_footer">
            {verified && !admin ? (
              <div className="crs_trt_ent">
                <Link to={`/vendor?${uri}`} onClick={this.save_vendor}>
                  <Text_btn text="View vendor" />
                </Link>
              </div>
            ) : (
              <div className="crs_trt_ent">
                <Text_btn
                  text="Registration Details"
                  action={this.toggle_verification_details}
                />
              </div>
            )}
          </div>
        </div>

        <Modal
          ref={(verification_details) =>
            (this.verification_details = verification_details)
          }
        >
          <Vendor_verification_details
            toggle={this.toggle_verification_details}
            vendor={vendor}
            on_verify={this.on_verify}
          />
        </Modal>
      </div>
    );
  }
}

export default Vendor;
