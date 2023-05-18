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
      info,
      on_blur,
      on_focus,
      major_err,
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
            onBlur={on_blur}
            onFocus={on_focus}
            className="form-control"
            placeholder={placeholder || to_title(title)}
            value={value}
            onChange={({ target }) => action && action(target.value)}
            {...this.props}
          />
          {info ? (
            <span style={{ marginBottom: 10 }} className="text-info">
              * {info}
              <br />
            </span>
          ) : null}
          {(important && !value) || major_err ? (
            <span style={{ marginBottom: 10 }} className="text-danger">
              * {major_err || error_message || to_title(title)}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Text_input;
