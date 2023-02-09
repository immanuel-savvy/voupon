import React from "react";

const Alert_box = ({ message }) => {
  return (
    <div class="alert alert-danger" role="alert">
      {message}
    </div>
  );
};

export default Alert_box;
