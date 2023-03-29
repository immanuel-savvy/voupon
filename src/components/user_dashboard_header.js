import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { client_domain } from "../assets/js/utils/constants";
import { mask_id } from "../assets/js/utils/functions";
import { emitter } from "../Voupon";
import Modal from "./modal";
import Wallet from "./wallet";

class User_dashboard_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_wallet = () => this.wall?.toggle();

  render() {
    let { user } = this.props;
    if (!user) return;

    let { _id } = user;
    let referral_link = `${client_domain}/signup/${mask_id(_id)}`;

    return (
      <section className="p-0">
        <div className="">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="crp_box ovr_top">
                <div className="row align-items-center m-0">
                  <div className="col-xl-2 col-lg-3 col-md-2 col-sm-12">
                    <div
                      className="crt_169 cat-1 edu_cat_2"
                      style={{ marginBottom: 10 }}
                      onClick={this.toggle_wallet}
                    >
                      <div className="crt_overt style_2">
                        <i className="fa fa-wallet"></i>
                      </div>
                      <div className="crt_io90">
                        <h6>View Wallet</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-10 col-lg-9 col-md-10 col-sm-12">
                    <div className="">
                      <ul>
                        <li>
                          <div className="dro_140">
                            <div className="dro_141 st-1">
                              <i className="fa fa-link"></i>
                            </div>
                            <div className="dro_142">
                              <h6>
                                Referral Link
                                <br />
                                <CopyToClipboard
                                  text={referral_link}
                                  onCopy={() =>
                                    emitter.emit("toggle_toast", {
                                      message:
                                        "Referral link copied to clipboard!",
                                      title: "Spread It!",
                                    })
                                  }
                                >
                                  <span
                                    style={{
                                      textTransform: "none",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {referral_link}
                                    &nbsp; &nbsp;
                                    <i className="fa fa-copy"></i>
                                  </span>
                                </CopyToClipboard>
                              </h6>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal ref={(wall) => (this.wall = wall)}>
          <Wallet user={user} toggle={this.toggle_wallet} />
        </Modal>
      </section>
    );
  }
}

export default User_dashboard_header;
