import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../assets/js/utils/functions";
import { domain, get_request, post_request } from "../assets/js/utils/services";
import Alert_box from "../components/alert_box";
import Handle_file_upload from "../components/handle_file_upload";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Section_header from "../components/section_headers";
import Vendor_header from "../components/vender_header";
import Footer, { get_session } from "../sections/footer";
import Custom_Nav from "../sections/nav";
import { emitter } from "../Voupon";
import { categories } from "./Become_a_vendor";

class Create_event extends Handle_file_upload {
  constructor(props) {
    super(props);

    let { event } = this.props;

    if (window.location.pathname === "/edit_event")
      event = event || get_session("event_in_edit");

    this.state = {
      current_pill: "basic",
      what_to_expect: new Array(),
      things_to_know: new Array(),
      learn_index: null,
      requirement_index: null,
      images: new Array(),
      ...event,
      price: (event && event.value) || "",
      event_date_time: event && new Date(event.event_date_time),
    };
  }

  tab_pills = new Array("basic", "pricing", "media", "meta_info", "finish");

  componentDidMount = async () => {
    this.loggeduser = this.loggeduser || get_session("loggeduser");

    if (!this.loggeduser || (this.loggeduser && !this.loggeduser.vendor))
      return window.history.go(-1);

    let vendor = get_session("vendor");
    if (!vendor || (vendor && vendor._id !== this.loggeduser.vendor)) {
      vendor = await get_request(`vendor/${this.loggeduser.vendor}`);

      if (!vendor || (vendor && vendor._id)) return window.history.go(-1);
    }

    this.setState({ vendor });
  };

  important_fields = new Array(
    "title",
    "event_date_time",
    "category",
    "duration",
    "short_description",
    "images"
  );

  is_set = () => {
    let { short_description, title, price, images } = this.state;
    return !!(short_description && title && Number(price) > 0 && images.length);
  };

  render_tab_pills = () => {
    let { current_pill, _id } = this.state;

    return this.tab_pills.map((pill) =>
      _id && pill === this.tab_pills[1] ? null : (
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
      )
    );
  };

  handle_course = () => {
    let { new_event: event } = this.state;
    window.sessionStorage.setItem("event", JSON.stringify(event));
  };

  finish_tab_panel = () => {
    let { uploading_voucher, new_event } = this.state;

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
        {!this.is_set() && !new_event ? (
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
            <div className="succ_121">
              <i className="fas fa-thumbs-up"></i>
            </div>
            <div className="succ_122">
              <h4>Event Successfully Added</h4>
              <p>{new_event?.short_description}</p>
            </div>
            <div className="succ_123">
              <Link to="/event">
                <span
                  onClick={this.handle_course}
                  className="btn theme-bg text-white"
                >
                  View Event
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center my-5">
            <Loadindicator />
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
      requirement_in_edit,
      requirement_index,
      duration,
      event_date_time,
      location,
      what_to_expect,
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
          <label>Event Date and Time</label>
          <input
            type="datetime-local"
            className="form-control"
            placeholder="Select"
            value={event_date_time}
            onChange={({ target }) =>
              this.setState({ event_date_time: target.value })
            }
          />
        </div>

        <div className="form-group smalls">
          <label>Event Duration (in minutes)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Select"
            value={duration}
            onChange={({ target }) => this.setState({ duration: target.value })}
          />
        </div>

        <div className="form-group smalls">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            placeholder="Select"
            value={location}
            onChange={({ target }) => this.setState({ location: target.value })}
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
          <label>Event Title*</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Event Title"
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
          <label>More Description*</label>
          <input
            onChange={({ target }) =>
              this.setState({ more_description: target.value })
            }
            value={this.state.more_description}
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

  handle_check = (value, state_prop) => {
    let arr = this.state[state_prop];
    if (arr.includes(value)) arr = arr.filter((val) => val !== value);
    else arr.push(value);

    this.setState({ [state_prop]: arr });
  };

  schools_checkbox = ({ title, _id }) => (
    <div className="form-group smalls" key={_id}>
      <input
        id={_id}
        className="checkbox-custom"
        name="school"
        type="checkbox"
        checked={this.state.schools.includes(_id)}
        onChange={() => this.handle_check(_id, "schools")}
      />
      <label for={_id} className="checkbox-custom-label">
        {to_title(title.replace(/_/g, " "))}
      </label>
    </div>
  );

  handle_price = ({ target }) => this.setState({ price: target.value });

  pricing_tab_panel = () => {
    let { price, quantity } = this.state;

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
          <label>Ticket Price(&#8358;) *</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Ticket Price"
            value={price}
            onChange={this.handle_price}
          />
        </div>

        <div className="form-group smalls">
          <label>Quantity</label>
          <input
            type="number"
            className="form-control"
            placeholder="Quantity"
            value={quantity}
            onChange={({ target }) => this.setState({ quantity: target.value })}
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
      _id,
      quantity,
      category,
      event_date_time,
      duration,
      images,
      vendor,
      more_description,
      location,
    } = this.state;

    if (!this.is_set()) return;

    this.setState({ loading: true });

    let event = {
      short_description,
      more_description,
      title,
      value: Number(price),
      video,
      images,
      category,
      location,
      event_date_time: new Date(event_date_time).getTime(),
      quantity: Number(quantity) || null,
      vendor: vendor._id,
      duration: Number(duration),
    };
    if (what_to_expect.length) event.what_to_expect = what_to_expect;

    let response;
    if (_id) {
      event._id = _id;
      response = await post_request("update_event", event);
      event.images = response.images;
    } else {
      response = await post_request("create_event", event);
      event.images = response.images;
      event._id = response._id;
      event.created = response.created;
    }
    if (response?._id) {
      this.setState({ new_event: event });

      emitter.emit(_id ? "event_updated" : "new_event", {
        ...event,
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
      sections: new Array(),
      what_to_expect: new Array(),
      things_to_know: new Array(),
    });

  render() {
    let { vendor } = this.state;
    if (!vendor) return <Loadindicator />;

    return (
      <div id="main-wrapper">
        <Custom_Nav />
        <Padder />

        <Vendor_header vendor={vendor} />
        <div className="container">
          <Section_header
            title="Create Event"
            description="Deserunt aute proident excepteur duis officia eiusmod sit do duis commodo fugiat nisi est cillum."
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

        <Footer />
      </div>
    );
  }
}

export default Create_event;
