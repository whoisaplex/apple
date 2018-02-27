import { Map } from '../modules/googlemaps.js';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// DOM elements
const menu = document.querySelector('#menu'),
    questList = document.querySelector('#menu-list'),
    compass = document.querySelector('#compass'),
    questDialog = document.querySelector('#quest-dialog'),
    siteMenu = document.querySelector("#site-menu"),
    questGame = document.querySelector("#quest-game"),
    progressBar = document.querySelector('#questTimerMenu'),
    progress = document.querySelector('#questProgress');

// Inits all eventlisteners for the menu-UI
const initDOMListeners = function(user, positions, startQuestCallback){

    // Shows the quest list
    menu.addEventListener('click', function(){
        document.querySelector('#menu-list').classList.toggle('show');
    })

    // Profile drop down
    siteMenu.addEventListener('click', function(){
        document.querySelector('#menu-site').classList.toggle('show');
    })

    // Centers the map on the user
    compass.addEventListener('click', function(){
        Map.setZoom(user.coords.lat, user.coords.lng);
    })

    // Centers map on clicked quest
    questList.addEventListener('click', function(e){
        if(e.target.classList.contains('center-map')){
            const questId = e.target.parentNode.dataset.questid;
            Map.setZoom(positions[questId].lat, positions[questId].lng);
            document.querySelector('#menu-list').classList.toggle('show');
        }
    })

    // Quest dialog events
    questDialog.addEventListener('click', function(event) {

        // Starts quest
        if(event.target.id == 'start-quest') {
            const questId = event.target.parentNode.parentNode.dataset.questid;

            console.log('QUEST NAME: ' + event.target.parentNode.parentNode.dataset.name)
            questDialog.classList.remove("show");
            startQuestCallback(questId);
        }
  
        // Closes quest dialog
        if(event.target.id == 'cancel') {
            questDialog.classList.remove("show");
        }
    })
}

// Updates the in game menu. 
// Fires when player completes a quest 
function updateGameMenu(){
    document.querySelector('#menu-site object').data = 'https://development.test/home';
}

function updateProgressBar(time){
  progressBar.classList.add('show');

  let max = time;
  let value = max;

  let interval = setInterval(function(){
    tick();
    //console.log(progress.value, value)
  },50)

  function tick(){
    value-=50;
    let wow = (value/max)*100;
      if (value <= 0) {
      clearProgressInterval();
      progress.value = 0;
      console.log('cleared')
      document.querySelector('#questTimerMenu').classList.remove('show');
    } else {
      progress.value = wow;
    }
  }
  
    function clearProgressInterval() { clearInterval(interval); }  
    window.addEventListener('message', function (e) {
        clearProgressInterval();
    }); 

}

// Renders all quests on logon
function renderQuestList(quests){
    questList.querySelector('.menu-container ul').innerHTML = "";
    for(let id in quests) {
        questList.querySelector('.menu-container ul')
            .innerHTML += `
            <li data-questid=${id}>
                <a href="#">
                    <i class="fa fa-money fa-2x"></i>
                    <span style="margin-left: 20px;">
                        ${quests[id].name.toUpperCase()}
                        (${quests[id].area.toUpperCase()})
                    </span>
                </a>
                <i class="center-map fa fa-compass fa-2x" aria-hidden="true"></i>
            </li> `;
    }
}

// Opens quest dialog and renders HTML
function renderQuestDialog(position, id){
    console.log(position)
  
    let questName = position.name.capitalize() + " " +  position.area.capitalize() + " (#" + id + ")"
    
    questDialog.classList.add("show");
    questDialog.dataset.questid = id;
    questDialog.dataset.name = questName;
    questDialog.dataset.questTimer = position.questTimer;
    questDialog.querySelector('#quest-dialog-name h4').innerHTML = questName;
    questDialog.querySelector('#quest-dialog-cash').innerHTML = "<i class=\"fa fa-bitcoin\"></i> " + position.currency;
    questDialog.querySelector('#quest-dialog-xp').innerHTML = position.xp + "xp";

    localStorage.setItem("questName", questName);
    
}

/*
** Renders something in the menu-UI
** depending on the type that was sent in
** ...data = parameters that the render needs, for example questpostions */
function render(type, ...data){
    switch(type) {
        case 'questlist':
            renderQuestList(...data);
            break;
        case 'quest-dialog':
            renderQuestDialog(...data);
            break;
        case 'update-game-menu':
            updateGameMenu();
            break;
        case 'start-progress-bar': 
            updateProgressBar(...data);
            break; 
        default:
            break;
    }
}

const ui = {
    render,
    initDOMListeners
}

export default ui;
