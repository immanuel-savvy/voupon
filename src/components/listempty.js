import React from "react";

const Listempty = ({ text }) => {
  return (
    <div className="my-5" style={{ textAlign: "center", width: "100%" }}>
      <p style={{ textAlign: "center" }} className="h4">
        {text || "Nothing here yet."}
      </p>
    </div>
  );
};

export default Listempty;
