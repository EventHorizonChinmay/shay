import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


export const firebaseConfig = {
  apiKey: "AIzaSyBMVPBEFBieRjweDGav-tpWX1-JyiT-ALs",
  authDomain: "shmy-marketplace.firebaseapp.com",
  projectId: "shmy-marketplace",
  storageBucket: "shmy-marketplace.appspot.com",
  messagingSenderId: "720344757469",
  appId: "1:720344757469:web:ee2481c2486c77b4aa9734"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 