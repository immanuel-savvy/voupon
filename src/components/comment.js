import React from "react";
import { date_string } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";

class Comment extends React.Component {
  constructor(props) {
    super(props);

    let { likes, dislikes, hearts } = this.props.comment;
    this.state = {
      likes: likes || 0,
      dislikes: dislikes || 0,
      hearts: hearts || 0,
    };
  }

  like_comment = async (e) => {
    e.preventDefault();

    let { comment } = this.props;
    let { likes } = this.state;
    likes++;
    this.setState({ likes });

    await post_request("comment_like", {
      comment: comment._id,
      item: comment.comment || comment.item,
    });
  };

  dislike_comment = async (e) => {
    e.preventDefault();

    let { comment } = this.props;
    let { dislikes } = this.state;
    dislikes++;
    this.setState({ dislikes });

    await post_request("comment_dislike", {
      comment: comment._id,
      item: comment.comment || comment.item,
    });
  };

  heart_comment = async (e) => {
    e.preventDefault();

    let { comment } = this.props;
    let { hearts } = this.state;
    hearts++;
    this.setState({ hearts });

    await post_request("comment_heart", {
      comment: comment._id,
      item: comment.comment || comment.item,
    });
  };

  render() {
    let { likes, dislikes, hearts } = this.state;
    let { comment } = this.props;
    let { text, name, created } = comment;

    return (
      <div class="reviews-comments-item">
        <div class="review-comments-avatar">
          <img
            src={require("../assets/img/user_image_placeholder.png")}
            class="img-fluid"
            alt=""
          />
        </div>
        <div class="reviews-comments-item-text">
          <h4>
            <a href="#">{name}</a>
            <span class="reviews-comments-item-date">
              <i class="ti-calendar theme-cl"></i>
              {date_string(created)}
            </span>
          </h4>

          <div class="listing-rating">
            <i class="fas fa-star active"></i>
            <i class="fas fa-star active"></i>
            <i class="fas fa-star active"></i>
            <i class="fas fa-star active"></i>
            <i class="fas fa-star active"></i>
          </div>
          <div class="clearfix"></div>
          <p>" {text} "</p>
          <div class="pull-left reviews-reaction">
            <a href="#" onClick={this.like_comment} class="comment-like active">
              <i class="ti-thumb-up"></i> {likes || ""}
            </a>
            <a
              href="#"
              onClick={this.dislike_comment}
              class="comment-dislike active"
            >
              <i class="ti-thumb-down"></i> {dislikes || ""}
            </a>
            <a
              href="#"
              onClick={this.heart_comment}
              class="comment-love active"
            >
              <i class="ti-heart"></i> {hearts || ""}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
