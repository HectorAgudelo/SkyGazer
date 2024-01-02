import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ArticleList from "./components/ArticleList";
import { DetailedCard } from "./components/ArticleCard";
import Auth from "./components/Authentication";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/article/:id" element={<DetailedCard />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
