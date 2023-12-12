const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

function getFirestoreDB(pathToServiceKey) {
  initializeApp({
    credential: cert(pathToServiceKey),
  });

  const db = getFirestore();
  return db;
}

async function readData(db, collectionName) {
  try {
    const snapshot = await db.collection(collectionName).get();
    return snapshot;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function writeData(db, collectionName, data) {
  try {
    const res = await db.collection(collectionName).add(data);
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function deleteData(db, collectionName, id) {
  try {
    const res = await db.collection(collectionName).doc(id).delete();
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = { getFirestoreDB, readData, writeData, deleteData };
