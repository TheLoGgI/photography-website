
courseRef.onSnapshot(function (snapshotData) {
    snapshotData.forEach(function (doc) {
        let course = doc.data();
        appendCourse(course);
    });
});

async function appendCourse({ description, difficulty, duration, title, image, lessons, price }) {
    const htmlTemplate = `
            <div class="all-courses-line-seperator">
                <div class="all-courses-element">
                    <a class="all-courses-image-container" href="video-side.html">
                        <img class="all-courses-image" src="${await downloadFirestorage(image)}" alt="kursus-billede">
                    </a>
                    <div class="all-courses-split">
                        <div class="all-courses-text-container">
                            <div class="all-courses-text-top">
                                <h2 class="all-courses-heading">${title}</h2>
                                <div class="all-courses-description-container">
                                    <p class="all-courses-description">${description}</p>
                                </div>
                                <a class="all-courses-read-more" href="video-side.html">Læs mere</a>
                            </div>
                            <div class="all-courses-text-button">
                                <p>${durationCalculator(duration)} • ${lessons.length} lektioner • ${difficulty}</p>
                            </div>
                        </div>
                        <div class="all-courses-price-container">
                            <div class="all-courses-price-allign">
                                <p class="all-courses-price-text">${price} kr</p>
                                <button class="all-courses-price-button">Læg i kurv</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="underline-seperator">
            </div>
    `;
    document.querySelector('#all-courses-placement').insertAdjacentHTML("beforebegin", htmlTemplate);
}

function durationCalculator(seconds) {
    let timeCalculated = Math.ceil(seconds / 60);
    if (timeCalculated > 1) {
        return timeCalculated + " minutter";
    }
    else {
        return timeCalculated + " minut";
    }
};