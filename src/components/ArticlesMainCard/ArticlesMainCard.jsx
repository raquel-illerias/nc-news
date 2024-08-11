import { Link } from "react-router-dom";
import voteIcon from "../../assets/thum-up-blue-icon.svg";
import voteDownIcon from "../../assets/thumb-down-blue-icon.svg";
import commentsIcon from "../../assets/comments-blue-icon.svg";
import { patchVoteInArticle } from "../../api";
import "./articlesMainCard.css";

export default function ArticlesMainCard({ articles, setArticles }) {
  function handleClickVote(article_id, increment) {
    setArticles((prevArticles) =>
      prevArticles.map((article) => {
        if (article.article_id === article_id) {
          const newVoteCount = article.votes + increment;
          if (increment > 0 || (increment < 0 && article.votes > 0)) {
            setArticles((updatedArticles) =>
              updatedArticles.map((updatedArticle) =>
                updatedArticle.article_id === article_id
                  ? { ...updatedArticle, votes: Math.max(newVoteCount, 0) }
                  : updatedArticle
              )
            );
            patchVoteInArticle(article_id, increment).catch(() => {
              setArticles((revertedArticles) =>
                revertedArticles.map((revertedArticle) =>
                  revertedArticle.article_id === article_id
                    ? { ...revertedArticle, votes: Math.max(article.votes, 0) }
                    : revertedArticle
                )
              );
            });
          }
        }
        return article;
      })
    );
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {articles.map((article) => (
        <div className="article-container" key={article.article_id}>
          <Link to={`/article/${article.article_id}`}>
            <div className="article__img-container">
              <img
                src={article.article_img_url}
                alt={article.title}
                className="article-image"
              />
            </div>
            <h2 className="article-title">{article.title}</h2>
            <div className="article-subtitle__container">
              <h4 className="article-topic">{article.topic.toUpperCase()}</h4>
              <h3 className="article-date">
                {formatDate(article.created_at)} | Written by{" "}
                <span className="article-author__username">
                  {article.author.charAt(0).toUpperCase() +
                    article.author.slice(1).toLowerCase()}
                </span>
              </h3>
              <h3 className="article-author"></h3>
            </div>
          </Link>
          <div className="vote-comments-container">
            <div className="comment-block">
              <h5 className="comment-text">
                Comments{" "}
                <img src={commentsIcon} alt="comment icon" width={15} />{" "}
                {article.comment_count}
              </h5>
            </div>
            <div className="vote-block">
              <img
                src={voteIcon}
                alt="Vote up icon"
                className="vote-icon vote-up"
                onClick={() => handleClickVote(article.article_id, 1)}
              />
              <h5 className="vote-text">{article.votes}</h5>
              <img
                src={voteDownIcon}
                alt="Vote down icon"
                className="vote-icon vote-down"
                onClick={() => handleClickVote(article.article_id, -1)}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
