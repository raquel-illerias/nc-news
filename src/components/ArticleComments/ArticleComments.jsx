import "./articleComments.css";

export default function ArticleComments({ showComments, comments }) {
  return (
    <div
      className={`individual-article__comments-section ${showComments ? "individual-article__comments-section--visible" : ""}`}
    >
      <h3 className="individual-article__comments-title">Comments</h3>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.comment_id} className="individual-article__comment">
            <h5 className="individual-article__comment-author">
              {comment.author}
            </h5>
            <p className="individual-article__comment-body">{comment.body}</p>
          </div>
        ))
      ) : (
        <p className="individual-article__no-comments">
          There are no comments yet. Be the first one to post
        </p>
      )}
    </div>
  );
}
