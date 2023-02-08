import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import { email_regex, to_title } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import Become_a_vender_request from "../components/become_a_vender_request";
import Checkbox from "../components/checkbox";
import File_input from "../components/file_input";
import Form_divider from "../components/form_divider";
import handle_file_upload from "../components/handle_file_upload";
import Loadindicator from "../components/loadindicator";
import Modal from "../components/modal";
import Padder from "../components/padder";
import Text_input from "../components/text_input";
import { Loggeduser } from "../Contexts";
import Footer from "../sections/footer";
import Nav from "../sections/nav";

const means_of_id = new Array(
  "international_passport",
  "driver_license",
  "national_id",
  "voters_card"
);

class Become_a_vendor extends handle_file_upload {
  constructor(props) {
    super(props);

    this.state = {
      director: new Object(),
    };
  }

  set_director = (loggeduser) => {
    loggeduser = loggeduser || this.loggeduser;

    // if (loggeduser.vendor) window.location.assign(`${client_domain}/vendor`);
    // else
    this.setState({
      director: {
        email: loggeduser.email,
        firstname: loggeduser.firstname,
        lastname: loggeduser.lastname,
      },
    });
  };

  componentDidMount = () => {
    let loggeduser = window.sessionStorage.getItem("loggeduser");

    if (loggeduser) {
      this.setState({ render: true }, () => {
        if (!this.loggeduser) {
          try {
            loggeduser = JSON.parse(loggeduser);
            this.login(loggeduser);
            this.set_director(loggeduser);
          } catch (e) {}
        } else this.set_director();
      });
    } else {
      window.sessionStorage.setItem("redirect", window.location.href);
      window.location.assign(`${client_domain}/login`);
    }
  };

  is_set = () => {
    let {
      director,
      attest,
      rc_number,
      name,
      email,
      address,
      ID_type,
      description,
      logo,
      cac,
    } = this.state;

    if (
      !rc_number ||
      !name ||
      !email_regex.test(email) ||
      !address ||
      !ID_type ||
      !logo ||
      description ||
      !cac ||
      !attest
    )
      return;

    if (
      !director.firstname ||
      !director.lastname ||
      !email_regex.test(director.email)
    )
      return;
    let ID = this.state[ID_type];
    if (!ID) return;

    return true;
  };

  set_ID_type = (means) =>
    this.setState({
      ID_type: means,
    });

  submit = async () => {
    let {
      director,
      loading,
      rc_number,
      name,
      email,
      address,
      ID_type,
      logo,
      cac,
      description,
      cac_filename,
      logo_filename,
    } = this.state;
    if (loading) return;

    this.setState({ loading: true });

    let ID = this.state[ID_type];
    let ID_filename = this.state[`${ID_type}_filename`];

    let documents = {
      director,
      rc_number,
      name,
      email,
      address,
      description,
      logo,
      cac,
      user: this.loggeduser._id,
      id_type: ID_type,
      ID,
      ID_filename,
      cac_filename,
      logo_filename,
    };

    let res = await post_request("request_to_become_a_vendor", documents);
    if (res._id) {
      this.setState({ details: res }, this.toggle_success_modal);

      this.loggeduser.vendor = res._id;
      this.loggeduser.vendor_status = "pending";
      this.set_loggeduser(this.loggeduser);
    } else this.setState({ message: res.message });

    this.setState({ loading: false }, () =>
      window.location.assign(`${client_domain}/vendor`)
    );
  };

  toggle_success_modal = () => this.success_modal.toggle();

