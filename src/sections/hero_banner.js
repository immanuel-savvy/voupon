import React from "react";

class Hero_banner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { hero } = this.props;
    let { main_text, sub_text, bg, overlay } = hero;

    return (
      <div
        className="hero_banner image-cover image_bottom h4_bg"
        style={{
          backgroundImage: `url(${bg})`,
          height: "75vh",
          backgroundColor: "black",
          width: "100%",
        }}
        data-overlay={`${overlay || 5}`}
      >
        <div className="container">
          <div className="row align-items-center mx-auto">
            <div className="align-items-center mx-auto">
              <h1 className="banner_title mb-4 text-center">{main_text}</h1>
              <p
                className="font-lg mx-auto text-center mb-4"
                style={{ width: "60%", fontSize: 20 }}
              >
                {sub_text}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hero_banner;
