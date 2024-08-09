import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCommentFromArticle,
  getIndividualArticle,
  patchVoteInArticle,
} from "../../api";
import voteIcon from "../../assets/vote-icon.svg";
import voteDownIcon from "../../assets/vote-down-icon.svg";
import "./individualArticle.css";
import ArticleComments from "../../components/ArticleComments/ArticleComments";

export default function IndividualArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);

  function handleClickVote(increment) {
    if (increment > 0 || (increment < 0 && article.votes > 0)) {
      setArticle((prevArticle) => ({
        ...prevArticle,
        votes: Math.max(prevArticle.votes + increment, 0),
      }));

      patchVoteInArticle(article_id, increment).catch(() => {
        setArticle((prevArticle) => ({
          ...prevArticle,
          votes: Math.max(prevArticle.votes - increment, 0),
        }));
      });
    }
  }

  function handleComments() {
    setShowComments(!showComments);
  }

  useEffect(() => {
    setIsLoading(true);
    getIndividualArticle(article_id)
      .then((data) => {
        setArticle(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        setIsLoading(false);
      });
  }, [article_id]);

  useEffect(() => {
    setIsLoading(true);
    getCommentFromArticle(article_id)
      .then((data) => {
        setComments(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="individual-article">
      <section className="individual-article__wrapper" key={article.article_id}>
        <div className="individual-article__info">
          <h6 className="individual-article__topic">
            {article.topic ? article.topic.toUpperCase() : ""}
          </h6>
          <h3 className="individual-article__title">{article.title}</h3>
          <img
            className="individual-article__img"
            src={article.article_img_url}
            alt="article"
          />
          <div className="individual-article__details-container">
            <h6 className="individual-article__author">{article.author}</h6>
          </div>
          <p className="individual-article__body">{article.body}</p>

          <div className="individual-article__engaging-container">
            <div
              className="individual-article__comment-block"
              onClick={handleComments}
            >
              <h5 className="individual-article__comment-text">
                Comments- {article.comment_count}
              </h5>
            </div>
            <div className="individual-article__vote-block">
              <img
                src={voteIcon}
                alt="Vote up icon"
                className="individual-article__vote-icon"
                onClick={() => handleClickVote(1)}
              />
              <h5 className="individual-article__vote-text">{article.votes}</h5>
              <img
                src={voteDownIcon}
                alt="Vote down icon"
                className="individual-article__vote-icon"
                onClick={() => handleClickVote(-1)}
              />
            </div>
          </div>
        </div>
        <ArticleComments
          comments={comments}
          setComments={setComments}
          showComments={showComments}
          article_id={article_id}
        />
      </section>
    </div>
  );
}
