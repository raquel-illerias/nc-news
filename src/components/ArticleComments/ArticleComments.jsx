import { useState, useEffect } from "react";
import "./articleComments.css";
import { postComment } from "../../api";

export default function ArticleComments({
  showComments,
  comments,
  article_id,
  setComments,
}) {
  const [commentValue, setCommentValue] = useState("");
  const [allComments, setAllComments] = useState(comments);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  function handleChange(e) {
    setCommentValue(e.target.value);
  }

  function handleOnClick(e) {
    e.preventDefault();
    if (commentValue !== "") {
      postComment(article_id, commentValue)
        .then((data) => {
          console.log(data.data.comment);
          setComments((state) => {
            const copyComments = [...state];
            copyComments.unshift(data.data.comment);
            return copyComments;
          });
        })
        .then(() => setOpenSnackBar(true));
    }
  }

  function renderComments() {
    return allComments.length > 0 ? (
      allComments.map((comment) => (
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
    );
  }

  useEffect(() => {
    setAllComments(comments);
  }, [comments]);

  useEffect(() => {
    function myTimeout() {
      setTimeout(() => {
        setOpenSnackBar(false);
      }, 4000);
    }
    if (openSnackBar) {
      myTimeout();
    }
    return () => clearTimeout(myTimeout);
  }, [openSnackBar]);

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
      {openSnackBar && (
        <div className="article-comments__success-container">
          <p className="article-comments__success-p">
            Success! Your comment was posted
          </p>
        </div>
      )}
      {renderComments()}
    </div>
  );
}
