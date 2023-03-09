import React from "react";
import { Blurhash } from "react-blurhash";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { domain } from "../assets/js/utils/constants";
import Loadindicator from "./loadindicator";

class Preview_image extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { image_loaded } = this.state;
    let {
      action,
      style,
      no_preview,
      image,
      class_name,
      image_hash,
      height,
      width,
    } = this.props;

    return (
      <span>
        <LazyLoadImage
          src={
            (image &&
              (image.startsWith("/") ||
                image.startsWith("http") ||
                image.startsWith("data"))) ||
            typeof image !== "string"
              ? image
              : `${domain}/images/${image}`
          }
          onLoad={() => this.setState({ image_loaded: true })}
          beforeLoad={() => this.setState({ image_load_started: true })}
          className={class_name || "img-fluid round"}
          onClick={action}
          style={{
            height: image_loaded ? height || null : 0,
            width: width || null,
            ...style,
          }}
        />
        {!image_loaded && image_hash ? (
          no_preview ? (
            <Loadindicator small />
          ) : (
            <Blurhash
              hash={image_hash}
              height={height || 21}
              width={width || 60}
              className={class_name || "img-fluid rounded"}
              punch={1}
              onClick={action}
            />
          )
        ) : null}
      </span>
    );
  }
}

export default Preview_image;
