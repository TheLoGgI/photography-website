const couseForm = document.getElementById('createCourse')
const addCourse = document.getElementById('addCourse')
const _lektionsList = document.getElementById('lektions')

const _lektionsArray = [
    {
        order: 1,
        courseTitle: '',
        videoFile: ''
    }
]

addCourse.addEventListener('click', e => {
    console.log(e.currentTarget);
    renderLessons()
})

function createLesseon() {
    const courseModules = document.createElement("DIV")
    courseModules.classList.add('course__modules')

    const em = document.createElement("EM")
    em.classList.add('course__index')
    em.textContent = '2' 


    // Append
    courseModules.appendChild(em)
    console.log(courseModules);
}


function renderLessons() {
    
    // Clear lesssons
    lektionsList.innerHTML = ''

    _lektionsArray.forEach( value => {
        
        addLektion()
    })
}

function addLektion({order, title}) {
    const html = `<div class="course__modules">
                    <em class="course__index">${order}</em>
                    <div class="course__video-module">
                        <label for="courselektion1">Lektions navn</label>
                        <input type="text" class="input-field" name="title" id="courselektion1" value="${title}" >
                        <div class="course__videoupload">
                            <label for="videofile1" class="btn btn-upload">Upload</label>
                            <input type="file" class="input-image" name="image" id="videofile1">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>
                </div>`
                _lektionsList.insertAdjacentHTML
}