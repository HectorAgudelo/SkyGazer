import "./App.css";
import { getAPOD } from "./APIs/NasaApi";
import getNews from "./APIs/NewsAPI";
import ArticleCard from "./components/ArticleCard";
import dummyArticles from "./dummyData";
import fetchDataFromFirebase from "./APIs/fireBase";

function App() {
  // getAPOD().then (res => console.log(res))

  // getNews().then (res => console.log(res))

  fetchDataFromFirebase().then((res) => console.log(res));  

  return (
    <>
      <h1>SkyGazer</h1>
      <div className="flex flex-wrap">
        {dummyArticles.map((article, index) => (
          <ArticleCard
            key={index}
            image={article.urlToImage}
            title={article.title}
            time={article.publishedAt}
            content={article.content}
            author={article.author}
          />
        ))}
      </div>
    </>
  );
}

export default App;
