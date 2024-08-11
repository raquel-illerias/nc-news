import { useState, useEffect } from "react";
import "./articlesMain.css";
import { getArticles } from "../../api";
import ArticlesMainCard from "../../components/ArticlesMainCard/ArticlesMainCard";

export default function ArticlesMain({
  topics,
  searchParams,
  handleUpdateTopic,
  handleUpdateOrder,
  handleUpdateSortBy,
}) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const renderTopics = () => {
    return topics.map((topic) => {
      return (
        <button
          key={topic.slug}
          onClick={(e) => handleUpdateTopic(e, topic.slug)}
          className="topic__buttons"
        >
          {topic.slug}
        </button>
      );
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getArticles(
      searchParams.get("sort_by"),
      searchParams.get("order"),
      searchParams.get("topic")
    ).then((articlesFromApi) => {
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
        <div className="topic__buttons-container">
          {topics && renderTopics()}
        </div>
        <div className="sorting__container">
          <div className="sorting__input">
            <label htmlFor="sortBy">Sort by:</label>
            <select
              name="sortBy"
              id="sortBy"
              value={searchParams.get("sort_by")}
              onChange={(e) => handleUpdateSortBy(e, e.target.value)}
            >
              <option value="author">Author</option>
              <option value="title">Title</option>
              <option value="article_id">Article id</option>
              <option value="topic">Topic</option>
              <option value="created_at">Created at</option>
              <option value="votes">Votes</option>
              <option value="article_img_url">Article img URL</option>
              <option value="comment_count">Comment count</option>
            </select>
          </div>
          <div className="sorting__input">
            <label htmlFor="orderBy">Order by:</label>
            <select
              name="orderBy"
              id="orderBy"
              value={searchParams.get("order")}
              onChange={(e) => handleUpdateOrder(e, e.target.value)}
            >
              <option value="asc">Ascending order</option>
              <option value="desc">Descending Order</option>
            </select>
          </div>
        </div>
      </div>
      <div className="articles-grid">
        <ArticlesMainCard articles={articles} setArticles={setArticles} />
      </div>
    </>
  );
}
