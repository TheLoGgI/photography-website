
        function uploadFirestorage(file, filename) {

            // Create storage ref
            let storageRef = firebase.storage().ref('lessons/' + filename)

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


                