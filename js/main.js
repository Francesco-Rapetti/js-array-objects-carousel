const delay = ms => new Promise(res => setTimeout(res, ms));
let currentImg = 2;
let animation = false;
const imgHeight = 107.2;
const container = document.getElementById('img-container');
const textContainer = document.getElementById('text-container');
const title = document.getElementById('title');
const description = document.getElementById('description');
const arrayContainer = document.getElementById('array-container');
const upBtn = document.getElementById("up");
const downBtn = document.getElementById('down');
const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morales',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];

// last image hidden on top
arrayContainer.innerHTML = `<div class="preview"><img src="${images[images.length-1].image}"><div class="filter"></div></div>` + arrayContainer.innerHTML;
// generate side images 
for (let i = 0; i < images.length; i++) {
    container.innerHTML += `<img class="position-absolute" src="${images[i].image}">`
    arrayContainer.innerHTML += `<div class="preview"><img src="${images[i].image}"><div class="filter"></div></div>`;
}
// first image hidden at bottom
arrayContainer.innerHTML += `<div class="preview"><img src="${images[0].image}"><div class="filter"></div></div>`;
// right images array
const previews = document.getElementsByClassName('preview');
// left images array
const bigImgs = document.querySelectorAll('#img-container > *');
// middle image display
previews[3].classList.add('no-filter');
bigImgs[currentImg].style.opacity = 1;
title.innerText = images[currentImg].title;
description.innerText = images[currentImg].text;
thumbnailsInteraction();



// up button
upBtn.addEventListener("click", function() {
    shiftCardsUp(previews, true);
    changeText();
    
})

// down button
downBtn.addEventListener("click", function() {
    shiftCardsDown(previews, true);
    changeText();
})

const shiftCardsUp = async (previews, buttonDisabled) => {
    // before animations
    if (buttonDisabled) {
        buttonToggle();
    }
    animation = true;
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
    animation = false;
    if (buttonDisabled) {
        buttonToggle();
    }

    thumbnailsInteraction();
}




const shiftCardsDown = async (previews, buttonDisabled) => {
    // before animations
    if (buttonDisabled) {
        buttonToggle();
    }
    animation = true;
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
    animation = false;
    if (buttonDisabled) {
        buttonToggle();
    }

    thumbnailsInteraction();
}

const selectImage = async (i, previews) => {
    switch (i) {
        case 1:
            buttonToggle();
            shiftCardsUp(previews, false);
            await delay(510);
            shiftCardsUp(previews, true);
            buttonToggle();
            break;
        case 2:
            shiftCardsUp(previews, true);
            break;
        case 4:
            shiftCardsDown(previews, true);
            break;
        case 5:
            buttonToggle();
            shiftCardsDown(previews, false);
            await delay(510);
            shiftCardsDown(previews, true);
            buttonToggle();
            break;
        default:
            break;
        }
    changeText();
}

const changeText = async () => {
    title.style.opacity = 0;
    description.style.opacity = 0;
    
    await delay(250);
    
    title.innerHTML = images[currentImg].title;
    description.innerHTML = images[currentImg].text;
    title.style.opacity = 1;
    description.style.opacity = 1;
}

function buttonToggle() {
    upBtn.classList.toggle('disabled');
    downBtn.classList.toggle('disabled');
}

function thumbnailsInteraction() {
    Array.from(previews).forEach((preview, i) => {
        preview.addEventListener("click", function() {
            if (!animation) {
                selectImage(i, previews);
            }
        })
    });
}
