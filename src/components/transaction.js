import React from "react";

class Transaction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div class="ground ground-list-single">
        <div class="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center bg-light-success">
          <div class="position-absolute text-success h5 mb-0">
            <i class="fas fa-arrow-up"></i>
          </div>
        </div>

        <div class="ground-content">
          <h6>
            <a href="#">Maryam Amiri</a>
          </h6>
          <small class="text-fade">New User Enrolled in Python</small>
          <span class="small">Just Now</span>
        </div>
      </div>
    );
  }
}

export default Transaction;
