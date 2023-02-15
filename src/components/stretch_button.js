import React from "react";
import Loadindicator from "./loadindicator";

class Stretch_button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { title, action, loading, disabled } = this.props;

    if (loading) disabled = loading;

    return (
      <button
        type="button"
        className={
          disabled
            ? "btn full-width btn-md grey text-dark"
            : "btn full-width btn-md theme-bg text-white"
        }
        onClick={action}
        style={{ textTransform: "capitalize" }}
      >
        {title}

        {loading ? <Loadindicator small /> : null}
      </button>
    );
  }
}

export default Stretch_button;
