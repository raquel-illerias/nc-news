import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import LoginHomepage from "./pages/LoginHomepage/LoginHomepage";
import ArticlesMain from "./pages/ArticlesMain/ArticlesMain";
import IndividualArticle from "./pages/IndividualArticle/IndividualArticle";
import Header from "./components/Header/Header";
import "./App.css";
import { useEffect, useState } from "react";
import { getTopics } from "./api";

export default function App() {
  const [topics, setTopics] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [internalQueryProperties, setInternalQueryProperties] = useState({
    sortBy: "author",
    order: "asc",
    topic: undefined,
  });

  const location = useLocation();

  const initialPath = "/articles?sort_by=author&order=asc";

  const handleUpdateTopic = (e, topic) => {
    e.preventDefault();
    setInternalQueryProperties((state) => ({
      ...state,
      topic: topic,
    }));
  };

  const handleUpdateOrder = (e, order) => {
    e.preventDefault();
    setInternalQueryProperties((state) => ({
      ...state,
      order: order,
    }));
  };

  const handleUpdateSortBy = (e, sortBy) => {
    e.preventDefault();
    setInternalQueryProperties((state) => ({
      ...state,
      sortBy: sortBy,
    }));
  };

  const resetInternalQueryProperties = () => {
    setInternalQueryProperties(() => ({
      sortBy: "author",
      order: "asc",
      topic: undefined,
    }));
  };

  useEffect(() => {
    getTopics().then((data) => setTopics(data.topics));
  }, []);

  useEffect(() => {
    if (internalQueryProperties.topic) {
      setSearchParams({
        sort_by: internalQueryProperties.sortBy,
        order: internalQueryProperties.order,
        topic: internalQueryProperties.topic,
      });
    } else {
      setSearchParams({
        sort_by: internalQueryProperties.sortBy,
        order: internalQueryProperties.order,
      });
    }
  }, [internalQueryProperties]);

  useEffect(() => {
    if (location.search === "?sort_by=author&order=asc") {
      resetInternalQueryProperties();
    }
  }, [location.search]);

  return (
    <div className="app-container">
      <div className="app-container__header-container">
        <Header initialPath={initialPath} />
      </div>
      <div className="app-container__routes-container">
        <Routes>
          <Route
            path="/"
            element={<LoginHomepage initialPath={initialPath} />}
          />
          <Route
            path="/articles"
            element={
              <ArticlesMain
                topics={topics}
                searchParams={searchParams}
                handleUpdateTopic={handleUpdateTopic}
                handleUpdateOrder={handleUpdateOrder}
                handleUpdateSortBy={handleUpdateSortBy}
              />
            }
          />
          <Route path="/article/:article_id" element={<IndividualArticle />} />
          <Route
            path="/article/:article_id/comments"
            element={<IndividualArticle />}
          />
        </Routes>
      </div>
    </div>
  );
}
