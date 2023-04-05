import React from "react";

const Icon_btn = ({ toggle }) => {
  return (
    <button
      type="button"
      class="close"
      data-dismiss="modal"
      aria-label="Close"
      onClick={() => toggle && toggle()}
    >
      <span aria-hidden="true">
        <i class="fas fa-times-circle"></i>
      </span>
    </button>
  );
};

export default Icon_btn;
