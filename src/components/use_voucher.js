import React from "react";
import { email_regex, to_title } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import Alert_box from "./alert_box";
import Checkbox from "./checkbox";
import { voucher_types } from "./redeem_voucher";
import Stretch_button from "./stretch_button";
import Text_input from "./text_input";
import Voucher_otp from "./voucher_otp";
import Voucher_used_details from "./voucher_used_details";

class Use_voucher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    let { voucher } = this.props;

    if (voucher) {
      let { voucher_code, email, value, vendor } = voucher;
      this.setState({
        voucher_code,
        value,
        email,
        voucher_type: voucher_types[vendor ? 1 : 0],
      });
    }
  };

  is_set = () => {
    let { email, voucher_code, voucher_type, value } = this.state;

    if (Number(value) <= 0 && voucher_type === voucher_types[0]) return false;

    return email_regex.test(email) && voucher_code && voucher_type;
  };

  set_voucher_type = (voucher_type) => this.setState({ voucher_type });

  proceed_to_otp = async () => {
    let { vendor } = this.props;
    let { voucher_code, user, email, value, voucher_type } = this.state;

    let result = await post_request("can_redeem_voucher", {
      user: user || this.loggeduser?._id,
      email,
      voucher_type,
      voucher_code,
      amount: Number(value),
      vendor: vendor._id,
    });

    if (result && result.can_redeem) {
      this.setState({
        can_redeem: true,
        user: result.user,
        voucher: result.owner_voucher,
      });

      this.setState({ requesting_otp: true });
      result = await post_request(`request_voucher_otp`, {
        user: result.user,
        voucher_code: result.voucher_code,
        voucher: result.owner_voucher,
        voucher_type: result.voucher_type,
        email: result.email,
      });
    } else this.setState({ message: result.message });
  };

  proceed = async () => {
    let { vendor, on_use } = this.props;
    let { proceeding, value, user, voucher } = this.state;
    if (proceeding) return;

    this.setState({ proceeding: true });

    let details = {
      vendor: vendor._id,
      voucher,
      user,
      value,
    };

    let result = await post_request("use_voucher", details);

    if (result && result.success) {
      this.setState({
        use_successful: true,
        user: result.user,
        voucher: result.voucher,
        vendor: result.vendor,
      });
      on_use && on_use(result.value);
    } else
      this.setState({
        message:
          (result && result.message) || "Cannot use voucher at the moment.",
      });
  };

  reset_state = () => {
    this.setState({
      voucher: null,
      user: null,
      value: null,
      voucher_code: null,
      voucher_type: null,
      requesting_otp: false,
      use_successful: null,
      message: "",
      email: "",
    });
  };

  render() {
    let { voucher } = this.props;
    let {
      proceeding,
      message,
      using,
      email,
      voucher_code,
      voucher_type,
      user,
      voucher: used_voucher,
      vendor,
      value,
      use_successful,
      requesting_otp,
    } = this.state;

    return (
      <section style={{ paddingTop: 20, paddingBottom: 20 }}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <form>
                <div className="crs_log_wrap">
                  <div className="crs_log__thumb">
                    <img
                      src={require(`../assets/img/vouchers1.png`)}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="crs_log__caption">
                    <div className="rcs_log_123">
                      <div className="rcs_ico">
                        <i className="fas fa-users"></i>
                      </div>
                    </div>
                  </div>

                  <div className="rcs_log_124">
                    <div className="Lpo09">
                      <h4>Use Voucher</h4>
                    </div>
                  </div>

                  {use_successful ? (
                    <Voucher_used_details
                      toggle={this.reset_state}
                      details={{
                        user,
                        voucher: used_voucher,
                        vendor,
                        value,
                      }}
                    />
                  ) : requesting_otp ? (
                    <Voucher_otp
                      proceed={this.proceed}
                      voucher={voucher}
                      message={message}
                      email={email || this.loggeduser?.email}
                      toggle={() => this.setState({ requesting_otp: false })}
                      clear_message={this.clear_message}
                      redeeming={using}
                    />
                  ) : (
                    <>
                      <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label>Voucher Type</label>

                          {voucher_types.map((voucher_type_) => {
                            return (
                              <Checkbox
                                type="radio"
                                disabled={!!voucher}
                                title={to_title(
                                  voucher_type_.replace(/_/g, " ")
                                )}
                                key={voucher_type_}
                                _id={voucher_type_}
                                checked={voucher_type_ === voucher_type}
                                action={(_id) => this.set_voucher_type(_id)}
                                name="voucher_type"
                              />
                            );
                          })}
                        </div>
                      </div>

                      <Text_input
                        value={voucher_code}
                        title="voucher code"
                        disabled={!!voucher}
                        action={(voucher_code) =>
                          this.setState({
                            voucher_code,
                            message: "",
                          })
                        }
                        important
                      />

                      <Text_input
                        value={email}
                        title={`Authorised email`}
                        disabled={!!voucher}
                        action={(email) =>
                          this.setState({
                            email,
                            message: "",
                          })
                        }
                        type="email"
                        important
                      />

                      {voucher_type === voucher_types[1] ? null : (
                        <Text_input
                          value={value}
                          title="Value"
                          disabled={!!voucher}
                          action={(value) =>
                            this.setState({
                              value,
                              message: "",
                            })
                          }
                          type="number"
                          important
                        />
                      )}
                      {message ? <Alert_box message={message} /> : null}

                      <Stretch_button
                        title={"Proceed"}
                        loading={proceeding}
                        disabled={!this.is_set()}
                        action={() => this.proceed_to_otp()}
                      />
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Use_voucher;
