 // Set the configuration for your app
        // TODO: Replace with your app's config object
        var firebaseConfig = {
            apiKey: "AIzaSyDPbFk0Ky8FwQyg-mGNwE_9v3vsJ9_Wvwg",
            authDomain: "profffffoto.firebaseapp.com",
            projectId: "profffffoto",
            storageBucket: "profffffoto.appspot.com",
            messagingSenderId: "208520902677",
            appId: "1:208520902677:web:4bda5a51902cd13701b61c"
        };
        firebase.initializeApp(firebaseConfig);
        // Get elements
        const fileButton = document.getElementById("videofile1")
        const progressfile = document.getElementById("progressfile")

        fileButton.addEventListener('change', e => {

            // Get file
            let file = e.target.files[0]

            // Create storage ref
            let storageRef = firebase.storage().ref('lessons/' + file.name)

            // Upload file
            let task = storageRef.put(file)

            // Update progress
            task.on('state_changed',

                function progress(snapshot) {
                    let persentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    progressfile.value = persentage
                },  

                function error(err) {
                    console.error(err);
                },

                function complete() {
                    console.log('Complet uploaded file');
                    progressfile.style.backgroundColor = 'green'
                }
            )
        })