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

    console.log(course);
    // deleteFirestorage

    const docRef = courseRef.doc(key)
    docRef.get().then(function (doc) {
        if (doc.exists) {
            const course = doc.data()

            // Removes course image
            if (course.image !== 404) {
                deleteFirestorage(course.image)
            }

            // Removes intro video
            if (course.introvideo !== 404) {
                deleteFirestorage(course.introvideo)
            }

            // Removes lessons videos
            course.lessons.forEach(lesson => {
                deleteFirestorage(lesson.video)
            })

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

    // Removes firebase document
    setTimeout(() => {
        courseRef.doc(key).delete().then(function () {
            console.log("Document successfully deleted!", key);
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });

    }, 550)
}


