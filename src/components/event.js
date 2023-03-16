import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import {
  commalise_figures,
  generate_random_string,
} from "../assets/js/utils/functions";
import { save_to_session, scroll_to_top } from "../sections/footer";
import Event_tickets from "./event_tickets";
import Modal from "./modal";
import Preview_image from "./preview_image";

class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handle_vendor = () => {
    let { event } = this.props;

    save_to_session("vendor", event.vendor);
  };

  toggle_tickets = () => this.tickets?.toggle();

  render() {
    let { full } = this.state;
    let { event, class_name, in_events, in_vendor, ticket_code } = this.props;
    if (!event) return;

    let {
      title,
      images,
      short_description,
      vendor,
      total_sales,
      state,
      value,
      location,
    } = event;
    if (!vendor) return;

    let { category, name, logo, logo_hash } = vendor;

    return (
      <div
        className={
          class_name ||
          (in_events
            ? "col-xl-6 col-lg-6 col-md-6 col-sm-12"
            : "col-xl-4 col-lg-4 col-md-6 col-sm-12")
        }
      >
        <div className="crs_grid">
          <div className="crs_grid_thumb">
            <Link
              to="/event"
              onClick={() => {
                save_to_session("event", {
                  ...event,
                  total_sales,
                  ticket_code,
                });
                save_to_session("vendor", vendor);
                scroll_to_top();
              }}
              className="crs_detail_link"
            >
              <Preview_image
                image={images[0].url || require("../assets/img/vouchers1.png")}
                image_hash={images[0].image_hash}
                class_name="img img-fluid rounded"
              />
            </Link>
          </div>
          <div className="crs_grid_caption">
            <div className="crs_flex">
              <div className="crs_fl_first">
                <div className="crs_cates cl_8">
                  <span>{category || "Entertainment"}</span>
                </div>
              </div>
              <div className="crs_fl_last">
                <div
                  onClick={in_vendor ? this.toggle_tickets : null}
                  style={in_vendor ? { cursor: "pointer" } : null}
                  className="crs_inrolled"
                >
                  <strong>
                    {commalise_figures(
                      total_sales || Number(generate_random_string(5, "num"))
                    )}
                  </strong>
                  Tickets sold
                </div>
              </div>
            </div>
            <div className="crs_title">
              <h4>
                <Link
                  to="/event"
                  onClick={() => {
                    save_to_session("event", {
                      ...event,
                      total_sales,
                      ticket_code,
                    });
                    save_to_session("vendor", vendor);
                    scroll_to_top();
                  }}
                  className="crs_title_link"
                >
                  {title}
                </Link>
              </h4>
            </div>
            <p
              className="cursor-pointer"
              onClick={() => this.setState({ full: !this.state.full })}
            >
              {full ? short_description : short_description.slice(0, 70)}
            </p>
            <p>
              <i style={{}} className="fas fa-map-marker"></i> <b>{location}</b>
            </p>
            {ticket_code ? (
              <div className="crs_info_detail">
                <CopyToClipboard text={ticket_code}>
                  <span style={{ cursor: "pointer" }}>
                    {ticket_code}{" "}
                    {state && state !== "unused" ? (
                      <div className="crs_cates cl_1">
                        <span>{state}</span>
                      </div>
                    ) : (
                      <i
                        style={{
                          color: "rgb(30, 144, 255, 0.8)",
                          fontSize: 22,
                        }}
                        className="fas fa-copy"
                      ></i>
                    )}
                  </span>
                </CopyToClipboard>
              </div>
            ) : null}
          </div>
          <div className="crs_grid_foot">
            <div className="crs_flex">
              <div className="crs_fl_first">
                <div className="crs_tutor">
                  <div className="crs_tutor_thumb">
                    <Link
                      to={`/vendor?${vendor._id}`}
                      onClick={this.handle_vendor}
                    >
                      <Preview_image
                        class_name="img-fluid circle"
                        style={{ height: 30, width: 30 }}
                        image={logo}
                        image_hash={logo_hash}
                      />
                    </Link>
                  </div>
                  <div className="crs_tutor_name">
                    <Link
                      to={`/vendor?${vendor._id}`}
                      onClick={this.handle_vendor}
                    >
                      {name}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="crs_fl_last">
                <div className="crs_price">
                  <h2>
                    <span className="currency">&#8358;</span>
                    <span className="theme-cl">
                      {commalise_figures(Number(value))}
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal ref={(tickets) => (this.tickets = tickets)}>
          <Event_tickets event={event} toggle={this.toggle_tickets} />
        </Modal>
      </div>
    );
  }
}

export default Event;
