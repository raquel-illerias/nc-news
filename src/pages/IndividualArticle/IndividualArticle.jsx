import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCommentFromArticle,
  getIndividualArticle,
  patchVoteInArticle,
} from "../../api";
import voteIcon from "../../assets/vote-icon.svg";
import voteDownIcon from "../../assets/vote-down-icon.svg";
import arrowDownIcon from "../../assets/arrow-dropdown-icon.svg";
import commentsIcon from "../../assets/comments-icon.svg";
import Lottie from "react-lottie";
import loadingAnimation from "../../animations/cat-ball-load-animation.json";
import "./individualArticle.css";
import ArticleComments from "../../components/ArticleComments/ArticleComments";

export default function IndividualArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);

  const defaultOptions = {
    loop: true,
    animationData: loadingAnimation,
  };

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

  function handleIncrementComment() {
    setArticle((prevArticle) => ({
      ...prevArticle,
      comment_count: `${Number(prevArticle.comment_count) + 1}`,
    }));
  }

  function handleDecrementComment() {
    setArticle((prevArticle) => ({
      ...prevArticle,
      comment_count: `${Number(prevArticle.comment_count) - 1}`,
    }));
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
  }, [article_id, getCommentFromArticle]);

  if (isLoading) {
    return (
      <div>
        <div className="loading-container">
          <h3>
            Please hold on, we're gathering your data. This might take a minute!
          </h3>
          <Lottie options={defaultOptions} height={360} width={360} />
        </div>
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
            <h6 className="individual-article__author">
              Written by {""}
              <span>{article.author}</span>
            </h6>
          </div>
          <p className="individual-article__body">{article.body}</p>

          <div className="individual-article__engaging-container">
            <div
              className="individual-article__comment-block"
              onClick={handleComments}
            >
              <h5 className="individual-article__comment-text">
                Comments{" "}
                <img
                  className="individual-article__img-comment"
                  src={commentsIcon}
                  alt="comments icon"
                />{" "}
                {article.comment_count}
              </h5>
              <img src={arrowDownIcon} alt="arrow dropdown icon" />
            </div>
            <div className="individual-article__vote-block">
              <img
                src={voteIcon}
                alt="Vote up icon"
                className="individual-article__vote-icon vote-up"
                onClick={() => handleClickVote(1)}
              />
              <h5 className="individual-article__vote-text">{article.votes}</h5>
              <img
                src={voteDownIcon}
                alt="Vote down icon"
                className="individual-article__vote-icon vote-down"
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
          handleIncrementComment={handleIncrementComment}
          handleDecrementComment={handleDecrementComment}
        />
      </section>
    </div>
  );
}
