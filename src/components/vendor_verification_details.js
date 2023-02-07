import React from "react";
import Form_divider from "./form_divider";
import Preview_image from "./preview_image";
import Stretch_button from "./stretch_button";
import Text_btn from "./text_btn";
import Text_input from "./text_input";

class Vendor_verification_details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { vendor, toggle } = this.props;
    let {
      name,
      director,
      cac,
      email,
      ID,
      id_type,
      address,
      description,
      logo,
      rc_number,
    } = vendor;

    return (
      <div>
        <form>
          <div className="crs_log_wrap">
            <div className="crs_log__caption">
              <div className="rcs_log_124">
                <div className="Lpo09">
                  <h4>Register your brand</h4>
                  <Text_btn action={toggle} icon="fa-window-close" />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Preview_image image={logo} style={{ height: 50 }} />
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 10,
                  marginBottom: 10,
                  justifyContent: "center",
                }}
              >
                <span style={{ marginRight: 10 }}>RC Number: </span>{" "}
                <h5>{rc_number}</h5>
              </div>

              <Form_divider text="brand information" />
              <Text_input value={name} disabled title="Name" />

              <Text_input value={email} disabled title="email" />

              <Text_input value={description} disabled title="description" />

              <Text_input value={address} disabled title="address" />

              <Form_divider text="director details" />

              <Text_input
                value={director.firstname}
                disabled
                title="firstname"
              />
              <Text_input value={director.lastname} disabled title="lastname" />
              <Text_input value={director.email} disabled title="email" />

              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label>{id_type || "Proof of Identity"}</label>
                  <br />
                  <Text_btn text={ID} action={this.proof_of_id} />
                </div>
              </div>

              <Form_divider text="Business Registration Details" />

              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label>Certificate of Incorporation</label>
                  <br />
                  <Text_btn text={cac} action={this.cac} />
                </div>
              </div>

              <Stretch_button title="verify" action={this.verify} />
              <div style={{ marginBottom: 24 }} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Vendor_verification_details;
