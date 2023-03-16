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
    let { event, ticket } = this.props;
    let { images, title } = event;
    let { ticket_code, user, state } = ticket;
    let { firstname, lastname, email } = user;

    return (
      <Loggeduser.Consumer>
        {() => {
          return (
            <div class="col-lg-6 col-md-6 col-sm-12">
              <div class="edu_cat_2 cat-1">
                <div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div class="edu_cat_icons">
                      <a class="" href="#">
                        <Preview_image
                          image={images[0].url}
                          class_name={"img-fluid rounded"}
                          image_hash={images[0].image_hash}
                        />
                      </a>
                    </div>
                    <div class="edu_cat_data">
                      <h4 class="title">
                        <a href="#">{title}</a>
                      </h4>
                      <ul class="meta">
                        <li class="video">
                          <i className="fas fa-copy"></i>
                          {ticket_code}
                        </li>

                        <li class="video">
                          <div className="crs_cates cl_1">
                            <span>{to_title(state)}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <span>
                    <div class="edu_cat_data pt-2">
                      <b>User</b>
                      <h4 class="title">
                        <a href="#">{`${firstname} ${lastname}`}</a>
                      </h4>
                      <ul class="meta">
                        <li class="video">{email}</li>
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
