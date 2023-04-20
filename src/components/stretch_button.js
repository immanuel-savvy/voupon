import React from "react";
import Loadindicator from "./loadindicator";

class Stretch_button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  action = () => {
    let { action, loading, disabled } = this.props;

    !loading && !disabled && action && action();
  };

  render() {
    let { title, action, class_name, style, loading, disabled } = this.props;

    if (loading) disabled = loading;

    return (
      <button
        type="button"
        className={
          class_name
            ? `${class_name} full-width`
            : disabled
            ? "btn full-width btn-md gray text-dark"
            : "btn full-width btn-md theme-bg text-white"
        }
        disabled={disabled}
        onClick={() => !disabled && action()}
        style={{ textTransform: "capitalize", ...style }}
      >
        {title}

        {loading ? <Loadindicator small /> : null}
      </button>
    );
  }
}

export default Stretch_button;
