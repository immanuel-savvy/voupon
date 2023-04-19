import React from "react";
import { to_title } from "../assets/js/utils/functions";
import { domain, get_request } from "../assets/js/utils/services";
import Alert_box from "./alert_box";
import Checkbox from "./checkbox";
import Form_divider from "./form_divider";
import Loadindicator from "./loadindicator";
import Modal_form_title from "./modal_form_title";
import Preview_image from "./preview_image";
import Text_btn from "./text_btn";
import Text_input from "./text_input";

class Kyc_docs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  url = (file) => window.open(`${domain}/files/${file}`);

  componentDidMount = async () => {
    let { user } = this.props;

    let docs = await get_request(`user_kyc_doc/${user._id}`);

    this.setState({
      docs: docs && docs._id ? docs : null,
      message: docs && docs._id ? null : "Cannot fetch documents at the moment",
    });
  };

  render() {
    let { user, toggle } = this.props;
    let { docs, message } = this.state;
    let { picture, bio, ID, id_type, address, website } = docs || new Object();

    return (
      <div>
        <form>
          <div className="crs_log_wrap">
            <Modal_form_title title="Verification Documents" toggle={toggle} />
            <div className="crs_log__caption">
              {docs ? (
                <>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Preview_image
                      image={picture}
                      style={{ height: 200, borderRadius: 5, marginBottom: 20 }}
                    />
                  </div>

                  <Form_divider text="Basic Information" />

                  <div className="form-group mx-3 mt-3">
                    <label>
                      About Yourself
                      <span className="text-danger"> *</span>
                    </label>

                    <textarea
                      value={bio}
                      rows="10"
                      disabled
                      className="form-control"
                      placeholder="Write here..."
                      important
                    ></textarea>
                  </div>

                  <Text_input
                    value={address}
                    disabled
                    title="address"
                    important
                  />

                  <Text_input
                    value={website}
                    disabled
                    title="brand website"
                    placeholder="https://www.brand.com"
                  />

                  <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label>Means of Identification</label>

                      <Checkbox
                        type="radio"
                        title={to_title(id_type)}
                        checked
                      />
                    </div>
                  </div>

                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label>ID</label>
                      <br />
                      <Text_btn text={ID} action={() => this.url(ID)} />
                    </div>
                  </div>

                  <Form_divider text="User Information" />
                </>
              ) : message ? (
                <Alert_box message={message} />
              ) : (
                <Loadindicator />
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Kyc_docs;
