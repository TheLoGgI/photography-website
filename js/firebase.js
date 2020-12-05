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

function createCourse(course) {
    courseRef.add(course).then(function (docRef) {
            console.log("Document successfully written!", docRef.id)
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

function deleteCourse(course) {

    const key = course.dataset.courseid
    classToggle(course, 'removed-course')
    
    setTimeout( () => {
        courseRef.doc(key).delete().then(function() {
            console.log("Document successfully deleted!", key);
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

    }, 550)
}


