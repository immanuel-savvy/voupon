import React from "react";

class Ratings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div class="rating-overview">
        <div class="rating-overview-box">
          <span class="rating-overview-box-total">4.2</span>
          <span class="rating-overview-box-percent">out of 5.0</span>
          <div class="star-rating" data-rating="5">
            <i class="ti-star"></i>
            <i class="ti-star"></i>
            <i class="ti-star"></i>
            <i class="ti-star"></i>
            <i class="ti-star"></i>
          </div>
        </div>

        <div class="rating-bars">
          <div class="rating-bars-item">
            <span class="rating-bars-name">5 Star</span>
            <span class="rating-bars-inner">
              <span class="rating-bars-rating high" data-rating="4.7">
                <span
                  class="rating-bars-rating-inner"
                  style={{ width: "85%" }}
                ></span>
              </span>
              <strong>85%</strong>
            </span>
          </div>
          <div class="rating-bars-item">
            <span class="rating-bars-name">4 Star</span>
            <span class="rating-bars-inner">
              <span class="rating-bars-rating good" data-rating="3.9">
                <span
                  class="rating-bars-rating-inner"
                  style={{ width: "75%" }}
                ></span>
              </span>
              <strong>75%</strong>
            </span>
          </div>
          <div class="rating-bars-item">
            <span class="rating-bars-name">3 Star</span>
            <span class="rating-bars-inner">
              <span class="rating-bars-rating mid" data-rating="3.2">
                <span
                  class="rating-bars-rating-inner"
                  style={{ width: "52.2%" }}
                ></span>
              </span>
              <strong>53%</strong>
            </span>
          </div>
          <div class="rating-bars-item">
            <span class="rating-bars-name">1 Star</span>
            <span class="rating-bars-inner">
              <span class="rating-bars-rating poor" data-rating="2.0">
                <span
                  class="rating-bars-rating-inner"
                  style={{ width: "20%" }}
                ></span>
              </span>
              <strong>20%</strong>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Ratings;
