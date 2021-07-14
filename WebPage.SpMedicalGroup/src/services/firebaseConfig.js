import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCsy7Knv8nHWbR5lSUrAX4o_8ndY2Ur8Qg",
  authDomain: "spmedicalgroup-database-api.firebaseapp.com",
  databaseURL: "https://spmedicalgroup-database-api.firebaseio.com",
  projectId: "spmedicalgroup-database-api",
  storageBucket: "spmedicalgroup-database-api.appspot.com",
  messagingSenderId: "334193342301",
  appId: "1:334193342301:web:0db1bcb5e2b41477"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

