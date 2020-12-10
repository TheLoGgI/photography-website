
        function uploadFirestorage(file, filename) {

            console.log(file, filename);
            // Create storage ref
            let storageRef = firebase.storage().ref('lessons/' + filename)
       
            // Upload file
            let task = storageRef.put(file)


            // Update progress
            task.on('state_changed',

                function progress(snapshot) {
                    // let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    // console.log(percentage);
                },
                function error(err) {
                    console.error(err, file, filename);
                },

                function complete() {
                    console.log('Complet uploaded file');
                    
                }
            )

            return new Promise((resolve, reject) => {
                if (filename.includes('image')) {
                    resolve('Succes')
                }
                const video = document.createElement('video')

                try {
                    video.onloadedmetadata = function() {
                        resolve(this.duration)
                    }

                    video.onerror = function() {
                        reject("Invalid video. Please select a video file.")
                    };
    
                    video.src = URL.createObjectURL(file)

                } catch(error) {
                    reject(error)
                }

            })
        }

    // Delete stored videos
    function deleteFirestorage(path) {
        //  Create a reference to the file to delete
        let storageRef = firebase.storage().ref('lessons/' + path)

        // Delete the file
        storageRef.delete().then(function() {
            // File deleted successfully
            console.log(this, 'file removed');
        }).catch(function(error) {
            console.error(error);
            // Uh-oh, an error occurred!
        });
    }

    async function downloadFirestorage(path) {
        // Create a reference with an initial file path and name
        const storageRef = firebase.storage().ref('lessons/' + path)
        // Get the download URL
        const source = await storageRef.getDownloadURL().then( url => url)
        return source
    }

        
    
                