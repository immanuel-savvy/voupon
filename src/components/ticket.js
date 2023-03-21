import React from "react";
import { to_title } from "../assets/js/utils/functions";
import { Loggeduser } from "../Contexts";
import Preview_image from "./preview_image";

class Ticket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render = () => {
    let { event, ticket, full } = this.props;
    let { images, title } = event;
    let { ticket_code, user, state } = ticket;
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
                          <i className="fas fa-copy"></i>
                          {ticket_code}
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

                  <span>
                    <div className="edu_cat_data pt-2">
                      <b>User</b>
                      <h4 className="title">
                        <a href="#">{`${firstname} ${lastname}`}</a>
                      </h4>
                      <ul className="meta">
                        <li className="video">{email}</li>
                      </ul>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  };
}

export default Ticket;
