import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const prod = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const dev = {
  apiKey: process.env.REACT_APP_API_KEY_DEV,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN_DEV,
  projectId: process.env.REACT_APP_PROJECT_ID_DEV,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_DEV,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_DEV,
  appId: process.env.REACT_APP_APP_ID_DEV,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID_DEV,
};

const firebaseConfig = process.env.REACT_APP_ENV === "prod" ? prod : dev;

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const analytics = getAnalytics(firebaseApp);

export { db, storage, analytics };
