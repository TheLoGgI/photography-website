function appendCourses(course) {
    let htmlTemplate = "";
    for (let course of courses) {
        htmlTemplate += `
            <article class="all-courses-line-seperator">
                <div class="all-courses-element">
                    <a class="all-courses-image-container" href="">
                        <img class="all-courses-image" src="images/kategori1.jpg" alt="kursus-billede">
                    </a>
                    <div class="all-courses-split">
                        <div class="all-courses-text-container">
                            <div class="all-courses-text-top">
                                <h2 class="all-courses-heading">Begynder fotokursus</h2>
                                <div class="all-courses-description-container">
                                    <p class="all-courses-description">Dette kursus er for dig, der er nybegynder og
                                        gerne
                                        vil
                                        lære de basale kameratekniske færdigheder. Efter kurset vil du
                                        være i stand til at skabe en god og spændende historie med masser af dynamik
                                    </p>
                                </div>
                                <a class="all-courses-read-more" href="">Læs mere</a>
                            </div>
                            <div class="all-courses-text-button">
                                <p>6 timer • 13 lektioner • Begynder</p>
                            </div>
                        </div>
                        <div class="all-courses-price-container">
                            <div class="all-courses-price-allign">
                                <p class="all-courses-price-text">400 kr</p>
                                <button class="all-courses-price-button">Læg i kurv</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="underline-seperator">
            </article>
    `;
    }
    document.querySelector('#all-courses-placement').innerHTML = htmlTemplate;
}