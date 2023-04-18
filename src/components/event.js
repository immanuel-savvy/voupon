import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import {
  commalise_figures,
  date_string,
  generate_random_string,
  time_string,
} from "../assets/js/utils/functions";
import { save_to_session, scroll_to_top } from "../sections/footer";
import Event_tickets from "./event_tickets";
import Modal from "./modal";
import Preview_image from "./preview_image";
import Text_btn from "./text_btn";
import Ticket_codes from "./ticket_codes";

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

  parse_datetime = (datetime) => {
    let date = new Date(datetime).getTime();

    return `${date_string(date)}, ${time_string(date)}`;
  };

  save_to_wishlist = async (loggeduser) => {
    if (!loggeduser)
      return <Login no_redirect action={this.save_to_wishlist} />;

    let { product } = this.props;

    await post_request("add_to_wishlist", {
      product: product._id,
      user: loggeduser._id,
    });
    return;
  };

  toggle_ticket_codes = () => this.codes?.toggle();

  render() {
    let { full } = this.state;
    let { event, edit, ticket, class_name, in_events, in_vendor, ticket_code } =
      this.props;
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
      event_date_time,
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
                  ticket,
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

            {edit ? (
              <div className="crs_video_ico cursor-pointer" onClick={edit}>
                <i className={`fa fa-edit`}></i>
              </div>
            ) : null}
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
                  <strong>{commalise_figures(total_sales || 0, true)}</strong>
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
                      ticket,
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
                {Array.isArray(ticket_code) && ticket_code.length > 1 ? (
                  <>
                    <span style={{ fontSize: 18 }}>
                      <span>Quantity:</span>{" "}
                      <span>
                        <b>{ticket_code.length}</b>
                      </span>
                    </span>
                    &nbsp; &nbsp;
                    <div>
                      <Text_btn
                        text="View ticket codes"
                        style={{ fontWeight: "bold" }}
                        action={this.toggle_ticket_codes}
                      />
                    </div>
                    <br />
                  </>
                ) : (
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
                )}
              </div>
            ) : null}

            <div class="crs_info_detail">
              <ul>
                <i class="fa fa-clock text-danger"></i>&nbsp;&nbsp;
                <span>{this.parse_datetime(event_date_time)}</span>
              </ul>
            </div>
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
                      {commalise_figures(Number(value), true)}
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

        <Modal ref={(codes) => (this.codes = codes)}>
          <Ticket_codes
            event={event}
            ticket={ticket}
            ticket_code={ticket_code}
            toggle={this.toggle_ticket_codes}
          />
        </Modal>
      </div>
    );
  }
}

export default Event;
