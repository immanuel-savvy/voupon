import React from "react";
import Preview_image from "./preview_image";

class Voucher_media extends React.Component {
  constructor(props) {
    super(props);

    let { voucher } = this.props;
    this.state = { active_image: voucher.images[0] };
  }

  set_image = (image) => this.setState({ active_image: image });

  render() {
    let { active_image } = this.state;
    let { voucher } = this.props;
    let { images, video } = voucher;

    return (
      <>
        <div class="property_video radius lg mb-4">
          <div class="thumb">
            <Preview_image
              image={active_image.url}
              class_name="pro_img img-fluid w100"
            />
          </div>
        </div>

        <div class="edu_wraper">
          {video ? (
            <span class="bb-video-box">
              <span
                class="bb-video-box-inner"
                style={{
                  display: "inline",
                  backgroundColor: "#eee",
                  padding: 15,
                  marginRight: 15,
                  cursor: "pointer",
                }}
              >
                <span class="bb-video-box-innerup">
                  <a
                    href="https://www.youtube.com/watch?v=A8EI6JaFbv4"
                    data-toggle="modal"
                    data-target="#popup-video"
                    class="theme-cl"
                  >
                    <i style={{ fontSize: 20 }} class="ti-control-play"></i>
                  </a>
                </span>
              </span>
            </span>
          ) : null}
          {images.map((image, index) => {
            return (
              <span key={index} class="thumb mr-3">
                <Preview_image
                  image={image.url}
                  height={70}
                  style={{ borderRadius: 10, cursor: "pointer" }}
                  action={() => this.set_image(image)}
                  class_name="pro_img img-fluid img-rounded w100"
                />
              </span>
            );
          })}
        </div>
      </>
    );
  }
}

export default Voucher_media;
