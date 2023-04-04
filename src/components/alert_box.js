import React from "react";

const Alert_box = ({ message, style, type }) => (
  <div
    class={`alert alert-${type || "danger"}`}
    style={{ ...style }}
    role="alert"
  >
    {message}
  </div>
);

export default Alert_box;
