import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDYAPN7dqN9hNhcUsSqvOV9TR1uaQO4X44",
  authDomain: "tdgrapheditor.firebaseapp.com",
  projectId: "tdgrapheditor",
  storageBucket: "tdgrapheditor.firebasestorage.app",
  messagingSenderId: "1024118358060",
  appId: "1:1024118358060:web:a610a9c9367917c9421189",
  measurementId: "G-4WZD0C07T0"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export default app;