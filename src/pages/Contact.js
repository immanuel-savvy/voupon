import React from "react";
import { email_regex } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import Contact_sidebar from "../components/contact_sidebar";
import Padder from "../components/padder";
import Stretch_button from "../components/stretch_button";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer, { scroll_to_top } from "../sections/footer";
import Custom_nav from "../sections/nav";

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    scroll_to_top();
  };

  send_message = async () => {
    let { text, name, phone, email, organisation, sending, interest } =
      this.state;
    if (!text || !name || !phone || !email || !organisation || sending) return;
    this.setState({ sending: true });

    let message = { text, name, phone, email, organisation, interest };

    await post_request("new_contact_message", message);

    this.reset_state();
  };

  reset_state = () =>
    this.setState({
      text: "",
      name: "",
      email: "",
      phone: "",
      organisation: "",
      sending: false,
    });

  render() {
    let { navs } = this.props;
    let { text, email, sending, name, phone, organisation } = this.state;

    return (
      <div id="main-wrapper">
        <Custom_nav page="contact" />
        <Padder />

        <Breadcrumb_banner page="Contact Us" title="Get In Touch" />
        <section>
          <div className="container">
            <div className="row align-items-start">
              <div className="col-xl-7 col-lg-6 col-md-12 col-sm-12">
                <div className="form-group">
                  <h4>We'd love to hear from you</h4>
                  <span>
                    Send a message and we'll respond as soon as possible{" "}
                  </span>
                </div>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label>Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                        onChange={({ target }) =>
                          this.setState({ name: target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={({ target }) =>
                          this.setState({ email: target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label>Organisation</label>
                      <input
                        value={organisation}
                        onChange={({ target }) =>
                          this.setState({ organisation: target.value })
                        }
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label>Phone *</label>
                      <input
                        value={phone}
                        placeholder="e.g +234 801 234 5566"
                        onChange={({ target }) =>
                          this.setState({ phone: target.value })
                        }
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label>Message *</label>
                      <textarea
                        value={text}
                        style={{ minHeight: 100 }}
                        onChange={({ target }) =>
                          this.setState({ text: target.value })
                        }
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <Stretch_button
                        loading={sending}
                        action={this.send_message}
                        disabled={!email_regex.test(email) || !name || !text}
                        title="Send Message"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Contact_sidebar />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Contact;
