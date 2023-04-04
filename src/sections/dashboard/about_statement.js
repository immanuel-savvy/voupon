import React from "react";
import { get_request, post_request } from "../../assets/js/utils/services";
import Loadindicator from "../../components/loadindicator";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class About_statement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let about_statement = await get_request("about_statement");

    about_statement &&
      about_statement.text &&
      this.setState({ text: about_statement.text });
  };

  sumbit = async () => {
    let { text } = this.state;
    this.setState({ posting: true });

    await post_request("post_about_statement", { text });
    this.setState({ posting: false });
  };

  render() {
    let { text, posting } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="about statement" />
        <div class="row">
          <div className="modal-body">
            <form className="forms_block">
              <div className="form-group">
                <label>Statement*</label>
                <textarea
                  onChange={({ target }) =>
                    this.setState({ text: target.value })
                  }
                  value={text}
                  className="form-control"
                  style={{ height: 200 }}
                ></textarea>
              </div>

              <div className="form-group smalls">
                {posting ? (
                  <Loadindicator />
                ) : (
                  <button
                    onClick={this.sumbit}
                    type="button"
                    className={`btn full-width text-white theme-bg short_description-white`}
                  >
                    Post
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default About_statement;
