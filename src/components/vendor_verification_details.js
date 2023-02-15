import React from "react";
import { domain } from "../assets/js/utils/constants";
import { post_request } from "../assets/js/utils/services";
import Alert_box from "./alert_box";
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

  url = (file) => window.open(`${domain}/files/${file}`);

  verify = async () => {
    let { loading } = this.state;
    if (loading) return;

    this.setState({ loading: true });
    let { vendor, toggle, on_verify } = this.props;

    let res = await post_request(`verify_vendor/${vendor._id}`);

    if (res && res.message)
      return this.setState({ message: res.message, loading: false });

    if (res.verified) on_verify && on_verify(vendor._id);
    else toggle && toggle();
  };

  render() {
    let { loading, message } = this.state;
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
              <div
                className="col-xl-12 col-lg-12 col-md-12 col-sm-12"
                style={{ marginBottom: 30 }}
              >
                <Text_btn
                  text="Send an Email"
                  action={() => window.open(`mailto:${director.email}`)}
                  icon="fa-envelope"
                />
              </div>

              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label style={{ textTransform: "capitalize" }}>
                    {(id_type || "Proof of Identity").replace(/_/g, " ")}
                  </label>
                  <br />
                  <Text_btn text={ID} action={() => this.url(ID)} />
                </div>
              </div>

              <Form_divider text="Business Registration Details" />

              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label>Certificate of Incorporation</label>
                  <br />
                  <Text_btn text={cac} action={() => this.url(cac)} />
                </div>
              </div>

              {message ? <Alert_box message={message} /> : null}

              <Stretch_button
                title={"verify"}
                loading={loading}
                action={this.verify}
              />
              <div style={{ marginBottom: 24 }} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Vendor_verification_details;
