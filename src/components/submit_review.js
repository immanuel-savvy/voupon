import React from "react";
import { email_regex } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";

class Submit_review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  submit = async (e) => {
    e.preventDefault();

    let { voucher, on_comment, item, comment: comm } = this.props;
    let { name, text, email } = this.state;

    item = item || voucher;

    let comment = { name, email, text };
    if (item) comment.item = item._id;
    else comment.comment = comm._id;

    let result = await post_request(
      comm ? "new_reply" : "new_comment",
      comment
    );

    comment._id = result._id;
    comment.created = result.created;

    on_comment && on_comment(comment);

    this.clear_state();
  };

  clear_state = () => this.setState({ name: "", email: "", text: "" });

  render() {
    let { text, name, email } = this.state;

    return (
      <div class="edu_wraper">
        <h4 class="edu_title">Submit Reviews</h4>
        <div class="review-form-box form-submit">
          <form>
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="form-group">
                  <label>
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={({ target }) =>
                      this.setState({ name: target.value })
                    }
                  />
                </div>
              </div>

              <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="form-group">
                  <label>
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    class="form-control"
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={({ target }) =>
                      this.setState({ email: target.value })
                    }
                  />
                </div>
              </div>

              <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="form-group">
                  <label>
                    Review <span className="text-danger">*</span>
                  </label>
                  <textarea
                    class="form-control ht-140"
                    placeholder="Review"
                    value={text}
                    onChange={({ target }) =>
                      this.setState({ text: target.value })
                    }
                  ></textarea>
                </div>
              </div>

              <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="form-group">
                  <button
                    onClick={this.submit}
                    type="submit"
                    disabled={!name || !text || !email_regex.test(email)}
                    class="btn theme-bg btn-md"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Submit_review;
