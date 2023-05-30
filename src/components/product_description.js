import React from "react";

class Product_description extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { product } = this.props;
    let { description, what_to_expect } = product;

    return (
      <div className="edu_wraper">
        <h4 className="edu_title">Description</h4>
        {description.split("\n").map((d, i) => (
          <p key={i}> {d}</p>
        ))}
        {what_to_expect && what_to_expect.length ? (
          <div class="edu_wraper">
            <h4 class="edu_title">What to expect</h4>
            <ul class="lists-3 row">
              {what_to_expect.map((wah, index) => (
                <li key={index} class="col-xl-4 col-lg-6 col-md-6 m-0">
                  {wah}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Product_description;
