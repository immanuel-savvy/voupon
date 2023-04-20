import React from "react";
import { Link } from "react-router-dom";
import Kyc_docs from "./kyc_docs";
import Modal from "./modal";
import Preview_image from "./preview_image";
import Text_btn from "./text_btn";

class User_card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_verification_details = () => this.ver_details?.toggle();

  render() {
    let { user, admin, on_verify } = this.props;
    let {
      picture,
      firstname,
      vendor,
      lastname,
      _id,
      email,
      premium,
      kyc_verified,
    } = user;

    return (
      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
        <div className="crs_trt_grid">
          <div className="crs_trt_thumb circle">
            <span className="crs_trt_thum_link">
              <Preview_image
                image={
                  picture || require("../assets/img/user_image_placeholder.png")
                }
              />
            </span>
          </div>
          <div className="crs_trt_caption">
            {Number(kyc_verified) ? (
              <div className="instructor_tag dark">
                <span>{"Verified"}</span>
              </div>
            ) : null}
            <div className="instructor_title">
              <h4>
                <span>{`${firstname} ${lastname}`}</span>
                &nbsp;
                {premium ? (
                  <span className="theme-cl">
                    <i className="fas fa-star"></i>
                  </span>
                ) : null}
              </h4>
            </div>
            {/* <p style={{ fontStyle: "italic" }}>{email}</p> */}
            {/* <p>{description}</p> */}
            <p>{email}</p>
            {vendor ? (
              <Link to={`/vendor?${vendor}`}>
                <div className="instructor_tag dark">
                  <span>{"Vendor"}</span>
                </div>
              </Link>
            ) : null}
          </div>

          {admin ? (
            <div className="crs_trt_footer">
              {
                <div className="crs_trt_ent">
                  <Text_btn
                    text="Verification Details"
                    action={this.toggle_verification_details}
                  />
                </div>
              }
            </div>
          ) : null}
        </div>

        <Modal ref={(ver_details) => (this.ver_details = ver_details)}>
          <Kyc_docs
            admin={admin}
            user={user}
            on_verify={on_verify}
            toggle={this.toggle_verification_details}
          />
        </Modal>
      </div>
    );
  }
}

export default User_card;
