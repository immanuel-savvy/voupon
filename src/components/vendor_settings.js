import React from "react";
import Stretch_button from "./stretch_button";
import File_input from "./file_input";
import Handle_file_upload from "./handle_file_upload";
import Preview_image from "./preview_image";
import { post_request } from "../assets/js/utils/services";
import { special_chars } from "../assets/js/utils/functions";
import Alert_box from "./alert_box";
import { client_domain } from "../assets/js/utils/constants";

class Vendor_settings extends Handle_file_upload {
  constructor(props) {
    super(props);

    let { vendor } = this.props;
    let { name, logo } = vendor;
    this.state = { name, logo };
  }

  proceed = async () => {
    let { vendor } = this.props;
    let { name, logo, logo_filename, logo_hash } = this.state;
    this.setState({ loading: true });

    name = name.trim().replace(special_chars, "");
    let uri = name.toLowerCase().replace(/ /g, "_");
    let res =
      uri === vendor.uri && uri
        ? { available: true }
        : await post_request("vendor_availability", {
            uri,
          });
    if (!res.available)
      return this.setState({ message: "Vendor name is unavailable!" });

    await post_request("update_vendor", {
      name,
      logo,
      _id: vendor._id,
      uri,
      logo_filename,
      logo_hash,
    });

    window.location.assign(`${client_domain}/vendor?${uri}`);
  };

  render() {
    let {
      loading,
      logo_filename,
      logo_hash,
      logo,
      logo_oversize,
      name,
      message,
    } = this.state;

    return (
      <div class="modal-body">
        <div class="login-form">
          <form>
            <div className="authi_125">
              <div className="authi_125_thumb p-2">
                <Preview_image
                  style={{
                    maxHeight: 75,
                    borderWidth: 4,
                    borderColor: "#fff",
                    borderStyle: "solid",
                    borderRadius: 10,
                  }}
                  image={
                    logo || require("../assets/img/user_image_placeholder.png")
                  }
                  image_hash={logo_hash}
                />
              </div>
            </div>

            <File_input
              title="logo"
              action={(e) => this.handle_file(e, "logo", this.logo_maxsize)}
              important
              accept="image/*"
              info="Type: Image, Maxsize: 3MB"
              error_message={logo_oversize ? "Too large" : ""}
              filename={logo_filename}
            />

            <div class="form-group">
              <label>Name</label>
              <div class="input-with-icon">
                <input
                  type="text"
                  class="form-control"
                  value={name}
                  onChange={({ target }) =>
                    this.setState({
                      name: target.value,
                      message: "",
                    })
                  }
                  placeholder="name"
                />
                <i class="ti-user"></i>
              </div>
            </div>

            {message ? <Alert_box message={message} /> : null}

            <div class="form-group">
              <Stretch_button
                action={this.proceed}
                title="Update"
                disabled={!name.trim()}
                loading={loading}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Vendor_settings;
