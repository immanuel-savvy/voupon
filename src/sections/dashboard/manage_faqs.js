import React from "react";
import { post_request } from "../../assets/js/utils/services";
import { emitter } from "../../Voupon";
import Faqs from "../faqs";
import Add_faq from "./add_faq";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_faqs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page_size: 15,
      page: 0,
    };
  }

  componentDidMount = async () => {
    let { page_size, page } = this.state;
    let { faqs, total_faqs } = await post_request("faqs", {
      limit: page_size,
      skip: page_size * page,
      total_faqs: true,
    });

    this.setState({ faqs, total_faqs });

    this.new_faq = (faq) => {
      let { faqs } = this.state;

      faqs = new Array(faq, ...faqs);
      this.setState({ faqs, faq_in_edit: null });
    };

    this.faq_updated = (faq) => {
      let { faqs } = this.state;

      faqs = faqs.map((faq_) => {
        if (faq_._id === faq._id) return faq;
        return faq_;
      });

      this.setState({ faqs, faq_in_edit: null });
    };

    emitter.listen("new_faq", this.new_faq);
    emitter.listen("faq_updated", this.faq_updated);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("faq_updated", this.faq_updated);
    emitter.remove_listener("new_faq", this.new_faq);
  };

  add_new_btn = () =>
    this.state.show_form ? null : (
      <div>
        <div class="elkios" onClick={this.toggle_form}>
          <a
            href="#"
            class="add_new_btn"
            data-toggle="modal"
            data-target="#catModal"
          >
            <i class="fas fa-plus-circle mr-1"></i>Add FAQ
          </a>
        </div>
      </div>
    );

  toggle_form = () =>
    this.setState({ show_form: !this.state.show_form, faq_in_edit: null });

  edit_faq = (faq) => this.setState({ faq_in_edit: faq, show_form: true });

  render() {
    let { show_form, faq_in_edit } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="manage faqs"
          on_click={this.toggle_form}
          title="add faq"
        />
        <div class="row">
          {show_form ? (
            <div>
              <Add_faq faq={faq_in_edit} toggle={this.toggle_form} />
              <hr />
            </div>
          ) : null}

          <Faqs remove_faq={this.remove_faq} edit_faq={this.edit_faq} admin />
        </div>
      </div>
    );
  }
}

export default Manage_faqs;
