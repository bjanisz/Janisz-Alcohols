import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAOpXNK26d6_F6xziJ13ILics0yZnqH3fg",
  authDomain: "janiszalcoholapp.firebaseapp.com",
  databaseURL: "https://janiszalcoholapp-default-rtdb.firebaseio.com",
  projectId: "janiszalcoholapp",
  storageBucket: "janiszalcoholapp.appspot.com",
  messagingSenderId: "162881810284",
  appId: "1:162881810284:web:999ecc3cfabb032eb8cd49",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };