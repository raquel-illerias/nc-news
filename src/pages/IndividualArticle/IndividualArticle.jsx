import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIndividualArticle } from "../../api";
import voteIcon from '../../assets/vote.svg';
import "./individualArticle.css"

export default function SingleItemPage() {
  
    const {article_id} = useParams();
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
   
    useEffect(() => {
        setIsLoading(true);
        getIndividualArticle(article_id)
        .then((data) => {
            console.log(data)
            setArticle(data)
            setIsLoading(false)
        })
    }, [])

    if(isLoading) {
        return (
          <div>
            <h2>Loading...</h2>
        </div>
        )
    }

    return (
        <div className="individual-article__container">
        <section className="individual-article__wrapper">
          <div className="individual-article__details" key={article.article_id}>
            <img className="individual-article__img" src={article.article_img_url} alt="article" />
            <div className="individual-article__info">
              <h3 className="individual-article__title">{article.title}</h3>
              <div className="individual-article__details-container">
                <h6>{article.author}</h6>
                <h6>{article.topic}</h6>
              </div>
              <p className="individual-article__body">{article.body}</p>
            </div>
            <div className="individual-article__engaging-container">
                <div className="comment-block">
                    <h5 className="comment-text">Comments: {article.comment_count}</h5>
              </div>
              <div className="vote-block">
                <img src={voteIcon} alt="Vote icon" className="vote-icon" />
                <h5 className="vote-text">{article.votes}</h5>
              </div>
            </div>
          </div>
        </section>
      </div>
      
    ) 
 }