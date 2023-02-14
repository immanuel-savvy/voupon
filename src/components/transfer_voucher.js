import React from "react";
import Text_input from "./text_input";

class Transfer_voucher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { voucher } = this.props;
    let { voucher_code } = this.state;

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
                      <h4>Transfer Voucher</h4>
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Transfer_voucher;
