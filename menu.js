let gameButton = document.querySelector("#menu");
let siteButton = document.querySelector("#site-menu");
let gameSite = document.querySelector("#menu-site");
let gameMenu = document.querySelector("#menu-list");
let mapWindow = document.querySelector("#map");
let questItems = gameMenu.querySelector('.menu-container ul');
let questDialog = document.querySelector('#quest-dialog');

siteButton.addEventListener("click", function() {
    gameSite.classList.toggle("show");
});

gameButton.addEventListener("click", function() {
    gameMenu.classList.toggle("show");
});

mapWindow.addEventListener("click", function(){
    gameMenu.classList.remove("show");
});

/*  Eventlistener for the <UL> that contains quest list-items
    If the clicked target has a class of 'center-map' (font awesome icon)
    the map will center on that specific lat/lng for the quest */
questItems.addEventListener('click', function(e){
    centerMapOnQuest(getTargetPosition(e.target), map.map);
    toggleShow(gameMenu);
})

/* Returns the target ID from LI element */
function getTargetPosition(target){
    if(target.classList.contains('center-map')) {
        const questId = target.parentNode.dataset.questid;
        return {lat: positions[questId].lat, lng: positions[questId].lng};
    }
}

// Toggles the 'show' class on a specified DOM-element
function toggleShow(element) {
    element.classList.toggle('show');
}

/* Centers map on clicked quest
    TODO:
    * Use same function as in map.js */
function centerMapOnQuest(center, map){
    map.setCenter(center);
    map.setZoom(17);
}

/* Returns HTML for a quest list-item
   Each <LI> will receive the data-attribute 'questId'
   which is the key for that specific quest from the position object (so we can get the lat/lng) */
function questListItem(quest, id){
    return `<li data-questId=${id}>
                <a href="#">
                    <i class="fa fa-money fa-2x"></i>
                    <span style="margin-left: 20px;">
                        ${quest.name.toUpperCase()}
                    </span>
                </a>
                <i class="center-map fa fa-compass fa-2x" aria-hidden="true"></i>
            </li> `;
}
