import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCu9xITPzD6jvWClIM4s-F0x-84ccgzmDg",
    authDomain: "skygazer-c38ec.firebaseapp.com",
    projectId: "skygazer-c38ec",
    storageBucket: "skygazer-c38ec.appspot.com",
    messagingSenderId: "235910315567",
    appId: "1:235910315567:web:05e00bf89f00deb40f10da",
    measurementId: "G-YFF00HNWYR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchDataFromFirestore() {
    try {
        const querySnapshot = await getDocs(collection(db, 'articles'));
        return querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error(error);
    }
}

export default fetchDataFromFirestore;

