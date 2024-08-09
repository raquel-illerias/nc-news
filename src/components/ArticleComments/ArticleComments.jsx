import { useState, useEffect } from "react";
import "./articleComments.css";
import { postComment, deleteComment } from "../../api";
import deleteIcon from "../../assets/delete-icon.svg";

export default function ArticleComments({
  showComments,
  comments,
  article_id,
  setComments,
}) {
  const [commentValue, setCommentValue] = useState("");
  const [allComments, setAllComments] = useState(comments);
  const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);
  const [openErrorSnackBar, setOpenErrorSnackBar] = useState(false);

  function handleChange(e) {
    setCommentValue(e.target.value);
  }

  function handleDeleteComment(e, comment_id) {
    e.preventDefault();

    deleteComment(comment_id).then(() => {
      setComments((state) => {
        return state.filter((comment) => comment.comment_id !== comment_id);
      });
    });
  }

  function handleOnClick(e) {
    e.preventDefault();
    if (commentValue !== "") {
      postComment(article_id, commentValue)
        .then((data) => {
          setComments((state) => {
            const copyComments = [...state];
            copyComments.unshift(data.data.comment);
            return copyComments;
          });
        })
        .then(() => {
          setOpenSuccessSnackBar(true);
          setCommentValue("");
        });
    } else {
      setOpenErrorSnackBar(true);
    }
  }

  function renderComments() {
    return allComments.length > 0 ? (
      allComments.map((comment) => (
        <div
          key={comment.comment_id}
          className="article-comments__comment-container"
        >
          <div className="individual-article__comment">
            <h5 className="individual-article__author-text">
              Posted by{" "}
              <span className="individual-article__comment-author">
                {comment.author}
              </span>
            </h5>
            <p className="individual-article__comment-body">{comment.body}</p>
          </div>
          {comment.author === localStorage.getItem("username") && (
            <div
              className="article-comments__delete-container"
              onClick={(e) => handleDeleteComment(e, comment.comment_id)}
            >
              <img src={deleteIcon} alt="delete comment icon" />
              <h4>Delete comment</h4>
            </div>
          )}
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
        setOpenSuccessSnackBar(false);
      }, 4000);
    }
    if (openSuccessSnackBar) {
      myTimeout();
    }
    return () => clearTimeout(myTimeout);
  }, [openSuccessSnackBar]);

  useEffect(() => {
    function myTimeout() {
      setTimeout(() => {
        setOpenErrorSnackBar(false);
      }, 4000);
    }
    if (openErrorSnackBar) {
      myTimeout();
    }
    return () => clearTimeout(myTimeout);
  }, [openErrorSnackBar]);

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
      {openSuccessSnackBar && (
        <div className="article-comments__success-container">
          <p className="article-comments__success-p">
            Success! Your comment was posted
          </p>
        </div>
      )}
      {openErrorSnackBar && (
        <div className="article-comments__error-container">
          <p className="article-comments__error-p">Comments cannot be blank</p>
        </div>
      )}
      {renderComments()}
    </div>
  );
}
