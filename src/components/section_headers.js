import React from "react";

class Section_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { title, description, color_title } = this.props;

    return (
      <div class="row justify-content-center">
        <div class="col-lg-7 col-md-8">
          <div class="sec-heading center">
            {title || color_title ? (
              <h2>
                {title} <span class="theme-cl">{color_title}</span>
              </h2>
            ) : null}
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Section_header;
