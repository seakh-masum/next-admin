import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmBwliVUvXbDk8KndKaAdB-sYB-dIBgZ4",
  authDomain: "fir-2ad3f.firebaseapp.com",
  databaseURL:
    "https://fir-2ad3f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-2ad3f",
  storageBucket: "fir-2ad3f.appspot.com",
  messagingSenderId: "485150548383",
  appId: "1:485150548383:web:43fa905b25cd196510ddaa",
  measurementId: "G-N23M5VGK1W",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    return res;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth).then((res) => {
    if (res) eraseCookie('user');
  })
};


export {
  auth,
  db,
  signInWithGoogle,
  logout,
  googleProvider
};