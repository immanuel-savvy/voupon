import React from "react";
import { post_request } from "../assets/js/utils/services";
import Comment from "./comment";
import Listempty from "./listempty";
import Loadindicator from "./loadindicator";
import Ratings from "./ratings";
import Submit_review from "./submit_review";

class Voucher_reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 10,
      page: 1,
    };
  }

  componentDidMount = async () => {
    let { voucher } = this.props;
    let { limit, page } = this.state;

    let comments = await post_request("comments", {
      item: voucher._id,
      limit,
      skip: limit * (page - 1),
    });

    this.setState({ comments });
  };

  append_comment = (comment) => {
    let { comments } = this.state;
    if (!Array.isArray(comments)) comments = new Array();

    comments = new Array(...comments, comment);

    this.setState({ comments });
  };

  render() {
    let { voucher } = this.props;
    let { comments } = this.state;

    return (
      <>
        <Ratings />

        <div class="list-single-main-item fl-wrap">
          <div class="list-single-main-item-title fl-wrap">
            {comments && comments.length ? (
              <h3>
                Reviews - <span> {comments.length} </span>
              </h3>
            ) : null}
          </div>
          <div class="reviews-comments-wrap">
            {comments ? (
              comments.length ? (
                comments.map((comment) => (
                  <Comment comment={comment} key={comment._id} />
                ))
              ) : (
                <Listempty text="Be the first to review this voucher" />
              )
            ) : (
              <Loadindicator />
            )}
          </div>
        </div>

        <Submit_review voucher={voucher} on_comment={this.append_comment} />
      </>
    );
  }
}

export default Voucher_reviews;
