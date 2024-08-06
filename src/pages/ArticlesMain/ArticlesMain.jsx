import { useState, useEffect } from 'react';
import './articlesMain.css';
import { getArticles } from '../../api';
import ArticlesMainCard from '../../components/ArticlesMainCard/ArticlesMainCard';

export default function ArticlesMain() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticles().then(articlesFromApi => {
      setArticles(articlesFromApi);
      setIsLoading(false);
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
    <>
      <div className='articles-grid'>
        <ArticlesMainCard articles={articles} />
      </div>
    </>
  );
}
