import { useState, useEffect } from "react";
import "./articleComments.css";
import { postComment, deleteComment } from "../../api";

export default function ArticleComments({
  showComments,
  comments,
  article_id,
  setComments,
  handleIncrementComment,
  handleDecrementComment,
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

    deleteComment(comment_id)
      .then(() => {
        setComments((state) => {
          return state.filter((comment) => comment.comment_id !== comment_id);
        });
      })
      .then(() => handleDecrementComment());
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
          handleIncrementComment();
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
              <h4>Delete</h4>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#ca0204"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
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
        <div className="comment-form__button-container">
          <button
            className="individual-article__form-button"
            onClick={handleOnClick}
          >
            POST
          </button>
        </div>
        <div className="article-comments__explanation-container">
          <p className="individual-article__form-p">
            Your comment will appear at the top of the list with your username
          </p>
          <p className="individual-article__form-p">
            A delete button will appear for comments made under your username,
            allowing you to remove them at any time
          </p>
        </div>
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
