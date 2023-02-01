import React from "react";

class Hero_banner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { hero } = this.props;
    let { main_text, sub_text } = hero;

    return (
      <div
        className="hero_banner image-cover image_bottom h4_bg"
        style={{
          backgroundImage: `url(${require("../assets/img/hero1.png")})`,
          minHeight: "100vh",
          backgroundColor: "black",
        }}
        data-overlay="5"
      >
        <div className="container">
          <div className="row align-items-center mx-auto">
            <div>
              <h1 className="banner_title mb-4 text-center">{main_text}</h1>
              <p className="font-lg mx-auto text-center mb-4">{sub_text}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hero_banner;
