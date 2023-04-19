import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_KEY_FIRE_BASE,
  authDomain: "my-app-c7d1c.firebaseapp.com",
  projectId: "my-app-c7d1c",
  storageBucket: "my-app-c7d1c.appspot.com",
  messagingSenderId: "226950561739",
  appId: "1:226950561739:web:fcd829cb3c9e4d0203004e",
  measurementId: "G-W9F7LZZQNT",
};
const app = initializeApp(firebaseConfig);
export default app;
