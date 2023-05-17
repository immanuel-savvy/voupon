import React from "react";
import { to_title } from "../assets/js/utils/functions";

class Loadindicator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { height, width, small, text } = this.props;

    return (
      <div
        className={
          !small ? "d-flex align-items-center justify-content-center my-5" : ""
        }
      >
        <img
          src={require("../assets/css/img/ajax-loader.gif")}
          style={{ height: height || 64, width: width || 64 }}
        />
        {text ? <p>{to_title(text)}</p> : null}
      </div>
    );
  }
}

export default Loadindicator;
