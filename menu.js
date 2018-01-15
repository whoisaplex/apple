let gameButton = document.querySelector("#menu");
let siteButton = document.querySelector("#site-menu");
let gameSite = document.querySelector("#menu-site");
let gameMenu = document.querySelector("#menu-list");
let mapWindow = document.querySelector("#map");



siteButton.addEventListener("click", function() {
    gameSite.classList.toggle("show");
});

gameButton.addEventListener("click", function() {
    gameMenu.classList.toggle("show");
});

mapWindow.addEventListener("click", function(event) {
    gameMenu.classList.remove("show");
})
