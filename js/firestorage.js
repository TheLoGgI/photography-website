/**
 * Uploads the file, with the filename
 * @param  {File} file Image or video file, to be uploadet
 * @param  {String} Filename Name of the file in the database
 * @return {Promise} Returns the file duration or a 404 error code on rejected
 */
function uploadFirestorage(file, filename) {

    return new Promise((resolve, reject) => {

        // Create storage ref
        let storageRef = firebase.storage().ref('lessons/' + filename)

        // Upload file
        let task = storageRef.put(file)

        if (filename.includes('image')) {
            resolve('Succes')
        }

        // Update progress
        task.on('state_changed',

            function progress(snapshot) {
                // if (snapshot.bytesTransferred === snapshot.totalBytes) {
                //     console.log('Complet uploaded file from progress funktion');
                // }

            },
            function error(err) {
                console.error(err, file, filename);
            },

            function complete() {
                console.log('Complet uploaded file');

                const video = document.createElement('video')

                try {
                    video.onloadedmetadata = function () {
                        resolve(this.duration)
                    }

                    video.onerror = function () {
                        reject("Invalid video. Please select a video file.")
                    };

                    video.src = URL.createObjectURL(file)

                } catch (error) {
                    reject(error)
                }
            }
        )



    })
}

// Delete stored videos
function deleteFirestorage(path) {
    //  Create a reference to the file to delete
    let storageRef = firebase.storage().ref('lessons/' + path)

    // Delete the file
    storageRef.delete().then(function () {
        // File deleted successfully
        console.log(this, 'file removed');
    }).catch(function (error) {
        console.error(error);
        // Uh-oh, an error occurred!
    });
}

async function downloadFirestorage(path) {
    // Create a reference with an initial file path and name
    const storageRef = firebase.storage().ref('lessons/' + path)
    // Get the download URL
    const source = await storageRef.getDownloadURL().then(url => url)
    return source
}