import React from "react";
import { to_title } from "../assets/js/utils/functions";
import { Loggeduser } from "../Contexts";
import Modal from "./modal";
import Preview_image from "./preview_image";
import Text_btn from "./text_btn";
import Ticket_codes from "./ticket_codes";

class Ticket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_ticket_codes = () => this.codes?.toggle();

  render = () => {
    let { event, ticket, full, no_user } = this.props;
    let { images, title } = event;
    let { ticket_code, user, state } = ticket;

    if (no_user) user = new Object();

    let { firstname, lastname, email } = user;

    if (!state) state = "unused";

    return (
      <Loggeduser.Consumer>
        {() => {
          return (
            <div className={full ? "col-12" : "col-lg-6 col-md-6 col-sm-12"}>
              <div className="edu_cat_2 cat-1">
                <div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div className="edu_cat_icons">
                      <a className="" href="#">
                        <Preview_image
                          image={images[0].url}
                          class_name={"img-fluid rounded"}
                          image_hash={images[0].image_hash}
                        />
                      </a>
                    </div>
                    <div className="edu_cat_data">
                      <h4 className="title">
                        <a href="#">{title}</a>
                      </h4>
                      <ul className="meta">
                        <li className="video">
                          {Array.isArray(ticket_code) &&
                          ticket_code.length > 1 ? (
                            <>
                              <span style={{ fontSize: 16 }}>
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
                            <>
                              <i className="fas fa-copy"></i>
                              {ticket_code}
                            </>
                          )}
                        </li>

                        <li className="video">
                          <div
                            className={`crs_cates cl_${
                              state && state !== "unused" ? "1" : "2"
                            }`}
                          >
                            <span>{to_title(state)}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {!no_user && (firstname || lastname) ? (
                    <span style={{ width: "100%", textAlign: "center" }}>
                      <div className="edu_cat_data pt-2 text-center">
                        <b>User</b>
                        <h4 className="title">
                          <a href="#">{`${firstname} ${lastname}`}</a>
                        </h4>
                        <ul className="meta">
                          <li className="video">{email}</li>
                        </ul>
                      </div>
                    </span>
                  ) : null}
                </div>
              </div>

              <Modal ref={(codes) => (this.codes = codes)}>
                <Ticket_codes
                  ticket={ticket}
                  event={event}
                  toggle={this.toggle_ticket_codes}
                />
              </Modal>
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  };
}

export default Ticket;
