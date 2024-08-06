import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentFromArticle, getIndividualArticle } from "../../api";
import voteIcon from "../../assets/vote-icon.svg";
import "./individualArticle.css";
import ArticleComments from "../../components/ArticleComments/ArticleComments";

export default function SingleItemPage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);

  function handleComments() {
    setShowComments(!showComments);
  }

  useEffect(() => {
    setIsLoading(true);
    getIndividualArticle(article_id).then((data) => {
      setArticle(data);
      setIsLoading(false);
    });
  }, [article_id]);

  useEffect(() => {
    getCommentFromArticle(article_id).then((data) => {
      setComments(data);
    });
  }, []);

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="individual-article">
      <section className="individual-article__wrapper">
        <div className="individual-article__details" key={article.article_id}>
          <img
            className="individual-article__img"
            src={article.article_img_url}
            alt="article"
          />
          <div className="individual-article__info">
            <h3 className="individual-article__title">{article.title}</h3>
            <div className="individual-article__details-container">
              <h6 className="individual-article__author">{article.author}</h6>
              <h6 className="individual-article__topic">{article.topic}</h6>
            </div>
            <p className="individual-article__body">{article.body}</p>
          </div>
          <div className="individual-article__engaging-container">
            <div
              className="individual-article__comment-block"
              onClick={handleComments}
            >
              <h5 className="individual-article__comment-text">
                Comments: {article.comment_count}
              </h5>
            </div>
            <div className="individual-article__vote-block">
              <img
                src={voteIcon}
                alt="Vote icon"
                className="individual-article__vote-icon"
              />
              <h5 className="individual-article__vote-text">{article.votes}</h5>
            </div>
          </div>
        </div>
        <ArticleComments comments={comments} showComments={showComments} />
      </section>
    </div>
  );
}
