import React from "react";
import { domain } from "../assets/js/utils/constants";
import { post_request } from "../assets/js/utils/services";
import Alert_box from "./alert_box";
import Form_divider from "./form_divider";
import Modal_form_title from "./modal_form_title";
import Preview_image from "./preview_image";
import Small_btn from "./small_btn";
import Stretch_button from "./stretch_button";
import Text_btn from "./text_btn";
import Text_input from "./text_input";

class Vendor_verification_details extends React.Component {
  constructor(props) {
    super(props);

    let { vendor } = this.props;

    this.state = {
      suspended: vendor.suspended,
    };
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

  suspend = async () => {
    if (!window.confirm("Are you sure to suspend vendor?")) return;

    let { vendor } = this.props;

    await post_request(`suspend_vendor/${vendor._id}`);

    this.setState({ suspended: true });
  };

  remove_suspension = async () => {
    if (!window.confirm("Are you sure to remove vendor from suspension?"))
      return;

    let { vendor } = this.props;

    await post_request(`remove_suspension/${vendor._id}`);

    this.setState({ suspended: false });
  };

  delete_account = async () => {
    window.alert("Coming soon...");
  };

  render() {
    let { loading, message, suspended } = this.state;
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
      verified,
    } = vendor;

    return (
      <div>
        <form>
          <div className="crs_log_wrap">
            <div className="crs_log__caption">
              <Modal_form_title title="Register your brand" toggle={toggle} />

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
              {verified ? (
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <div className="crs_cates cl_3">{"Verified"}</div>
                </div>
              ) : null}

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

              {suspended ? (
                <div style={{ textAlign: "center" }}>
                  <Alert_box message={"Vendor is on suspension"} />
                  <Small_btn
                    title="Remove Suspension"
                    action={this.remove_suspension}
                  />
                </div>
              ) : verified ? (
                <div style={{ textAlign: "center" }}>
                  <Small_btn title="Suspend" action={this.suspend} />
                  <Small_btn
                    title="Delete Account"
                    action={this.delete_account}
                  />
                </div>
              ) : (
                <Stretch_button
                  title={"verify"}
                  loading={loading}
                  action={this.verify}
                />
              )}
              <div style={{ marginBottom: 24 }} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Vendor_verification_details;
