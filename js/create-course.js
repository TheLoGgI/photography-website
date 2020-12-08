const _couseForm = document.getElementById('createCourse')
const _addCourse = document.getElementById('addCourse')
const _lektionsList = document.getElementById('lektions')


let _lessonCounter = 1 // Global counter for lessons
_addCourse.addEventListener('click', e => {addLektion()})

/**
 * Creates a structured object, that is sent to firebase
 * @param  {event} SubmitEvent Used to stop the default behaivor of form submit
 * @return {null}      
 */
_couseForm.addEventListener('submit', e => {
    e.preventDefault()
    document.getElementById('loading').style.display = 'flex'
    // Creates FormData object in an array-like structure
    const formData = new FormData(_couseForm)

    // Converts the formdata to an object
    const formObject = Object.fromEntries(Array.from(formData));


    toFilePath(formObject, 'image')
    toFilePath(formObject, 'introvideo')

    // Declare lessons array for later use
    const lessons = []

    // Sort object for lesson title and video
    for (const prop in formObject) {
        const index = prop.charAt(prop.length-1)

        if (prop.includes('videotitle')) {
            lessons[index] = {
                index,
                key: randomKey(),
                "title": formObject[prop]
            }
            delete formObject[prop] // videotitle property on the object 

        } else if (prop.includes('lesson')) {
            lessons[index].video = formObject[prop]
            delete formObject[prop] // lesson property on the object 
        }
    }

    // Cleans object
    lessons.shift()
    
    
    const isAllFilesResolved = []
    let totalDuration = 0

    for (const lesson of lessons) {
        isAllFilesResolved.push(toFilePath(lesson, 'video'))
    }

    console.log(isAllFilesResolved);
    
    Promise.all(isAllFilesResolved).then(videos => {
        totalDuration = videos.reduce((accumulator, duration) => accumulator + duration)

        // remove loading
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none'
            console.log('All vidoes are uploaded');
        }, 2000)
        
        formObject.lessons = lessons
        formObject.duration = Math.ceil(totalDuration)
        formObject.sold = getRandomInt(200)
        formObject.views = getRandomInt(200)
        formObject.likes = getRandomInt(200)

        console.log(formObject);

        createCourse(formObject)

        _couseForm.reset()
    })



})

/**
 * Creates a random string of different characters
 * @param  {Int} Size Determens the length of the returend string
 * @return {String}  It returns a x size random charector string  
 */
function randomKey(size = 6) {
    let charectors = '0123456789abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVXYZ',
      char = charectors.split(''),
      newString = ''
    for (let i = 0; i < size; i++) {
      newString += char[Math.floor(Math.random() * char.length)]
    }
    return newString
  }


/**
 * Inserts a new lesson, to upload a video 
 * @return {null}      
 */
function addLektion() {
    _lessonCounter++
    const html = `
    <div class="course__modules">
        <em class="course__index">${_lessonCounter}.</em>
        <div class="course__video-module">
            <label for="courselektion1">Lektions navn</label>
            <input type="text" class="input-field" name="${'videotitle'+_lessonCounter}" id="courselektion1" required>
            <div class="course__videoupload">
                <label for="${'videofil'+_lessonCounter}" class="btn btn-upload">Upload</label>
                <input type="file" class="input-image" name="${'lesson'+_lessonCounter}" id="${'videofil'+_lessonCounter}">
                <i class="fas fa-times"></i>
            </div>
        </div>
    </div>`

    _lektionsList.insertAdjacentHTML( 'beforeend',html)
    
    inputFileChangeHandler()
}


/**
 * Converts media file to database refecnce
 * @param  {Object} Formdata Object of which you want to mutate after upload
 * @param  {String} prop Specifies prop of mediafile on Formdata
 * @return {Promise}  Returns promise of successfully uploaded mediafile
 */
function toFilePath(formdata, prop) {
    let promis
    if (formdata[prop].size !== 0) {
        const name = formdata.title.replaceAll(' ', '§').toLowerCase() + `?${prop.toLowerCase()}${formdata.key ? '-' + formdata.key : ''}`
        promis = uploadFirestorage(
            formdata[prop], 
            name
        )
        
        formdata[prop] = name
            console.log(promis);
    } else {
        formdata[prop] = 404
    }

    return promis
}

/**
 * Handles change event on the file inputs
 * @return {null} 
 */
function inputFileChangeHandler() {
    const fileinputs = document.querySelectorAll('input[type="file"]')
    
    fileinputs.forEach(input => {
        input.addEventListener('change', fileTypeCheck)
    })
    
}


/**
 * Checks for the correct filetype of the mediafile
 * @param  {Event} ChangeEvent The chage event, from the addEventListner
 * @return {null}
 */
function fileTypeCheck(e) {
    const element = e.currentTarget
    const fileType = element.files[0].type
    let status = false

    let requiredFileType = []
    if (element.name !== 'image') {
        requiredFileType = ['video/mp4']
    } else {
        requiredFileType = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg']
    }
     
    for (const requiredType of requiredFileType) {
        if (fileType !== requiredType) {
            // Error
            console.error('Wrong file type', element, 'required: ' + requiredFileType.toString());
            status = false
        } else {
            status = true
        }
    }
    if (status) {
        element.style.borderBottom = '2px solid var(--clr-main)'
    } else {
        element.style.borderBottom = '2px solid var(--clr-error)'
    }

}

inputFileChangeHandler()



/**
 * Checks for the correct filetype of the mediafile
 * @param  {Int} MaxValue Determens the maximum value of the randomizer
 * @return {Int} Returns Int beteewn 0 and max
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}



