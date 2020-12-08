const firebaseConfig = {
    apiKey: "AIzaSyDPbFk0Ky8FwQyg-mGNwE_9v3vsJ9_Wvwg",
    authDomain: "profffffoto.firebaseapp.com",
    projectId: "profffffoto",
    storageBucket: "profffffoto.appspot.com",
    messagingSenderId: "208520902677",
    appId: "1:208520902677:web:4bda5a51902cd13701b61c"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const courseRef = db.collection("courses");