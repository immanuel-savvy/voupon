import React from "react";

const Text_btn = ({ text, style, action, icon }) => {
  return (
    <span
      onClick={action}
      style={{ color: "#03b97c", cursor: "pointer", ...style }}
    >
      <span>{`${text}  `}</span>
      <i className={`fas ${icon}`}></i>
    </span>
  );
};

export default Text_btn;
