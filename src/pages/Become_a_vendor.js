import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import { to_title } from "../assets/js/utils/functions";
import Checkbox from "../components/checkbox";
import Handle_file_upload from "../components/handle_file_upload";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import { Loggeduser } from "../Contexts";
import Footer from "../sections/footer";
import Nav from "../sections/nav";

const means_of_id = new Array(
  "international_passport",
  "driver_license",
  "national_id",
  "voters_card"
);

class Become_a_vendor extends Handle_file_upload {
  constructor(props) {
    super(props);

    this.state = {
      director: new Object(),
    };
  }

  componentDidMount = () => {
    let loggeduser = window.sessionStorage.getItem("loggeduser");
    if (loggeduser) {
      this.setState({ render: true }, () => {
        if (!this.loggeduser) {
          try {
            loggeduser = JSON.parse(loggeduser);
            this.login(loggeduser);
            this.setState({
              director: {
                email: loggeduser.email,
                firstname: loggeduser.firstname,
                lastname: loggeduser.lastname,
              },
            });
          } catch (e) {}
        }
      });
    } else {
      window.sessionStorage.setItem("redirect", window.location.href);
      window.location.assign(`${client_domain}/login`);
    }
  };

  set_ID_type = (means) =>
    this.setState({
      ID_type: means,
    });

  render() {
    let {
      render,
      director,
      cac_filename,
      brand_filename,
      ID_filename,
      name,
      email,
      ID_type,
      address,
    } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          return (
            <div>
              <Nav page="become a vendor" />
              <Padder />

              {!render ? (
                <Loadindicator contained />
              ) : (
                <div>
                  <section>
                    <div className="container">
                      <div className="row justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-12 col-sm-12">
                          <form>
                            <div className="crs_log_wrap">
                              <div className="crs_log__thumb">
                                <img
                                  src={require(`../assets/img/vouchers1.png`)}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>

                              <div className="crs_log__caption">
                                <div className="rcs_log_123">
                                  <div className="rcs_ico">
                                    <i className="fas fa-users"></i>
                                  </div>
                                </div>

                                <div className="rcs_log_124">
                                  <div className="Lpo09">
                                    <h4>Register your brand</h4>
                                  </div>
                                </div>

                                <div
                                  style={{
                                    padding: 16,
                                    borderWidth: 1,
                                    borderColor: "#03b97c",
                                    borderStyle: "solid",
                                    borderRadius: 5,
                                    paddingBottom: 5,
                                    marginBottom: 10,
                                  }}
                                >
                                  <h4 style={{ color: "#03b97c" }}>
                                    Brand Information
                                  </h4>
                                </div>
                                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label>Name*</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Brand Name"
                                      value={name}
                                      onChange={({ target }) =>
                                        this.setState({
                                          name: target.value,
                                          message: "",
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label>Email*</label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      placeholder="Email"
                                      value={email}
                                      onChange={({ target }) =>
                                        this.setState({
                                          email: target.value,
                                          message: "",
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label>Address*</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Address"
                                      value={address}
                                      onChange={({ target }) =>
                                        this.setState({
                                          address: target.value,
                                          message: "",
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label>Logo*</label>
                                    <div className="custom-file">
                                      <input
                                        type="file"
                                        className="custom-file-input"
                                        id="customFileBanner"
                                        accept="image/*"
                                        onChange={(e) =>
                                          this.handle_file(e, "brand")
                                        }
                                      />
                                      <label
                                        className="custom-file-label"
                                        for="customFileBanner"
                                      >
                                        {brand_filename || "Choose file"}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <hr />

                                <div
                                  style={{
                                    padding: 16,
                                    borderWidth: 1,
                                    borderColor: "#03b97c",
                                    borderStyle: "solid",
                                    borderRadius: 5,
                                    paddingBottom: 5,
                                    marginBottom: 10,
                                  }}
                                >
                                  <h4 style={{ color: "#03b97c" }}>
                                    Director Details
                                  </h4>
                                </div>

                                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label>Firstname</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Firstname"
                                      value={director.firstname}
                                      onChange={({ target }) =>
                                        this.setState({
                                          director: {
                                            ...this.state.director,
                                            firstname: target.value,
                                          },
                                          message: "",
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label>Lastname</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Lastname"
                                      value={director.lastname}
                                      onChange={({ target }) =>
                                        this.setState({
                                          director: {
                                            ...this.state.director,
                                            lastname: target.value,
                                          },
                                          message: "",
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label>Email</label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      placeholder="Email"
                                      value={director.email}
                                      onChange={({ target }) =>
                                        this.setState({
                                          director: {
                                            ...this.state.director,
                                            email: target.value,
                                          },
                                          message: "",
                                        })
                                      }
                                    />
                                  </div>
                                </div>

                                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label>Means of Identification</label>

                                    {means_of_id.map((means) => {
                                      return (
                                        <Checkbox
                                          type="radio"
                                          title={to_title(
                                            means.replace(/_/g, " ")
                                          )}
                                          key={means}
                                          _id={means}
                                          checked={means === ID_type}
                                          action={(_id) =>
                                            this.set_ID_type(_id)
                                          }
                                          name="director_id_means"
                                        />
                                      );
                                    })}
                                  </div>
                                </div>

                                {ID_type ? (
                                  <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                    <div className="form-group">
                                      <label>
                                        {to_title(ID_type.replace(/_/g, " "))}*
                                      </label>
                                      <div className="custom-file">
                                        <input
                                          type="file"
                                          className="custom-file-input"
                                          id="customFileBanner"
                                          onChange={(e) =>
                                            this.handle_file(e, "ID")
                                          }
                                        />
                                        <label
                                          className="custom-file-label"
                                          for="customFileBanner"
                                        >
                                          {ID_filename || "Choose file"}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                ) : null}

                                <hr />

                                <div
                                  style={{
                                    padding: 16,
                                    borderWidth: 1,
                                    borderColor: "#03b97c",
                                    borderStyle: "solid",
                                    borderRadius: 5,
                                    paddingBottom: 5,
                                    marginBottom: 10,
                                  }}
                                >
                                  <h4 style={{ color: "#03b97c" }}>
                                    Business Registration Details
                                  </h4>
                                </div>
                                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label>
                                      Certification of Incorporation
                                    </label>
                                    <div className="custom-file">
                                      <input
                                        type="file"
                                        className="custom-file-input"
                                        id="customFileBanner"
                                        onChange={(e) =>
                                          this.handle_file(e, "cac")
                                        }
                                      />
                                      <label
                                        className="custom-file-label"
                                        for="customFileBanner"
                                      >
                                        {cac_filename || "Choose file"}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              <Footer />
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Become_a_vendor;
