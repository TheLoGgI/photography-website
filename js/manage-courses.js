
const _coursesList = document.getElementById('courses')

const fdb = document.getElementById('missingCourses')
const gridLabels = document.getElementById('gridLabels')

courseRef.onSnapshot(function (snapshotData) {
    let courses = [];
    snapshotData.forEach(function (doc) {
        let course = doc.data();
        course.id = doc.id;
        courses.push(course);
        addDataPoint(myChart, {sold: course.sold, title: course.title})

    });

    if (courses.length === 0) {
        fdb.style.display = 'block'
        gridLabels.style.display = 'none'
    }  else {
        fdb.style.display = 'none'
        gridLabels.style.display = 'grid'
    }

    appendCourses(courses);
    removeBtnEventHandler()
  });


/**
 * Renders course elements to page
 * @param  {Object} Courses An object of the course to be rendered
 * @return {Null}
 */
function appendCourses(courses) {

    const htmlTemplate = courses.reduce((acc, {id, title, sold, views, likes}) => {
        return acc + `
        <div class="page__course" data-courseid="${id}">
        <p class="course__title">${title}</p>
        <p class="course__sales">${sold}</p>
        <p class="course__views">${views}</p>
        <p class="course__likes">${likes}</p>
        <div class="button-actions">
            <button class="btn btn-edit">Rediger</button>
            <button class="btn btn-delete" title="Slet kursus">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    </div>`
   }, '')

    _coursesList.innerHTML = htmlTemplate;

  }

  /**
 * Creates eventlistners for every delete button
 * @return {null} 
 */
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

  
let spaService = new SpaService("adminstration");
window.pageChange = function() {
spaService.pageChange();
}