import React from "react";

const Alert_box = ({ message, style }) => {
  return (
    <div class="alert alert-danger" style={{ ...style }} role="alert">
      {message}
    </div>
  );
};

export default Alert_box;
