import React from "react";
import Explore_more from "./explore_more";
import Loadindicator from "./loadindicator";
import Event from "./event";
import { post_request } from "../assets/js/utils/services";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

class Upcoming_events extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let upcoming_events = await post_request("upcoming_events/10");
    this.setState({ upcoming_events });
  };

  render() {
    let { upcoming_events } = this.state;
    if (upcoming_events && !upcoming_events.length) return;

    return (
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>
                  upcoming <span className="theme-cl">Events</span>
                </h2>
                <p>The best events' happening now</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <>
              {upcoming_events ? (
                <Swiper
                  modules={[Autoplay, Pagination]}
                  pagination={{ clickable: true }}
                  slidesPerView={window.innerWidth < 650 ? 1 : 3}
                  autoplay={{
                    delay: 2000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                  }}
                  loop
                  className="swiper-container"
                >
                  {upcoming_events.map((event) => (
                    <SwiperSlide key={event._id}>
                      <Event full event={event} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div
                  style={{ width: "100%" }}
                  className="justify-content-center"
                >
                  <Loadindicator />
                </div>
              )}
            </>
          </div>
          {upcoming_events && upcoming_events.length ? (
            <Explore_more to="tickets" />
          ) : null}
        </div>
      </section>
    );
  }
}

export default Upcoming_events;
