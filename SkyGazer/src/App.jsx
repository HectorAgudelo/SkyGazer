import "./App.css";
import { getAPOD } from "./APIs/NasaApi";
import getNews from "./APIs/NewsAPI";
import ArticleCard from "./components/ArticleCard";
import dummyArticles from "./dummyData";
import ImageBanner from "./components/ImageBanner";
import fetchDataFromFirebase from "./APIs/fireBase";

function App() {
  // getAPOD().then (res => console.log(res))

  // getNews().then (res => console.log(res))
const longDummy = Array(2).fill(dummyArticles).flat();
  fetchDataFromFirebase().then((res) => console.log(res));  

  return (
    <>
      {/* <h1>SkyGazer</h1> */}
      <ImageBanner/>
      {/* <div className=" flex items-center justify-center w-full h-full">
        <div className=" grid p-2 gap-6  grid-cols-1 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 w-11/12 sm:w-11/12 md:w-10/12 lg:9/12 xl:w-8/12">
          {longDummy.map((article, index) => (
            <ArticleCard
              key={index}
              id={index}
              {...article}
              cardWithDescription={
                index % 5 === 0 || index === 0 ? article.description : undefined
              }
              className={
                index % 5 === 0 || index === 0
                  ? "col-auto sm:col-auto md:col-span-2 flex-col sm:flex-col md:flex-row"
                  : "flex-col"
              }
            />
          ))}
        </div>
      </div> */}
    </>
  );
}

export default App;
