import firebase from "firebase";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDfeImGjt3jIV42WT3iTrSSxUVI1q9ir_s",
  authDomain: "guinfra-prod.firebaseapp.com",
  databaseURL: "https://guinfra-prod.firebaseio.com",
  projectId: "guinfra-prod",
  storageBucket: "guinfra-prod.appspot.com",
  messagingSenderId: "968109501506",
  appId: "1:968109501506:web:973b2abcd9b692547291db",
  measurementId: "G-EZ767GWSZB"
};

// Initialize Firebase
if (typeof window !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  if (
    "measurementId" in firebaseConfig &&
    process.env.FB_ENV === "production"
  ) {
    firebase.analytics();
  }
}

export { firebase };
