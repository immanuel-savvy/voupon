import React from "react";
import Preview_image from "./preview_image";
import { Link } from "react-router-dom";
import Text_btn from "./text_btn";
import Modal from "./modal";
import Vendor_verification_details from "./vendor_verification_details";
import { client_domain } from "../assets/js/utils/constants";
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
    let { vendor } = this.props;
    let {
      name,
      verified,
      logo,
      description,
      director,
      category,
      email,
      address,
    } = vendor;

    return (
      <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
        <div class="crs_trt_grid">
          <div class="crs_trt_thumb circle">
            <Link
              to="/vendor"
              onClick={this.save_vendor}
              class="crs_trt_thum_link"
            >
              <Preview_image image={logo} />
            </Link>
          </div>
          <div class="crs_trt_caption">
            <div class="instructor_tag dark">
              <span>{category || "Ecommerce"}</span>
            </div>
            <div class="instructor_title">
              <h4>
                <Link to="/vendor" onClick={this.save_vendor}>
                  {name}
                </Link>
              </h4>
            </div>
            <p style={{ fontStyle: "italic" }}>{email}</p>
            <p>{description}</p>
            <p>{address}</p>
          </div>
          <div class="crs_trt_footer">
            {verified ? (
              <div class="crs_trt_ent">
                <Link to="/vendor" onClick={this.save_vendor}>
                  <Text_btn text="View vendor" />
                </Link>
              </div>
            ) : (
              <div class="crs_trt_ent">
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
