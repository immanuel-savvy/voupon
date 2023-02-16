import React from "react";
import { Button } from "react-bootstrap";

const Small_btn = ({ title, variant, action }) => {
  return (
    <Button className="mr-2" variant={variant || "success"} onClick={action}>
      {title}
    </Button>
  );
};

export default Small_btn;
