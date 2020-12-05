
const _coursesList = document.getElementById('courses')

const fdb = document.getElementById('missingCourses')


courseRef.onSnapshot(function (snapshotData) {
    let courses = [];
    snapshotData.forEach(function (doc) {
      let course = doc.data();
      course.id = doc.id;
      courses.push(course);
    });

    if (!courses) {
        fdb.style.display = 'none'
    }  else {
        fdb.style.display = 'block'
    }

    appendCourses(courses);
    removeBtnEventHandler()
  });


/**
 * Renders course elements to page
 * @param  {Array} Courses An array of the coures to be rendered
 * @return {Null}
 * @credit cederdorff - GITHUB - https://github.com/cederdorff/mdu-e19front/blob/master/firebase-user-crud/js/main.js
 */
function appendCourses(courses) {
    let htmlTemplate = "";
    for (let {id, title, sold, views, likes} of courses) {
      htmlTemplate += `
      <div class="page__course" data-courseid="${id}">
                        <p class="course__title">${title}</p>
                        <p class="course__sales">Solgt : 
                            <span class="sold">${sold}</span>
                        </p>
                        <p class="course__views">Visninger : 
                            <span class="views">${views}</span>
                        </p>
                        <p class="course__likes">Synes om : 
                            <span class="likes">${likes}</span>
                        </p>
                        <div class="button-actions">
                            <button class="btn btn-edit">Rediger</button>
                            <button class="btn btn-delete" title="Slet kursus">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
      `;
    }

    _coursesList.innerHTML = htmlTemplate;
  }

  function removeBtnEventHandler() {
      const courses = document.querySelectorAll('.page__course .btn-delete')
      courses.forEach(element => {
        element.addEventListener('click', e => {
            deleteCourse(e.currentTarget.parentNode.parentNode)
          })
      })
  }



  
  /**
 * Toggles class on an element
 * @param  {String | Element} elementID element or id of the element you want to toggle
 * @param  {String} className Classname of class you want to toggle 
 * @return {Null | Element} returns the element of the class toggled
 */
  function classToggle(element, className) {
      console.log(typeof element);
    if (typeof element === 'string') {
        document.getElementById(element)
            .classList.toggle(className)
        return document.getElementById(element) 
    } else if(typeof element === 'object') {
        element.classList.toggle(className)
        return element
    } 
    return null
}