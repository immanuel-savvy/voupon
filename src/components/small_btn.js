import React from "react";
import { Button } from "react-bootstrap";

const Small_btn = ({ title, variant, disabled, style, action }) => {
  return (
    <Button
      disabled={disabled}
      className="mr-2"
      variant={variant || "success"}
      style={{ ...style }}
      onClick={action}
    >
      {title}
    </Button>
  );
};

export default Small_btn;
