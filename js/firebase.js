
/**
 * Creates a document on firebase, with a random id
 * @param  {Object} course Object of course data
 * @return {null} 
 */
function createCourse(course) {
    courseRef.add(course).then(function (docRef) {
        console.log("Document successfully written!", docRef.id)
    })
    .catch(function (error) {
        console.error("Error writing document: ", error);
    });
}

/**
 * Deletes firebase document for course and mediafiles
 * @param  {Object} course Object of course data
 * @return {null} 
 */
function deleteCourse(course) {

    const key = course.dataset.courseid
    classToggle(course, 'removed-course')

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

    // Waits for animation
    }, 550)
}


