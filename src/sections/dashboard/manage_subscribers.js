import React from "react";
import { get_request, post_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_subscribers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let subscribers = await get_request("newsletter_subscribers");
    subscribers && this.setState({ subscribers });
  };

  remove_email = async (email) => {
    await post_request("remove_subscriber", { email });

    let { subscribers } = this.state;
    subscribers = subscribers.filter((sub) => sub !== email);

    this.setState({ subscribers });
  };

  render() {
    let { subscribers } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="subscribers" />
        <div class="row">
          {subscribers ? (
            subscribers.length ? (
              <div className="ed_detail_wrap light">
                {subscribers.map((sub, index) => (
                  <div key={index} className="crs_cates cl_1">
                    <span>
                      {sub}{" "}
                      <a
                        onClick={() =>
                          window.confirm(`Remove subscriber (${sub})?`) &&
                          this.remove_email(sub)
                        }
                        className="btn btn-action"
                      >
                        <i className={`fas fa-window-close`}></i>
                      </a>
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <Listempty text="No subscribers yet." />
            )
          ) : (
            <Loadindicator contained />
          )}
        </div>
      </div>
    );
  }
}

export default Manage_subscribers;
