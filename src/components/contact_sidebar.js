import React from "react";

class Contact_sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
        <div className="lmp_caption pl-lg-5">
          <ol className="list-unstyled p-0">
            <li className="d-flex align-items-start my-3 my-md-4">
              <div className="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg-light">
                <div className="position-absolute theme-cl h5 mb-0">
                  <i className="fas fa-home"></i>
                </div>
              </div>
              <div className="ml-3 ml-md-4">
                <h4>Reach Us</h4>
                <h6>Ikeja - Head Office</h6>
                <p>
                  18, Afolabi Aina Street,
                  <br />
                  Allen Avenue, Ikeja, Lagos.
                  <br />
                </p>
              </div>
            </li>
            <li className="d-flex align-items-start my-3 my-md-4">
              <div className="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg-light">
                <div className="position-absolute theme-cl h5 mb-0">
                  <i className="fas fa-at"></i>
                </div>
              </div>
              <div className="ml-3 ml-md-4">
                <h4>Drop A Mail</h4>
                <p>
                  <a href="mailto://voucherafrica@digitaladplanet.com">
                    voucherafrica@digitaladplanet.com
                  </a>
                  {/* <br />
                  <a href="mailto://admissions@voucherafrica.com">
                    admin@voucherafrica.com
                  </a> */}
                </p>
              </div>
            </li>
            <li className="d-flex align-items-start my-3 my-md-4">
              <div className="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg-light">
                <div className="position-absolute theme-cl h5 mb-0">
                  <i className="fas fa-phone-alt"></i>
                </div>
              </div>
              <div className="ml-3 ml-md-4">
                <h4>Make a Call</h4>
                <p>
                  +(234) 911 597 6423
                  <br />
                  +(234) 809 944 1722
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    );
  }
}

export default Contact_sidebar;
