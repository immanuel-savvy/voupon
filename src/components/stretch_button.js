import React from "react";

class Stretch_button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { title, action, disabled } = this.props;

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
      </button>
    );
  }
}

export default Stretch_button;
