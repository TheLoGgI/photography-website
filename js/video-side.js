

const _courseId = location.search.slice(7);

if (!_courseId) {
    console.error('No couse ID identified');
} else {
    const docRef  = courseRef.doc(_courseId)
    docRef.get().then(function(doc) {
        if (doc.exists) {
            // console.log("Document data:", doc.data());
            generateCourse(doc.data())
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    })
   
}


async function generateCourse(course) {
    
    const head = `
    <h2 class="kurser-overskrift">${course.title}</h2>
    <section class="video-section">
        <div class="video-element">
            <video width="100%" id="videoMonitor" src="${await downloadFirestorage(course.introvideo)}" type="video/mp4" controls poster="${await downloadFirestorage(course.image)}">
                Your browser does not support the video tag.
            </video>
        </div>
        `

       const playlist = course.lessons.reduce((acc, value) => {
            return acc + `
        <div class="episode" data-lesson="${value.index}">
            <div class="flex-episode">
                <i class="fas fa-play"></i>
                <p class="episode-titel">${value.title}</p>
                <p class="episode-timer">${durationCalculator(value.time)}</p>
            </div>
            <progress class="episode-progress" value="0" max="100"> 0% </progress>
        </div>`
       }, `<div class="playlist">
            <div class="episode active-video" data-lesson="intro">
                <div class="flex-episode">
                    <i class="fas fa-play"></i>
                    <p class="episode-titel">${course.introtitle}</p>
                    <p class="episode-timer">${durationCalculator(course.duration)}</p>
                </div>
                <progress class="episode-progress" value="0" max="100"> 0% </progress>
            </div>`) + `
       </section>
        <img src="images/Repeat Grid 11.svg" class="dots">
        
        <section class="destription-section">
        <div class="info-element">
            <h2 class="kurser-overskrift">Om dette kursus</h2>
            <p>${course.description}</p>
                <p>Det som du får ud af det:<p>
                <ul class="info-points">
                    <li>Basisk kameratekniske færdigheder</li>
                    <li>Istand til at skabe en god og spændene historie
                    til dine kunder med masser af dynamik</li>
                    <li>Blive klogere på kameraets funktioner</li>
                    <li>Kreativ fotografering</li>
                </ul>
            
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
            ut labore et dolore magna aliquyam erat, sed diam voluptua.
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren
        </div>

        <div class="stats-section">
            <div class="pris-section">
                <div class="pris-element">
                    <p>Pris for kursus</p>
                    <h2>${course.price} Kr.</h2>
                </div>
                <div class="like-icons">
                    <img src="images/Path 180.svg" class="like-button">
                    <img src="images/Group 300.svg">
                </div>
            </div>
            <a href="kurser.html" class="video_btn">Læg i kurve</a>
            <div class="stats-element">
                <div class="stat">
                    <img src="images/Group 35.svg" class="stat-img">
                    <p>Niveau</p>
                </div>
                <div class="stat">
                    <h2 class="stat-header">${Math.ceil(course.duration / 60)}</h2>
                    <p>Minutter</p>
                </div>
                <div class="stat">
                    <h2 class="stat-header">${course.lessons.length}</h2>
                    <p>Lektioner</p>
                </div>
                <div class="stat">
                    <h2 class="stat-header">${course.likes}</h2>
                    <p>Synes om</p>
                </div>
                <div class="stat">
                    <h2 class="stat-header">${course.sold}</h2>
                    <p>Købt</p>
                </div>
            </div>
        </div>
    </section>`
    document.getElementById('videoside').innerHTML = head + playlist
    videoChangeHandler(course)
}

function durationCalculator(seconds) {
    return Math.ceil(seconds / 60) + ' min';
};

function videoChangeHandler(course) {
    const episodes = document.querySelectorAll('.episode')
    episodes.forEach(element => {
        element.addEventListener('click', e => {
            episodes.forEach(item => {
                item.classList.remove('active-video')
            })
            e.currentTarget.classList.add('active-video')
            videoSource(e, course)
        })
    })
}

async function videoSource(e, course) {
    const video = document.getElementById('videoMonitor')
    const lessonKey = e.currentTarget.dataset.lesson
    console.log(lessonKey);
    if (lessonKey !== 'intro') {
        const lecture = course.lessons.find( element => {
            return element.index === lessonKey ? element : lessonKey
        })
        video.src = await downloadFirestorage(lecture.video)

    } else {
        video.src = await downloadFirestorage(course.introvideo)
    }
}

