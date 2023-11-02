const delay = ms => new Promise(res => setTimeout(res, ms));
let currentImg = 2;
const imgHeight = 107.2;
const container = document.getElementById('img-container');
const arrayContainer = document.getElementById('array-container');
const upBtn = document.getElementById("up");
const downBtn = document.getElementById('down');
const images = [
    "img/01.webp",
    "img/02.webp",
    "img/03.webp",
    "img/04.webp",
    "img/05.webp"
]

// last image hidden on top
arrayContainer.innerHTML = `<div class="preview"><img src="${images[images.length-1]}"><div class="filter"></div></div>` + arrayContainer.innerHTML;
// generate side images 
for (let i = 0; i < images.length; i++) {
    container.innerHTML += `<img class="position-absolute" src="${images[i]}">`
    arrayContainer.innerHTML += `<div class="preview"><img src="${images[i]}"><div class="filter"></div></div>`;
}
// first image hidden at bottom
arrayContainer.innerHTML += `<div class="preview"><img src="${images[0]}"><div class="filter"></div></div>`;
// right images array
const previews = document.getElementsByClassName('preview');
// left images array
const bigImgs = document.querySelectorAll('#img-container > *');
// middle image display
previews[3].classList.add('no-filter');
bigImgs[currentImg].style.opacity = 1;

// up button
upBtn.addEventListener("click", function() {
    shiftCardsUp(previews);
})

const shiftCardsUp = async (previews) => {
    // before animations
    upBtn.classList.add('disabled');
    previews[3].classList.remove('no-filter');
    previews[2].classList.add('no-filter');
    bigImgs[currentImg].style.opacity = 0;
    currentImg--;
    if (currentImg < 0) {
        currentImg = bigImgs.length-1;
    }
    bigImgs[currentImg].style.opacity = 1;
    let bottom = 0;
    for (let i = 0; i < previews.length; i++) {
        previews[i].style.bottom = `${bottom}px`;
    }

    await delay(500);

    // after animations
    arrayContainer.innerHTML = previews[previews.length-3].outerHTML + arrayContainer.innerHTML;
    console.log(previews[previews.length-4].outerHTML)
    previews[previews.length-1].remove();
    bottom = imgHeight;
    for (let i = 0; i < previews.length; i++) {
        previews[i].style.bottom = `${bottom}px`;
        console.log(bottom);
    }
    upBtn.classList.remove('disabled');
}

// down button
downBtn.addEventListener("click", function() {
    shiftCardsDown(previews);
})

const shiftCardsDown = async (previews) => {
    // before animations
    downBtn.classList.add('disabled');
    previews[3].classList.remove('no-filter');
    previews[4].classList.add('no-filter');
    bigImgs[currentImg].style.opacity = 0;
    currentImg++;
    if (currentImg >= bigImgs.length) {
        currentImg = 0;
    }
    bigImgs[currentImg].style.opacity = 1;
    let bottom = imgHeight * 2;
    for (let i = 0; i < previews.length; i++) {
        previews[i].style.bottom = `${bottom}px`;
        console.log(bottom);
    }

    await delay(500);

    // after animations
    arrayContainer.innerHTML += previews[2].outerHTML;
    previews[0].remove();
    bottom = imgHeight;
    for (let i = 0; i < previews.length; i++) {
        previews[i].style.bottom = `${bottom}px`;
        console.log(bottom);
    }
    downBtn.classList.remove('disabled');
}

