import React from "react";
import { emitter } from "./../Voupon";
import { post_request } from "../assets/js/utils/services";
import Stretch_button from "./stretch_button";
import Text_input from "./text_input";

class Create_offer_voucher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantities: 50,
    };
  }

  create_offer = async () => {
    let { vendor, toggle } = this.props;
    let { title, value, duration, quantities, description } = this.state;

    let offer = {
      title,
      value,
      quantities,
      description,
      duration: new Date(duration).getTime(),
      vendor: vendor._id,
    };

    let result = await post_request("create_offer_voucher", offer);
    !result && toggle();

    offer._id = result._id;
    offer.created = result.created;

    emitter.emit("new_offer_voucher", offer);
    toggle();
  };

  is_set = () => {
    let { title, value, duration, quantities } = this.state;

    return (
      title && duration && value && Number(value) > 0 && Number(quantities) > 0
    );
  };

  render() {
    let { title, value, duration, quantities, description } = this.state;

    return (
      <section>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <form>
                <div className="crs_log_wrap">
                  <div className="crs_log__caption">
                    <div className="rcs_log_123">
                      <div className="rcs_ico">
                        <i className="fas fa-users"></i>
                      </div>
                    </div>
                  </div>

                  <div className="rcs_log_124">
                    <div className="Lpo09">
                      <h4>Create Offer Voucher</h4>
                    </div>
                  </div>

                  <Text_input
                    value={title}
                    title="voucher title"
                    action={(title) =>
                      this.setState({
                        title,
                        message: "",
                      })
                    }
                    important
                    // error_message=""
                  />

                  <Text_input
                    value={value}
                    title={`offer value ${"(Naira)"}`}
                    action={(value) =>
                      this.setState({
                        value,
                        message: "",
                      })
                    }
                    type="number"
                    important
                  />

                  <Text_input
                    value={quantities}
                    title="Number to stock"
                    action={(quantities) =>
                      this.setState({
                        quantities,
                        message: "",
                      })
                    }
                    type="number"
                    important
                  />

                  <Text_input
                    value={duration}
                    title="Duration for sale"
                    action={(duration) =>
                      this.setState({
                        duration,
                        message: "",
                      })
                    }
                    type="date"
                    important
                  />

                  <Text_input
                    value={description}
                    title="Description"
                    action={(description) =>
                      this.setState({
                        description,
                        message: "",
                      })
                    }
                    multiline
                  />

                  <Stretch_button
                    title="create"
                    disabled={!this.is_set()}
                    action={this.create_offer}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Create_offer_voucher;
