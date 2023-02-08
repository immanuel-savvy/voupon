import React from "react";
import Preview_image from "./preview_image";

class Vendor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { vendor } = this.props;
    let { name, logo, description, director, email, address } = vendor;
    let { firstname, lastname, email: director_email } = director;

    return (
      <Link to={`/vendor`}>
        <div
          class="col-xl-3 col-lg-4 col-md-4 col-sm-6"
          onClick={() =>
            window.sessionStorage.setItem("vendor", JSON.stringify(vendor))
          }
        >
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
        </div>
      </Link>
    );
  }
}

export default Vendor;
