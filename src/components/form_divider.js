import React from "react";

const Form_divider = ({ text, action }) => {
  return (
    <div
      onClick={action}
      style={{
        padding: 16,
        borderWidth: 1,
        borderColor: "#03b97c",
        borderStyle: "solid",
        borderRadius: 5,
        paddingBottom: 5,
        marginBottom: 10,
        cursor: action ? "pointer" : "text",
      }}
    >
      <h6 style={{ color: "#03b97c" }}>{text}</h6>
    </div>
  );
};

export default Form_divider;
