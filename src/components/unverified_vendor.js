import React from "react";
import Modal from "./modal";
import Preview_image from "./preview_image";
import Vendor_verification_details from "./vendor_verification_details";

class Unverified_vendor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  on_verify = () => this.setState({ verified: true });

  toggle_verification_details = () => this.verification_details.toggle();

  render() {
    if (this.state.verified) return;

    let { vendor } = this.props;
    let { name, logo, description, director, email, address } = vendor;
    let { firstname, lastname, email: director_email } = director;

    return (
      <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6">
        <div class="cates_crs_wrip">
          <div class="crs_trios">
            <div class="crs_cate_icon">
              <Preview_image image={logo} />
            </div>
            <div
              onClick={this.toggle_verification_details}
              class="crs_cate_link"
            >
              <a href="#">Registration Details</a>
            </div>
          </div>
          <div class="crs_capt_cat">
            <h4>{name}</h4>

            <p style={{ fontStyle: "italic" }}>{email}</p>
            <p>{description}</p>
            <p>{address}</p>
          </div>
          <hr />

          <span>Director</span>
          <h5>{`${firstname} ${lastname}`}</h5>
          <p style={{ fontStyle: "italic" }}>{director_email}</p>
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

export default Unverified_vendor;
