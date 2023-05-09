import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import { email_regex, to_title } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
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
import { categories, means_of_id } from "./Become_a_vendor";

class User_verification extends handle_file_upload {
  constructor(props) {
    super(props);

    this.state = {
      director: new Object(),
    };
  }

  componentDidMount = () => {
    let loggeduser = get_session("loggeduser");
    if (!loggeduser || (loggeduser && loggeduser.kyc_docs))
      return window.history.go(-1);

    this.setState({
      categories,
      render: !!loggeduser,
    });
  };

  is_set = () => {
    let { attest, address, ID_type, bio, picture, picture_oversize } =
      this.state;

    if (!address || !ID_type || !picture || !bio || !attest) return;

    let ID = this.state[ID_type];
    if (!ID) return;

    if (picture_oversize || this.state[`${ID_type}_oversize`]) return;

    return true;
  };

  set_ID_type = (means) =>
    this.setState({
      ID_type: means,
    });

  submit = async () => {
    let { loading, address, ID_type, picture, bio, picture_filename, website } =
      this.state;
    if (loading) return;

    this.setState({ loading: true });

    let ID = this.state[ID_type];
    let ID_filename = this.state[`${ID_type}_filename`];

    let documents = {
      address,
      bio,
      picture,
      website,
      user: this.loggeduser._id,
      id_type: ID_type,
      ID,
      ID_filename,
      picture_filename,
    };

    let res = await post_request("user_verification_request", documents);
    if (res?._id) {
      this.setState({ details: res });

      this.loggeduser.kyc_docs = res._id;
      this.loggeduser.kyc_verified = "pending";
      this.set_loggeduser(this.loggeduser, () =>
        this.setState({ loading: false }, () =>
          window.location.assign(`${client_domain}/dashboard`)
        )
      );
    } else
      this.setState({ message: res?.message || "Err, something went wrong." });
  };

  toggle_success_modal = () => this.success_modal.toggle();

  logo_maxsize = 3 * 1024 ** 2;

  render() {
    let {
      render,
      picture_filename,
      ID_type,
      address,
      attest,
      loading,
      bio,
      picture_oversize,
      website,
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
                                    <h4>User Verification</h4>
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
                                    Basic Information
                                  </h4>
                                </div>

                                <div className="form-group mx-3 mt-3">
                                  <label>
                                    About Yourself
                                    <span className="text-danger"> *</span>
                                  </label>

                                  <textarea
                                    value={bio}
                                    rows="10"
                                    className="form-control"
                                    placeholder="Write here..."
                                    onChange={({ target }) =>
                                      this.setState({
                                        bio: target.value,
                                        message: "",
                                      })
                                    }
                                    // error_message="Tell us about yourself"
                                    important
                                  ></textarea>
                                </div>
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

                                <File_input
                                  title="Profile Picture"
                                  action={(e) =>
                                    this.handle_file(
                                      e,
                                      "picture",
                                      this.logo_maxsize
                                    )
                                  }
                                  important
                                  accept="image/*"
                                  info="Type: Image, Maxsize: 3MB"
                                  error_message={
                                    picture_oversize ? "Too large" : ""
                                  }
                                  filename={picture_filename}
                                />
                                <hr />

                                <Form_divider text="identification details" />

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
                                    info="Type: PDF, Maxsize: 3MB"
                                    error_message={
                                      this.state[`${ID_type}_oversize`]
                                        ? "Too large"
                                        : ""
                                    }
                                  />
                                ) : null}

                                <hr />

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

export default User_verification;
