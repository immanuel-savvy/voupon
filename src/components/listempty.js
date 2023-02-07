import React from "react";

const Listempty = ({ text }) => {
  return (
    <div className="my-5 d-flex justify-content-center">
      <p className="h4">{text || "Nothing here yet."}</p>
    </div>
  );
};

export default Listempty;
