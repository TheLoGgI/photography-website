
        function uploadFirestorage(file, filename) {

            // Create storage ref
            let storageRef = firebase.storage().ref('lessons/' + filename)

            console.log(file[0].duration);
            console.dir(file);

            // Upload file
            let task = storageRef.put(file)

            let isFulfilled
            // Update progress
            task.on('state_changed',

                function error(err) {
                    isFulfilled = err
                },

                function complete() {
                    console.log('Complet uploaded file');
                    isFulfilled = 'Success'
                }
            )

            return new Promise((resolve, reject) => {
                if (!isFulfilled === 'Success') {
                    reject(isFulfilled)
                } else {
                    resolve('Success')
                }
            })
        }

        // Delete stored videos


                