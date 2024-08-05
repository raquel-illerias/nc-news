import { Route, Routes } from "react-router-dom";
import LoginHomepage from "./pages/LoginHomepage/LoginHomepage";
import ArticlesMain from "./pages/ArticlesMain/ArticlesMain";

export default function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginHomepage />}></Route>
        <Route path="/articles" element={<ArticlesMain />}></Route>
      </Routes>    
    </>
  )
}

