import "./App.css";
import { getAPOD } from "./APIs/NasaApi";
import getNews from "./APIs/NewsAPI";
import ArticleCard from "./components/ArticleCard";
import dummyArticles from "./dummyData";

function App() {
  // getAPOD().then (res => console.log(res))

  // getNews().then (res => console.log(res))
console.log(dummyArticles[0].description)
  return (
    <>
    <h1>SkyGazer</h1>
    <div className=" flex items-center justify-center w-full h-full">
      <div className=" grid  gap-6  grid-cols-1 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 w-9/12">
        {dummyArticles.map((article, index) => (
          <ArticleCard
            key={index}
            id={index}
            {...article}
            cardWithDescription={index === 0 || index === 5 ? article.description : undefined}
            className={index === 0 || index === 5 ? 'col-auto sm:col-auto md:col-span-2 flex-col sm:flex-col md:flex-row' : 'flex-col'}
          />
        ))}
      </div>
    </div>
  </>
  );
}

export default App;
