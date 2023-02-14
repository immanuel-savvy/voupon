import React from "react";

const Text_btn = ({ text, color, style, action, icon }) => {
  return (
    <span
      onClick={action}
      style={{ color: color || "#03b97c", cursor: "pointer", ...style }}
    >
      {text ? <span>{`${text}  `}</span> : null}
      <i className={`fas ${icon}`}></i>
    </span>
  );
};

export default Text_btn;
