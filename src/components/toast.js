import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

class Toaster extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { title, message } = this.props;

    return (
      <ToastContainer className="p-3" position={"bottom-end"}>
        <Toast show={true}>
          <Toast.Header closeButton={false}>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{title}</strong>
            {/* <small>11 mins ago</small> */}
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    );
  }
}

export default Toaster;
