import React from "react";
import { post_request } from "../assets/js/utils/services";
import Comment from "./comment";
import Listempty from "./listempty";
import Loadindicator from "./loadindicator";
import Submit_review from "./submit_review";

class Product_reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 30,
      page: 1,
    };
  }

  componentDidMount = async () => {
    let { page, limit } = this.state;
    let { product } = this.props;

    let reviews = await post_request("comments", {
      item: product._id,
      limit,
      skip: (page - 1) * limit,
    });

    this.setState({ reviews });
  };

  append_comment = (review) => {
    let { reviews } = this.state;
    if (!Array.isArray(reviews)) reviews = new Array();

    reviews = new Array(...reviews, review);

    this.setState({ reviews });
  };

  render() {
    let { reviews } = this.state;
    let { product } = this.props;

    return (
      <div className="edu_wraper">
        <h4 className="edu_title">Product Reviews</h4>

        {reviews ? (
          reviews.length ? (
            reviews.map((review) => (
              <Comment comment={review} key={review._id} />
            ))
          ) : (
            <Listempty />
          )
        ) : (
          <Loadindicator />
        )}

        <Submit_review item={product} on_comment={this.append_comment} />
      </div>
    );
  }
}

export default Product_reviews;
