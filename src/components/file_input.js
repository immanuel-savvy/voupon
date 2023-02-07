import React from "react";
import { to_title } from "../assets/js/utils/functions";

class File_input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { title, filename, important, error_message, accept, action } =
      this.props;

    return (
      <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
        <div className="form-group">
          <label>
            {to_title(title)}
            {important ? <span className="text-danger"> *</span> : null}
          </label>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="customFileBanner"
              accept={accept}
              onChange={action}
            />
            <label className="custom-file-label" for="customFileBanner">
              {filename || "Choose file"}
            </label>
          </div>

          {important && !filename ? (
            <span style={{ marginBottom: 10 }} className="text-danger">
              * {error_message || to_title(title)}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
}

export default File_input;
