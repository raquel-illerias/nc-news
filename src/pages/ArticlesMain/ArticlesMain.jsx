import { useState, useEffect } from "react";
import "./articlesMain.css";
import { getArticles } from "../../api";
import ArticlesMainCard from "../../components/ArticlesMainCard/ArticlesMainCard";
import { Link, useSearchParams } from "react-router-dom";

export default function ArticlesMain({ topics }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const renderTopics = () => {
    return topics.map((topic) => {
      return (
        <Link
          key={topic.slug}
          to={`/articles?topic=${topic.slug}`}
          className="topic__links"
        >
          {topic.slug}
        </Link>
      );
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getArticles(searchParams.get("topic")).then((articlesFromApi) => {
      setArticles(articlesFromApi);
      setIsLoading(false);
    });
  }, [searchParams]);

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <div className="topics__container">
        <p className="topic__header">Topics</p>
        <div className="topic__links-container">{topics && renderTopics()}</div>
      </div>
      <div className="articles-grid">
        <ArticlesMainCard articles={articles} setArticles={setArticles} />
      </div>
    </>
  );
}
