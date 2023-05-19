import React from "react";
import { Link } from "react-router-dom";
import { commalise_figures, to_title } from "../assets/js/utils/functions";
import { domain, get_request, post_request } from "../assets/js/utils/services";
import Alert_box from "../components/alert_box";
import Checkbox from "../components/checkbox";
import Form_divider from "../components/form_divider";
import Handle_file_upload from "../components/handle_file_upload";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Section_header from "../components/section_headers";
import Vendor_header from "../components/vender_header";
import { Loggeduser } from "../Contexts";
import Footer, { get_session } from "../sections/footer";
import Custom_Nav from "../sections/nav";
import { emitter } from "../Voupon";
import { categories } from "./Become_a_vendor";

const installments = new Array(
  "daily",
  "weekly",
  "monthly",
  "quarterly",
  "annually"
);

class Add_product_et_service extends Handle_file_upload {
  constructor(props) {
    super(props);

    let { product } = this.props;

    if (window.location.pathname === "/edit_product_et_service")
      product = product || get_session("product_in_edit");

    this.state = {
      current_pill: "basic",
      what_to_expect: new Array(),
      things_to_know: new Array(),
      installments: new Array(),
      images: new Array(),
      payment_types: new Array(this.payment_types[0]),
      ...product,
      learn_index: null,
      requirement_index: null,
      vendor: null,
      duration: product && new Date(product.duration),
      price: (product && product.value) || "",
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
    "price",
    "short_description",
    "description",
    "images",
    "category"
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
    let { new_product: product } = this.state;
    window.sessionStorage.setItem("product", JSON.stringify(product));
  };

  finish_tab_panel = () => {
    let { uploading_voucher, new_product } = this.state;

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
        {!this.is_set() && !new_product ? (
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
              <h4>Product Successfully Added</h4>
              <p>{new_product?.short_description}</p>
            </div>
            <div className="succ_123">
              <Link to={`/product?${new_product?._id}`}>
                <span
                  onClick={this.handle_course}
                  className="btn theme-bg text-white"
                >
                  View Product
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
      things_to_know,
      what_to_expect,
      what_you_will_learn_in_edit,
      learn_index,
      quantities,
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
    let { category, title, short_description, current_pill, description } =
      this.state;

    return (
      <div
        className={
          current_pill === "basic"
            ? "tab-pane fade show active"
            : "tab-pane fade"
        }
        id="v-pills-basic"
        role="tabpanel"
        aria-labelledby="v-pills-basic-tab"
      >
        <div className="form-group smalls">
          <label>Product Title*</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Product Title"
            onChange={({ target }) => this.setState({ title: target.value })}
            value={title}
          />
        </div>

        <div className="form-group smalls">
          <label>Short Description*</label>
          <input
            onChange={({ target }) =>
              this.setState({ short_description: target.value })
            }
            value={short_description}
            type="text"
            className="form-control"
          />
        </div>

        <div className="form-group smalls">
          <label>Description*</label>
          <textarea
            onChange={({ target }) =>
              this.setState({ description: target.value })
            }
            value={description}
            type="text"
            className="form-control"
            rows="10"
          ></textarea>
        </div>

        <div className="form-group smalls">
          <label>Category</label>

          <div className="simple-input">
            <select
              defaultValue={category}
              id="Category"
              onChange={({ target }) =>
                this.setState({ category: target.value })
              }
              className="form-control"
            >
              <option value="">-- Select Product Category --</option>
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

  handle_installments = (i) => {
    let { installments } = this.state;

    installments.includes(i)
      ? installments.splice(installments.indexOf(i), 1)
      : installments.push(i);

    this.setState({ installments });
  };

  installments = installments;

  i_days = new Object({
    [this.installments[0]]: 1,
    [this.installments[1]]: 7,
    [this.installments[2]]: 30,
    [this.installments[3]]: 90,
    [this.installments[4]]: 365,
  });

  calc_payments = (total, days, i) => {
    total = Number(total);
    if (!total) return "";

    days = Number(days);

    if (days < this.i_days[i]) return;

    let fracs = total / days;

    return (this.i_days[i] * fracs).toFixed(2);
  };

  handle_payment_types = (payment_type) => {
    let { payment_types } = this.state;

    if (payment_types.includes(payment_type)) {
      if (payment_types.length > 1)
        payment_types = payment_types.filter((type) => type !== payment_type);
    } else payment_types.push(payment_type);

    this.setState({ payment_types });
  };

  payment_types = new Array("outright", "installment");

  calculate_payments = (installment) => {
    let { payment_duration } = this.state;

    if (!payment_duration) return;

    return Math.round(payment_duration / this.i_days[installment]);
  };

  pricing_tab_panel = () => {
    let { price, installments, payment_types, down_payment, payment_duration } =
      this.state;

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
          <label>Payment Types</label>

          {this.payment_types.map((payment_type_) => {
            return (
              <Checkbox
                title={to_title(payment_type_.replace(/_/g, " "))}
                key={payment_type_}
                _id={payment_type_}
                checked={payment_types.includes(payment_type_)}
                action={(_id) => this.handle_payment_types(_id)}
                name="payment_type"
              />
            );
          })}
        </div>

        {
          <div className="form-group smalls">
            <label>Product Outright Price(&#8358;) *</label>
            <input
              type="number"
              min="0"
              className="form-control"
              placeholder="Enter Product Price"
              value={price}
              onChange={({ target }) => this.setState({ price: target.value })}
            />
          </div>
        }

        {payment_types.includes(this.payment_types[1]) ? (
          <>
            <Form_divider text="Pay small small / Subscriptions" />

            <div className="form-group smalls">
              <label>Down Payment</label>
              <input
                type="number"
                className="form-control"
                max={price}
                min="0"
                placeholder="Down Payment"
                value={down_payment}
                onChange={({ target }) =>
                  this.setState({ down_payment: target.value })
                }
              />
            </div>

            <div className="form-group smalls">
              <label>Payment Duration (Days)</label>
              <input
                type="number"
                min="0"
                className="form-control"
                placeholder="Payment Duration"
                value={payment_duration}
                onChange={({ target }) =>
                  this.setState({ payment_duration: target.value })
                }
              />
            </div>

            <div className="form-group smalls">
              <label>Installment Packages</label>

              {this.installments.map((i) => {
                let checked = installments.includes(i);

                return (
                  <>
                    <Checkbox
                      key={i}
                      title={`${i} ${
                        Number(payment_duration) > 0 &&
                        Number(price) > 0 &&
                        this.calc_payments(
                          price - (down_payment || 0),
                          payment_duration,
                          i
                        )
                          ? `- (# ${commalise_figures(
                              this.calc_payments(
                                price - (down_payment || 0),
                                payment_duration,
                                i
                              )
                            )})`
                          : ""
                      }`}
                      _id={i}
                      checked={checked}
                      action={this.handle_installments}
                    />
                    {checked ? (
                      <form>
                        <div className="row">
                          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                              <label>
                                Product Price{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                min="0"
                                placeholder="Payment Duration"
                                value={
                                  this.state[`${i}_product_price`] || price
                                }
                                onChange={({ target }) =>
                                  this.setState({
                                    [`${i}_product_price`]: target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                              <label>
                                Number of Payments{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Number of Payments"
                                min="0"
                                value={
                                  this.state[`number_of_${i}_payments`] ||
                                  this.calculate_payments(i)
                                }
                                onChange={({ target }) =>
                                  this.setState({
                                    [`number_of_${i}_payments`]: target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    ) : null}
                  </>
                );
              })}
            </div>
          </>
        ) : null}
        {this.pill_nav("pricing")}
      </div>
    );
  };

  handle_images = async (e) => {
    this.handle_file(
      e,
      null,
      null,
      () => {
        let { file, images, filename, file_hash } = this.state;

        images = new Array(
          { url: file, image_hash: file_hash, filename },
          ...images
        );

        this.setState({ images });
      },
      true
    );
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
      things_to_know,
      _id,
      quantities,
      images,
      category,
      payment_duration,
      down_payment,
      vendor,
      description,
      payment_types,
      installments,
    } = this.state;

    if (!this.is_set()) return;

    this.setState({ loading: true });

    let product = {
      short_description,
      title,
      value: Math.abs(Number(price)),
      video,
      payment_duration: Number(payment_duration) || 0,
      description,
      down_payment: Number(down_payment) || 0,
      payment_types,
      images,
      category,
      quantities: Number(quantities) || 0,
      vendor: vendor._id,
    };
    if (things_to_know.length) product.things_to_know = things_to_know;

    if (payment_types.includes(this.payment_types[1])) {
      product.installments = installments;
      installments.map((installment) => {
        product[`${installment}_product_price`] =
          Math.abs(Number(this.state[`${installment}_product_price`])) ||
          Math.abs(Number(price));
        product[`number_of_${installment}_payments`] =
          Math.abs(Number(this.state[`number_of_${installment}_payments`])) ||
          this.calculate_payments(installment);
      });
    }

    let response;
    if (_id) {
      product._id = _id;
      response = await post_request("update_product", product);
      product.images = response.images;
    } else {
      response = await post_request("create_product_et_service", product);
      product.images = response.images;
      product._id = response._id;
      product.created = response.created;
    }
    if (response?._id) {
      this.setState({ new_product: product });

      emitter.emit(_id ? "product_updated" : "new_product", {
        ...product,
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
    if (!vendor) return <Loadindicator />;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          return (
            <div id="main-wrapper">
              <Custom_Nav />
              <Padder />

              <Vendor_header vendor={vendor} />
              <div className="container">
                <Section_header
                  title="Product /"
                  color_title="Service"
                  description="Explore, manage subscription and trade product listings with best price and plan"
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
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Add_product_et_service;
export { installments };
