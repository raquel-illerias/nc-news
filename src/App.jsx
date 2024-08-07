import { Route, Routes } from "react-router-dom";
import LoginHomepage from "./pages/LoginHomepage/LoginHomepage";
import ArticlesMain from "./pages/ArticlesMain/ArticlesMain";
import IndividualArticle from "./pages/IndividualArticle/IndividualArticle";
import Header from "./components/Header/Header";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <div className="app-container__header-container">
        <Header />
      </div>
      <div className="app-container__routes-container">
        <Routes>
          <Route path="/" element={<LoginHomepage />} />
          <Route path="/articles" element={<ArticlesMain />} />
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
