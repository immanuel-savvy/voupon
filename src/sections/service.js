import React from "react";

class Service extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { service, index } = this.props;
    if (!service) return;

    let { img, title, text } = service;

    return (
      <>
        <section className="imageblock pt-m-0">
          <div className={`imageblock__content ${index % 2 ? "left" : ""}`}>
            <div
              className="background-image-holder"
              style={{ background: `url(${img})` }}
            >
              <img alt="image" className="rounded img-fluid" src={img} />
            </div>
          </div>
          <div className="container">
            <div
              className={`row align-items-center justify-content-${
                index % 2 ? "end" : "between"
              }`}
            >
              <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
                <div className="lmp_caption">
                  <h2 className="mb-3">{title}</h2>
                  {text.split("\n").map((t, i) => (
                    <p key={i}>{t}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="clearfix"></div>
      </>
    );
  }
}

export default Service;
