// IMPORTS
require("dotenv").config();

const schedule = require("node-schedule");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.VITE_NEWS_API_KEY);
const etlConfigs = require("./etl.config.json");

// FIRESTORE SETUP CONNECTION
const {
  getFirestoreDB,
  readData,
  writeData,
  deleteData,
} = require("./firestore");
const db = getFirestoreDB(etlConfigs.pathToServiceKey);

async function getNews(queryString, sortBy, language, dateStart) {
  let articles = await newsapi.v2.everything({
    q: queryString,
    language: language,
    sortBy: sortBy,
    from: dateStart,
  });
  return articles;
}

async function main() {
  let snapshot = await readData(db, etlConfigs.collectionName);
  snapshot.forEach(async function (doc) {
    await deleteData(db, etlConfigs.collectionName, doc.id);
    console.log("[SUCCESS] Deleted article %s", doc.id);
  });

  let result = await getNews(
    etlConfigs.query,
    etlConfigs.sortBy,
    etlConfigs.language,
    etlConfigs.dateStart
  );

  if (result.status === "ok") {
    result.articles.slice(0, etlConfigs.limit).map(async function (x) {
      let res = await writeData(db, etlConfigs.collectionName, x);
      console.log("[SUCCESS] Written article %s", res.id);
    });
  }
}

// schedule.scheduleJob("0 6 * * * ", function () {
main();
// });
