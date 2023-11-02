const container = document.getElementById('img-container');
const arrayContainer = document.getElementById('array-container');
const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');
const images = [
    "img/01.webp",
    "img/02.webp",
    "img/03.webp",
    "img/04.webp",
    "img/05.webp"
]

let selected;
arrayContainer.innerHTML = `<div class="preview"><img src="${images[images.length-1]}"></div>` + arrayContainer.innerHTML;
for (let i = 0; i < images.length; i++) {
    arrayContainer.innerHTML += `<div class="preview"><img src="${images[i]}"></div>`;
}
arrayContainer.innerHTML += `<div class="preview"><img src="${images[0]}"></div>`;

