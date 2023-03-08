import React from "react";
import { Link } from "react-router-dom";
import {
  commalise_figures,
  generate_random_string,
} from "../assets/js/utils/functions";
import { save_to_session } from "../sections/footer";
import Preview_image from "./preview_image";

class Offer_voucher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handle_vendor = () => {
    let { vendor } = this.props;

    save_to_session("vendor", vendor);
  };

  render() {
    let { voucher, vendor } = this.props;
    let { title, image, image_hash, total_sales, value } = voucher;
    let { category, name, address, logo, logo_hash } = vendor;

    return (
      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
        <div class="crs_grid">
          <div class="crs_grid_thumb">
            <a href="course-detail.html" class="crs_detail_link">
              <Preview_image
                image={image || require("../assets/img/vouchers1.png")}
                image_hash={image_hash}
              />
            </a>
            {/* <div class="crs_video_ico">
              <i class="fa fa-play"></i>
            </div>
            <div class="crs_locked_ico">
              <i class="fa fa-lock"></i>
            </div> */}
          </div>
          <div class="crs_grid_caption">
            <div class="crs_flex">
              <div class="crs_fl_first">
                <div class="crs_cates cl_8">
                  <span>{category || "Entertainment"}</span>
                </div>
              </div>
              <div class="crs_fl_last">
                <div class="crs_inrolled">
                  <strong>
                    {commalise_figures(
                      total_sales || Number(generate_random_string(5, "num"))
                    )}
                  </strong>
                  Purchased
                </div>
              </div>
            </div>
            <div class="crs_title">
              <h4>
                <a href="course-detail.html" class="crs_title_link">
                  {title}
                </a>
              </h4>
            </div>
            <div class="crs_info_detail">
              <span>{}</span>
            </div>
          </div>
          <div class="crs_grid_foot">
            <div class="crs_flex">
              <div class="crs_fl_first">
                <div class="crs_tutor">
                  <div class="crs_tutor_thumb">
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
                  <div class="crs_tutor_name">
                    <Link
                      to={`/vendor?${vendor._id}`}
                      onClick={this.handle_vendor}
                    >
                      {name}
                    </Link>
                  </div>
                </div>
              </div>
              <div class="crs_fl_last">
                <div class="crs_price">
                  <h2>
                    <span class="currency">&#8358;</span>
                    <span class="theme-cl">
                      {commalise_figures(Number(value))}
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Offer_voucher;