  render() {
    let {
      render,
      director,
      cac_filename,
      logo_filename,
      name,
      email,
      ID_type,
      address,
      attest,
      loading,
      rc_number,
      description,
      details,
    } = this.state;

    let ID_filename = this.state[`${ID_type}_filename`];

    return (
      <Loggeduser.Consumer>
        {({ loggeduser, set_loggeduser }) => {
          this.loggeduser = loggeduser;
          this.set_loggeduser = set_loggeduser;

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
                                <Text_input
                                  value={name}
                                  title="Name"
                                  action={(name) =>
                                    this.setState({
                                      name,
                                      message: "",
                                    })
                                  }
                                  important
                                  error_message="Your brand name"
                                />

                                <Text_input
                                  value={email}
                                  type="email"
                                  title="email"
                                  action={(email) =>
                                    this.setState({
                                      email,
                                      message: "",
                                    })
                                  }
                                  important
                                  error_message="Your brand email"
                                />

                                <Text_input
                                  value={description}
                                  title="description"
                                  action={(description) =>
                                    this.setState({
                                      description,
                                      message: "",
                                    })
                                  }
                                  important
                                />

                                <Text_input
                                  value={address}
                                  title="address"
                                  action={(address) =>
                                    this.setState({
                                      address,
                                      message: "",
                                    })
                                  }
                                  important
                                />

                                <File_input
                                  title="logo"
                                  action={(e) => this.handle_file(e, "logo")}
                                  important
                                  accept="image/*"
                                  filename={logo_filename}
                                />
                                <hr />

                                <Form_divider text="director details" />

                                <Text_input
                                  value={director.firstname}
                                  title="firstname"
                                  action={(firstname) =>
                                    this.setState({
                                      director: {
                                        ...this.state.director,
                                        firstname,
                                      },
                                      message: "",
                                    })
                                  }
                                  important
                                  error_message="Director firstname"
                                />
                                <Text_input
                                  value={director.lastname}
                                  title="lastname"
                                  action={(lastname) =>
                                    this.setState({
                                      director: {
                                        ...this.state.director,
                                        lastname,
                                      },
                                      message: "",
                                    })
                                  }
                                  important
                                  error_message="Director lastname"
                                />
                                <Text_input
                                  value={director.email}
                                  title="email"
                                  action={(email) =>
                                    this.setState({
                                      director: {
                                        ...this.state.director,
                                        email,
                                      },
                                      message: "",
                                    })
                                  }
                                  important
                                  error_message="Director email"
                                />

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

                                  {ID_type ? null : (
                                    <span className="text-danger">
                                      * Select an ID Type
                                    </span>
                                  )}
                                </div>

                                {ID_type ? (
                                  <File_input
                                    title={to_title(ID_type.replace(/_/g, " "))}
                                    action={(e) => this.handle_file(e, ID_type)}
                                    filename={ID_filename}
                                    important
                                    accept=".doc,.pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                  />
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
                                <File_input
                                  title="Certification of Incorporation"
                                  action={(e) => this.handle_file(e, "cac")}
                                  filename={cac_filename}
                                  important
                                  accept=".doc,.pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                />

                                <Text_input
                                  value={rc_number}
                                  title="RC Number"
                                  action={(rc_number) =>
                                    this.setState({
                                      rc_number,
                                      message: "",
                                    })
                                  }
                                  important
                                />

                                <Checkbox
                                  title={
                                    "I hereby declare that the information provided in this form is accurate and complete. I confirm that any information is found incorrect and/or incomplete that leads a violation of regulations may initiate legal actions, and I accept that I am the responsible party for any and all charges, penalties and violations."
                                  }
                                  checked={attest}
                                  _id="attest"
                                  no_capitalise
                                  action={() =>
                                    this.setState({
                                      attest: !this.state.attest,
                                    })
                                  }
                                />

                                <div className="form-group">
                                  {loading ? (
                                    <Loadindicator />
                                  ) : (
                                    <button
                                      type="button"
                                      className={
                                        this.is_set()
                                          ? "btn full-width btn-md theme-bg text-white"
                                          : "btn full-width btn-md grey text-dark"
                                      }
                                      onClick={this.submit}
                                    >
                                      Submit
                                    </button>
                                  )}
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

              <Modal
                ref={(success_modal) => (this.success_modal = success_modal)}
              >
                <Become_a_vender_request
                  details={details}
                  no_drop_on_backdrop
                  toggle={this.toggle_success_modal}
                />
              </Modal>
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Become_a_vendor;
