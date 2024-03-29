import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import {
  email_regex,
  special_chars,
  to_title,
} from "../assets/js/utils/functions";
import { get_request, post_request } from "../assets/js/utils/services";
import Checkbox from "../components/checkbox";
import File_input from "../components/file_input";
import Form_divider from "../components/form_divider";
import handle_file_upload from "../components/handle_file_upload";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Text_input from "../components/text_input";
import { Loggeduser } from "../Contexts";
import Footer, { get_session } from "../sections/footer";
import Nav from "../sections/nav";
import Listempty from "../components/listempty";

const means_of_id = new Array(
  "international_passport",
  "driver_license",
  "national_id",
  "voters_card"
);

const categories = new Array(
  "Digital service",
  "Education",
  "Entertainment",
  "Construction and Engineering",
  "Travel and Tourism",
  "Housing",
  "Groceries",
  "Electronics",
  "Household Item",
  "Clothing and Fashion",
  "Event and Movies",
  "Spa and Relaxation",
  "Transport",
  "Health",
  "Financial",
  "Business Services",
  "Cooperate service",
  "Artisan service"
)
  .sort((a, b) => a > b)
  .map((cat) => new Object({ _id: cat, title: cat }));

class Become_a_vendor extends handle_file_upload {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      director: new Object(),
    };
  }

  set_director = (loggeduser) => {
    loggeduser = loggeduser || this.loggeduser;

    this.setState({
      director: {
        email: loggeduser.email,
        firstname: loggeduser.firstname,
        lastname: loggeduser.lastname,
      },
    });
  };

  componentDidMount = async () => {
    let loggeduser = get_session("loggeduser");

    if (!loggeduser) {
      let search = window.location.search.split("=")[1];
      if (search && search.startsWith("users~"))
        loggeduser = await get_request(`user/${search}`);
    }

    if (loggeduser) {
      if (loggeduser.vendor) {
        return window.location.assign(
          `${client_domain}/vendor?${loggeduser.vendor}`
        );
      }

      this.setState({ render: true }, () => {
        if (!this.loggeduser) {
          try {
            this.login(loggeduser);
            this.set_director(loggeduser);
          } catch (e) {}
        } else this.set_director();
      });
    } else {
      window.sessionStorage.setItem("redirect", window.location.href);
      window.location.assign(`${client_domain}/login`);
    }

    this.setState({
      categories,
    });
  };

  is_set = () => {
    let {
      director,
      attest,
      rc_number,
      category,
      name,
      email,
      address,
      ID_type,
      description,
      logo,
      cac,
      cac_oversize,
      logo_oversize,
    } = this.state;

    if (
      !rc_number ||
      !name.replace(special_chars, "").trim() ||
      !email_regex.test(email) ||
      !address ||
      !ID_type ||
      !logo ||
      !category ||
      !description ||
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

    if (cac_oversize || logo_oversize || this.state[`${ID_type}_oversize`])
      return;

    return true;
  };

  set_category = ({ target }) => this.setState({ category: target.value });

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
      category,
      description,
      cac_filename,
      logo_filename,
      website,
    } = this.state;
    if (loading || !this.is_set()) return;

    this.setState({ loading: true });

    let ID = this.state[ID_type];
    let ID_filename = this.state[`${ID_type}_filename`];

    let res = await this.check_name();

    if (!res?.available)
      return this.setState({
        loading: false,
        message: "Vendor name has been taken",
      });
    name = name.trim().replace(special_chars, "");

    let documents = {
      director,
      rc_number,
      name,
      uri: name.toLowerCase().replace(/ /g, "_"),
      email,
      category,
      address,
      description,
      logo,
      website,
      cac,
      user: this.loggeduser._id,
      id_type: ID_type,
      ID,
      ID_filename,
      cac_filename,
      logo_filename,
    };

    res = await post_request("request_to_become_a_vendor", documents);
    if (res?._id) {
      this.setState({ details: res });

      this.loggeduser.vendor = res._id;
      this.loggeduser.vendor_uri = documents.uri;
      this.loggeduser.vendor_status = "pending";
      this.set_loggeduser(this.loggeduser, () =>
        this.setState({ loading: false }, () =>
          window.location.assign(`${client_domain}/vendor?${res.uri}`)
        )
      );
    } else
      this.setState({
        message: res?.message || "Cannot create vendor profile at the moment",
      });
  };

  toggle_success_modal = () => this.success_modal.toggle();

  logo_maxsize = 3 * 1024 ** 2;

  check_name = async () => {
    let { name } = this.state;
    name = name.trim().replace(special_chars, "");

    let res = await post_request("vendor_availability", {
      uri: name.toLowerCase().replace(/ /g, "_"),
    });

    if (!res?.available)
      this.setState({ name_error: "Vendor name has been taken" });
    return res;
  };

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
      logo_oversize,
      website,
      cac_oversize,
      categories,
      name_error,
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
                                  on_blur={this.check_name}
                                  title="Name"
                                  action={(name) =>
                                    this.setState({
                                      name,
                                      message: "",
                                      name_error: "",
                                    })
                                  }
                                  important
                                  major_err={name_error}
                                  error_message={"Your brand name"}
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
                                  title="about your brand"
                                  placeholder="Write here..."
                                  action={(description) =>
                                    this.setState({
                                      description,
                                      message: "",
                                    })
                                  }
                                  error_message="Tell us about your brand"
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

                                <Text_input
                                  value={website}
                                  title="brand website"
                                  placeholder="https://www.brand.com"
                                  action={(website) =>
                                    this.setState({
                                      website,
                                      message: "",
                                    })
                                  }
                                />

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 form-group smalls">
                                  <label>Category</label>
                                  {categories ? (
                                    categories.length ? (
                                      <div className="simple-input">
                                        <select
                                          id="category"
                                          onChange={this.set_category}
                                          className="form-control"
                                        >
                                          <option value="">
                                            -- Select your brand category --
                                          </option>
                                          {categories.map((category) => (
                                            <option
                                              key={category._id}
                                              value={category._id}
                                            >
                                              {to_title(
                                                category.title.replace(
                                                  /_/g,
                                                  " "
                                                )
                                              )}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    ) : (
                                      <Listempty text="Cannot get categories." />
                                    )
                                  ) : (
                                    <Loadindicator smalls />
                                  )}
                                </div>

                                <File_input
                                  title="logo"
                                  action={(e) =>
                                    this.handle_file(
                                      e,
                                      "logo",
                                      this.logo_maxsize
                                    )
                                  }
                                  important
                                  accept="image/*"
                                  info="Type: Image, Maxsize: 3MB"
                                  error_message={
                                    logo_oversize ? "Too large" : ""
                                  }
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
                                    action={(e) =>
                                      this.handle_file(
                                        e,
                                        ID_type,
                                        this.logo_maxsize
                                      )
                                    }
                                    filename={ID_filename}
                                    important
                                    accept="image/*,.doc,.pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    info="Type: PDF, Image, Maxsize: 3MB"
                                    error_message={
                                      this.state[`${ID_type}_oversize`]
                                        ? "Too large"
                                        : ""
                                    }
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
                                  action={(e) =>
                                    this.handle_file(
                                      e,
                                      "cac",
                                      this.logo_maxsize
                                    )
                                  }
                                  filename={cac_filename}
                                  important
                                  accept="image/*,.doc,.pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                  info="Type: PDF, Image, Maxsize: 3MB"
                                  error_message={
                                    cac_oversize ? "Too large" : ""
                                  }
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
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Become_a_vendor;
export { categories, means_of_id };
