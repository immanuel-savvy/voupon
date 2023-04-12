import React from "react";

class Product_description extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { product } = this.props;
    let { description } = product;

    return description.split("\n").map((d, i) => <p key={i}> {d}</p>);
  }
}

export default Product_description;
