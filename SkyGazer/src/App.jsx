import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ArticleList from "./components/ArticleList";
import { DetailedCard } from "./components/ArticleCard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/article/:id" element={<DetailedCard />} />
      </Routes>
    </Router>
  );
}

export default App;
