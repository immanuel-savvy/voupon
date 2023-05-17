import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../assets/js/utils/functions";
import { domain, get_request, post_request } from "../assets/js/utils/services";
import Alert_box from "../components/alert_box";
import Handle_file_upload from "../components/handle_file_upload";
import Loadindicator from "../components/loadindicator";
import Modal from "../components/modal";
import Padder from "../components/padder";
import Section_header from "../components/section_headers";
import Vendor_header from "../components/vender_header";
import You_need_to_be_a_vendor from "../components/you_need_to_be_a_vendor";
import { Loggeduser } from "../Contexts";
import Footer, { get_session } from "../sections/footer";
import Custom_Nav from "../sections/nav";
import { emitter } from "../Voupon";
import { categories } from "./Become_a_vendor";

class Create_offer_voucher extends Handle_file_upload {
  constructor(props) {
    super(props);

    let { voucher } = this.props;

    if (window.location.pathname === "/edit_offer_voucher")
      voucher = voucher || get_session("voucher_in_edit");

    this.state = {
      current_pill: "basic",
      what_to_expect: new Array(),
      things_to_know: new Array(),
      images: new Array(),
      ...voucher,
      learn_index: null,
      requirement_index: null,
      vendor: null,
      duration: voucher && new Date(voucher.duration),
      price: (voucher && voucher.value) || "",
    };
  }

  tab_pills = new Array("basic", "pricing", "media", "meta_info", "finish");

  you_need_to_be_a_vendor = () => this.need_to_be_vendor?.toggle();

  componentDidMount = async () => {
    this.loggeduser = this.loggeduser || get_session("loggeduser");

    if (!this.loggeduser || (this.loggeduser && !this.loggeduser.vendor))
      return this.you_need_to_be_a_vendor();

    let vendor = get_session("vendor");
    if (!vendor || (vendor && vendor._id !== this.loggeduser.vendor)) {
      vendor = await get_request(`vendor/${this.loggeduser.vendor}`);

      if (!vendor || (vendor && !vendor._id))
        return this.you_need_to_be_a_vendor();
    }

    if (vendor && vendor.suspended) return window.history.go(-1);

    this.setState({ vendor });
  };

  important_fields = new Array(
    "title",
    "category",
    "price",
    "short_description",
    "images"
  );

  is_set = () => {
    let { short_description, title, price, images } = this.state;
    return !!(short_description && title && Number(price) > 0 && images.length);
  };

  render_tab_pills = () => {
    let { current_pill, _id } = this.state;

    return this.tab_pills.map((pill) => (
      <button
        key={pill}
        className={pill === current_pill ? "nav-link active" : "nav-link"}
        id={`v-pills-${pill}-tab`}
        data-toggle="pill"
        data-target={`#v-pills-${pill}`}
        type="button"
        role="tab"
        aria-controls={`v-pills-${pill}`}
        aria-selected={pill === current_pill ? "true" : "false"}
        onClick={() =>
          this.setState(
            { current_pill: pill },
            pill === "finish" ? this.on_finish : null
          )
        }
      >
        {_id && pill === "finish"
          ? "Finish Edit"
          : to_title(pill.replace(/_/g, " "))}
      </button>
    ));
  };

  handle_course = () => {
    let { new_voucher: voucher } = this.state;
    window.sessionStorage.setItem("voucher", JSON.stringify(voucher));
  };

