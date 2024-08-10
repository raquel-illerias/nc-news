import { Route, Routes } from "react-router-dom";
import LoginHomepage from "./pages/LoginHomepage/LoginHomepage";
import ArticlesMain from "./pages/ArticlesMain/ArticlesMain";
import IndividualArticle from "./pages/IndividualArticle/IndividualArticle";
import Header from "./components/Header/Header";
import "./App.css";
import { useEffect, useState } from "react";
import { getTopics } from "./api";

export default function App() {
  const [topics, setTopics] = useState([]);

  const renderTopicRoutes = () => {
    return topics.map((topic) => {
      return (
        <Route
          key={topic.slug}
          path={`/articles?topic=${topic.slug}`}
          element={<ArticlesMain topics={topics} />}
        />
      );
    });
  };

  useEffect(() => {
    getTopics().then((data) => setTopics(data.topics));
  }, []);

  return (
    <div className="app-container">
      <div className="app-container__header-container">
        <Header />
      </div>
      <div className="app-container__routes-container">
        <Routes>
          <Route path="/" element={<LoginHomepage />} />
          <Route path="/articles" element={<ArticlesMain topics={topics} />} />
          {topics && renderTopicRoutes()}
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
