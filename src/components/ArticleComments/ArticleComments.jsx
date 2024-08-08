import { useState } from "react";
import "./articleComments.css";
import { postComment } from "../../api";

export default function ArticleComments({
  showComments,
  comments,
  article_id,
}) {
  const [commentValue, setCommentValue] = useState("");

  function handleChange(e) {
    setCommentValue(e.target.value);
  }

  function handleOnClick(e) {
    e.preventDefault();
    if (commentValue !== "") {
      postComment(article_id, commentValue).then((data) => {
        console.log("Comment posted:", data);
      });
    }
  }

  return (
    <div
      className={`individual-article__comments-section ${showComments ? "individual-article__comments-section--visible" : ""}`}
    >
      <h3 className="individual-article__comments-title">Comments</h3>
      <form className="individual-article__form">
        <label
          htmlFor="post-comment"
          className="individual-article__form-label"
        >
          Leave a comment about this article
        </label>
        <input
          type="text"
          name="post-comment"
          className="individual-article__form-input"
          value={commentValue}
          onChange={handleChange}
        />
        <button
          className="individual-article__form-button"
          onClick={handleOnClick}
        >
          POST
        </button>
      </form>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.comment_id} className="individual-article__comment">
            <h5 className="individual-article__author-text">
              Posted by{" "}
              <span className="individual-article__comment-author">
                {comment.author}
              </span>
            </h5>
            <p className="individual-article__comment-body">{comment.body}</p>
          </div>
        ))
      ) : (
        <p className="individual-article__no-comments">
          There are no comments yet. Be the first to post a new comment!
        </p>
      )}
    </div>
  );
}
