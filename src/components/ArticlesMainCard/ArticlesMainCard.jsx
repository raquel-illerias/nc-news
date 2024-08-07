import { Link } from "react-router-dom";
import voteIcon from "../../assets/vote-icon.svg";
import { patchVoteInArticle } from "../../api";

export default function ArticlesMainCard({ articles, setArticles }) {
  function handleClickVote(article_id, increment) {
    patchVoteInArticle(article_id, increment).then(() => {
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.article_id === article_id
            ? { ...article, votes: article.votes + increment }
            : article
        )
      );
    });
  }

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
          </Link>
          <h3 className="article-author">
            {article.author.charAt(0).toUpperCase() +
              article.author.slice(1).toLowerCase()}
          </h3>
          <h4 className="article-topic">{article.topic.toUpperCase()}</h4>
          <div className="vote-comments-container">
            <div className="comment-block">
              <h5 className="comment-text">
                Comments: {article.comment_count}
              </h5>
            </div>
            <div className="vote-block">
              <img
                src={voteIcon}
                alt="Vote icon"
                className="vote-icon"
                onClick={() => handleClickVote(article.article_id, 1)}
              />
              <h5 className="vote-text">{article.votes}</h5>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