  finish_tab_panel = () => {
    let { uploading_voucher, new_voucher, vendor } = this.state;

    return (
      <div
        className={
          this.state.current_pill === "finish"
            ? "tab-pane fade show active"
            : "tab-pane fade"
        }
        id="v-pills-finish"
        role="tabpanel"
        aria-labelledby="v-pills-finish-tab"
      >
        {!this.is_set() && !new_voucher ? (
          <>
            {this.important_fields.map((field_prop) => {
              let field = this.state[field_prop];
              if (Array.isArray(field)) {
                if (!field.length)
                  return (
                    <Alert_box
                      message={`${to_title(
                        field_prop.replace(/_/g, " ")
                      )} is Important`}
                    />
                  );
              } else if (!field)
                return (
                  <Alert_box
                    message={`${to_title(
                      field_prop.replace(/_/g, " ")
                    )} is Important`}
                  />
                );
            })}
          </>
        ) : !uploading_voucher ? (
          <div className="succ_wrap">
            {message ? (
              <Alert_box message={message} />
            ) : (
              <>
                <div className="succ_121">
                  <i className="fas fa-thumbs-up"></i>
                </div>
                <div className="succ_122">
                  <h4>Voucher Successfully Added</h4>
                  <p>{new_voucher?.short_description}</p>
                </div>
                <div className="succ_123">
                  <Link to={`/voucher?${new_voucher?._id}&${vendor?._id}`}>
                    <span
                      onClick={this.handle_course}
                      className="btn theme-bg text-white"
                    >
                      View Voucher
                    </span>
                  </Link>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center my-5">
            <Loadindicator text="loading..." />
          </div>
        )}
        {this.pill_nav("finish")}
      </div>
    );
  };

  pill_nav = (pill) => {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <ul className="alios_slide_nav">
          <li>
            <a
              href="#"
              onClick={pill === "basic" ? null : () => this.prev_pill(pill)}
              className={
                pill === "basic" ? "btn btn_slide disabled" : "btn btn_slide"
              }
            >
              <i className="fas fa-arrow-left"></i>
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={
                pill === "finish" || (pill === "media" && !this.is_set())
                  ? null
                  : () => this.next_pill(pill)
              }
              className={
                pill === "finish" || (pill === "media" && !this.is_set())
                  ? "btn btn_slide disabled"
                  : "btn btn_slide"
              }
            >
              <i className="fas fa-arrow-right"></i>
            </a>
          </li>
        </ul>
      </div>
    );
  };

  next_pill = (pill) => {
    let current_pill_index = this.tab_pills.findIndex((p) => p === pill);

    current_pill_index < this.tab_pills.length - 1 &&
      this.setState(
        { current_pill: this.tab_pills[current_pill_index + 1] },
        pill === "media" ? this.on_finish : null
      );
  };

  prev_pill = (pill) => {
    let current_pill_index = this.tab_pills.findIndex((p) => p === pill);
    current_pill_index &&
      this.setState({ current_pill: this.tab_pills[current_pill_index - 1] });
  };

  add_to_learn = (e) => {
    e.preventDefault();
    let { what_you_will_learn_in_edit, learn_index, things_to_know } =
      this.state;

    if (learn_index !== null) {
      things_to_know[learn_index] = what_you_will_learn_in_edit;
      learn_index = null;
    } else
      things_to_know = new Array(
        ...things_to_know,
        what_you_will_learn_in_edit
      );

    this.setState({
      things_to_know,
      learn_index,
      what_you_will_learn_in_edit: "",
    });
  };

  add_requirement = (e) => {
    e.preventDefault();
    let { requirement_in_edit, requirement_index, what_to_expect } = this.state;

    if (requirement_index !== null) {
      what_to_expect[requirement_index] = requirement_in_edit;
      requirement_index = null;
    } else what_to_expect = new Array(...what_to_expect, requirement_in_edit);

    this.setState({
      what_to_expect,
      requirement_index,
      requirement_in_edit: "",
    });
  };

  edit_learn = (index) => {
    let what_you_will_learn_in_edit = this.state.things_to_know[index];
    this.setState({ what_you_will_learn_in_edit, learn_index: index });
  };

  edit_requirement = (index) => {
    let requirement_in_edit = this.state.what_to_expect[index];
    this.setState({ requirement_in_edit, requirement_index: index });
  };

  filter_learn_index = (index) => {
    let { things_to_know } = this.state;
    things_to_know.splice(index, 1);
    this.setState({ things_to_know });
  };

  filter_requirement_index = (index) => {
    let { what_to_expect } = this.state;
    what_to_expect.splice(index, 1);
    this.setState({ what_to_expect });
  };

  meta_info_tab_panel = () => {
    let {
      things_to_know,
      what_to_expect,
      what_you_will_learn_in_edit,
      requirement_in_edit,
      requirement_index,
      learn_index,
      quantities,
      duration,
    } = this.state;

    return (
      <div
        className={
          this.state.current_pill === "meta_info"
            ? "tab-pane fade show active"
            : "tab-pane fade"
        }
        id="v-pills-meta_info"
        role="tabpanel"
        aria-labelledby="v-pills-meta_info-tab"
      >
        <div className="form-group smalls">
          <label>Voucher Duration</label>
          <input
            type="date"
            className="form-control"
            placeholder="Select"
            value={duration}
            onChange={({ target }) => this.setState({ duration: target.value })}
          />
        </div>

        <div className="form-group smalls">
          <label>Quantities</label>
          <input
            type="number"
            className="form-control"
            placeholder="Quantities"
            value={quantities}
            onChange={({ target }) =>
              this.setState({ quantities: target.value })
            }
          />
        </div>

        <div className="form-group smalls">
          <label>What to Expect</label>
          <input
            type="text"
            className="form-control"
            placeholder="Type..."
            value={requirement_in_edit}
            onChange={({ target }) =>
              this.setState({ requirement_in_edit: target.value })
            }
          />
          {requirement_in_edit ? (
            <a
              onClick={this.add_requirement}
              href="#"
              class="btn theme-bg text-light mt-2"
            >
              {requirement_index === null ? "Add" : "Update"}
            </a>
          ) : null}
        </div>
        {what_to_expect.length ? (
          <ul class="simple-list p-0">
            {what_to_expect.map((requirement, i) => (
              <li key={i}>
                {requirement}{" "}
                <span
                  className="px-2"
                  onClick={() => this.filter_requirement_index(i)}
                >
                  <i className={`fa fa-trash`}></i>
                </span>
                <span className="px-2" onClick={() => this.edit_requirement(i)}>
                  <i className={`fa fa-edit`}></i>
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        {what_to_expect.length ? <br /> : null}
        <div className="form-group smalls">
          <label>Things to know</label>
          <input
            type="text"
            className="form-control"
            placeholder="What you will learn..."
            value={what_you_will_learn_in_edit}
            onChange={({ target }) =>
              this.setState({ what_you_will_learn_in_edit: target.value })
            }
          />
          {what_you_will_learn_in_edit ? (
            <a
              onClick={this.add_to_learn}
              href="#"
              class="btn theme-bg text-light mt-2"
            >
              {learn_index === null ? "Add" : "Update"}
            </a>
          ) : null}
        </div>

        {things_to_know.length ? (
          <div class="edu_wraper">
            <h4 class="edu_title">Things to Know</h4>
            <ul class="lists-3 row">
              {things_to_know.map((learn, i) => (
                <li key={i} class="col-xl-4 col-lg-6 col-md-6 m-0">
                  <span>
                    {learn}{" "}
                    <span
                      className="px-2"
                      onClick={() => this.filter_learn_index(i)}
                    >
                      <i className={`fa fa-trash`}></i>
                    </span>
                    <span className="px-2" onClick={() => this.edit_learn(i)}>
                      <i className={`fa fa-edit`}></i>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  };

  basic_tab_panel = () => {
    return (
      <div
        className={
          this.state.current_pill === "basic"
            ? "tab-pane fade show active"
            : "tab-pane fade"
        }
        id="v-pills-basic"
        role="tabpanel"
        aria-labelledby="v-pills-basic-tab"
      >
        <div className="form-group smalls">
          <label>Voucher Title*</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Voucher Title"
            onChange={({ target }) => this.setState({ title: target.value })}
            value={this.state.title}
          />
        </div>

        <div className="form-group smalls">
          <label>Short Description*</label>
          <input
            onChange={({ target }) =>
              this.setState({ short_description: target.value })
            }
            value={this.state.short_description}
            type="text"
            className="form-control"
          />
        </div>

        <div className="form-group smalls">
          <label>Category</label>

          <div className="simple-input">
            <select
              id="Category"
              onChange={({ target }) =>
                this.setState({ category: target.value })
              }
              className="form-control"
            >
              <option value="">-- Select Offer Category --</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {to_title(category.title.replace(/_/g, " "))}
                </option>
              ))}
            </select>
          </div>
        </div>

        {this.pill_nav("basic")}
      </div>
    );
  };

  handle_price = ({ target }) => this.setState({ price: target.value });

  pricing_tab_panel = () => {
    let { price, actual_price } = this.state;

    return (
      <div
        className={
          this.state.current_pill === "pricing"
            ? "tab-pane fade show active"
            : "tab-pane fade"
        }
        id="v-pills-pricing"
        role="tabpanel"
        aria-labelledby="v-pills-pricing-tab"
      >
        <div className="form-group smalls">
          <label>Voucher Price(&#8358;) *</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Voucher Price"
            value={price}
            onChange={this.handle_price}
          />
        </div>

        <div className="form-group smalls">
          <label>Service Actual Price(&#8358;)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Voucher Price"
            value={actual_price}
            onChange={({ target }) =>
              this.setState({ actual_price: target.value })
            }
          />
        </div>

        {this.pill_nav("pricing")}
      </div>
    );
  };

  handle_images = async (e) => {
    this.handle_file(e, null, null, () => {
      let { file, images, filename, file_hash } = this.state;

      images = new Array({ url: file, file_hash, filename }, ...images);

      this.setState({ images });
    });
  };

  remove_image = (img) => {
    let { images } = this.state;

    images = images.filter((image) => {
      return image.url !== img.url && image.filename !== img.filename;
    });
    this.setState({ images });
  };

  media_tab_panel = () => {
    let { images } = this.state;

    return (
      <div
        className={
          this.state.current_pill === "media"
            ? "tab-pane fade show active"
            : "tab-pane fade"
        }
        id="v-pills-media"
        role="tabpanel"
        aria-labelledby="v-pills-media-tab"
      >
        <div className="form-group smalls">
          <label>Video URL</label>
          <input
            type="text"
            className="form-control"
            placeholder="https://www.youtube.com/watch?v=ExXhmuH-cw8"
            value={this.state.video}
            onChange={({ target }) => this.setState({ video: target.value })}
          />
        </div>

        <div className="form-group smalls">
          <label>Image (1200 x 800)*</label>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              accept="image/*"
              onChange={this.handle_images}
            />
            <label className="custom-file-label" for="customFile">
              Choose file
            </label>
          </div>
          <div style={{ overflow: "scroll" }}>
            {images.map(({ url, filename }) => (
              <span>
                <img
                  className="py-3 rounded"
                  style={{ maxHeight: 200, maxWidth: 200, marginRight: 10 }}
                  src={
                    url && url.startsWith("data")
                      ? url
                      : `${domain}/images/${url}`
                  }
                />
                <a
                  onClick={() => this.remove_image({ url, filename })}
                  className="btn btn-action"
                >
                  <i className={`fas fa-window-close`}></i>
                </a>
              </span>
            ))}
          </div>
        </div>

        {this.pill_nav("media")}
      </div>
    );
  };

  set_instructor = ({ target }) => {
    let { instructors } = this.state;

    this.setState({
      instructor: target.value,
      instructor_full: instructors.find(
        (instruct) => instruct._id === target.value
      ),
    });
  };

  on_finish = async () => {
    this.setState({ uploading_voucher: true });
    let {
      short_description,
      title,
      price,
      video,
      what_to_expect,
      things_to_know,
      _id,
      actual_price,
      duration,
      quantities,
      images,
      category,
      vendor,
      loading,
    } = this.state;

    if (!this.is_set() || loading) return;

    this.setState({ loading: true });

    if (vendor.suspended)
      return this.setState({
        message: "Vendor account is on suspension",
        loading: false,
        uploading_voucher: false,
      });

    let voucher = {
      short_description,
      title,
      value: Number(price),
      video,
      images,
      category,
      quantities,
      actual_price: Number(actual_price) || null,
      vendor: vendor._id,
      duration: new Date(duration || Date.now()).getTime(),
    };
    if (things_to_know.length) voucher.things_to_know = things_to_know;
    if (what_to_expect.length) voucher.what_to_expect = what_to_expect;

    let response;
    if (_id) {
      voucher._id = _id;
      response = await post_request("update_voucher", voucher);
      voucher.images = response.images;
    } else {
      response = await post_request("create_offer_voucher", voucher);
      voucher.images = response.images;
      voucher._id = response._id;
      voucher.created = response.created;
    }
    if (response?._id) {
      this.setState({ new_voucher: voucher });

      emitter.emit(_id ? "voucher_updated" : "new_voucher", {
        ...voucher,
      });
      this.reset_state();
    }
  };

  reset_state = () =>
    this.setState({
      short_description: "",
      image: "",
      video: "",
      price: "",
      title: "",
      uploading_voucher: false,
      quantities: "",
      sections: new Array(),
      what_to_expect: new Array(),
      things_to_know: new Array(),
    });

  render() {
    let { vendor } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          return (
            <div id="main-wrapper">
              <Custom_Nav />
              <Padder />

              {vendor ? (
                <>
                  <Vendor_header vendor={vendor} />
                  <div className="container">
                    <Section_header
                      title="Create Offer Voucher"
                      description="Allow customers access to your service(s) and keep track of sales record all by yourself"
                    />

                    <div className="row">
                      <div className="col-12">
                        <div className="row">
                          <div className="col-xl-12 col-lg-12 col-md-12">
                            <div className="dashboard_wrap">
                              <div className="form_blocs_wrap">
                                <form>
                                  <div className="row justify-content-between">
                                    <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12">
                                      <div
                                        className="nav flex-column nav-pills me-3"
                                        id="v-pills-tab"
                                        role="tablist"
                                        aria-orientation="vertical"
                                      >
                                        {this.render_tab_pills()}
                                      </div>
                                    </div>
                                    <div className="col-xl-9 col-lg-8 col-md-7 col-sm-12">
                                      <div
                                        className="tab-content"
                                        id="v-pills-tabContent"
                                      >
                                        {this.basic_tab_panel()}
                                        {this.pricing_tab_panel()}
                                        {this.media_tab_panel()}
                                        {this.meta_info_tab_panel()}
                                        {this.finish_tab_panel()}
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Loadindicator />
              )}
              <Footer />

              <Modal
                no_drop_on_backdrop
                ref={(need_to_be_vendor) =>
                  (this.need_to_be_vendor = need_to_be_vendor)
                }
              >
                <You_need_to_be_a_vendor />
              </Modal>
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Create_offer_voucher;
