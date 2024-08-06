import { Link } from 'react-router-dom';
import voteIcon from '../../assets/vote-icon.svg';

export default function ArticlesMainCard({ articles }) {
  return (
    <>
      {articles.map(article => (
        <div className='article-container' key={article.article_id}>
          <Link to={`/article/${article.article_id}`}>
            <img
              src={article.article_img_url}
              alt={article.title}
              className='article-image'
            />
            <h2 className='article-title'>{article.title}</h2>
          </Link>
          <h3 className='article-author'>{article.author}</h3>
          <h4 className='article-topic'>{article.topic}</h4>
          <div className='vote-comments-container'>
            <div className='comment-block'>
              <h5 className='comment-text'>
                Comments: {article.comment_count}
              </h5>
            </div>
            <div className='vote-block'>
              <img src={voteIcon} alt='Vote icon' className='vote-icon' />
              <h5 className='vote-text'>{article.votes}</h5>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
