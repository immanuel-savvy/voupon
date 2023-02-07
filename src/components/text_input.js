import React from "react";
import { to_title } from "../assets/js/utils/functions";

class Text_input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let {
      title,
      value,
      disabled,
      type,
      error_message,
      placeholder,
      action,
      important,
    } = this.props;

    if (!value && disabled) return null;

    return (
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <div className="form-group">
          <label>
            {to_title(title)}
            {important ? <span className="text-danger"> *</span> : ""}
          </label>
          <input
            type={type || "text"}
            disabled={disabled}
            className="form-control"
            placeholder={placeholder || to_title(title)}
            value={value}
            onChange={({ target }) => action && action(target.value)}
          />
          {important && !value ? (
            <span style={{ marginBottom: 10 }} className="text-danger">
              * {error_message || to_title(title)}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Text_input;
