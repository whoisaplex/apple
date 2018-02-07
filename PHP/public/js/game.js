import { Map, Marker, QuestCircle } from './modules/googlemaps.js';
import ui from './ui/ui.js';
import User from './modules/user.js';
import initGeolocation from './modules/geolocation.js';
import play from './modules/play.js';

console.log(globalUser);
// Game 'controller'
const game = {
    /*  When a user connects
     these are updated to reflect
     the server side object */
    questPositions: null,
    questMarkers: {},
    socket: null,
    teamplayers: {},

    // Inits all socket events
    initEvents(socket, user){
        this.socket = socket;
        socket.on('init-quest-positions', this.onInitQuestPositions.bind(this));
        socket.on('start-quest', this.onPlayerStartedQuest.bind(this));
        socket.on('quest-ended', this.onQuestEnd.bind(this));
        socket.on('cooldown-ended', this.onCoolDownEnd.bind(this));
        socket.on('logon', this.onTeamLogon.bind(this));
        socket.on('super-nice-team', this.onTeamUpdateCoords.bind(this));
        console.log('[game.initEvents]: socket events initialized')
    },

    onTeamUpdateCoords(teamplayer) {
      console.log(teamplayer);
      if(this.teamplayers[teamplayer.id]) {
        this.teamplayers[teamplayer.id].marker.setMap(null);
      }
      this.teamplayers[teamplayer.id] = new Marker(teamplayer.coords, Map.googleMap, './img/hacker.png');
      console.log(this.teamplayers[teamplayer.id].marker);
    },

    // When a team member logs on
    onTeamLogon(teamMember){
        if(teamMember.id != user.id) {
            console.log('[game.onTeamLogon]: team member loged on', teamMember);
        }
    },

    // When quest positions are received from node
    // renders quest list and inits eventlisteners
    onInitQuestPositions(positions){
        this.questPositions = positions;
        ui.render('questlist', positions);
        this.renderQuestMarkers();
        ui.initDOMListeners(user, this.questPositions, this.startQuest.bind(this));
        console.log('[game.onInitQuestPositions]: questpositions initialized')
    },

    // When a player starts a quest, receives updated questpostion from node
    onPlayerStartedQuest(startedQuest, id){
        this.questPositions[id] = startedQuest;
        this.questMarkers[id].reRender(Map.googleMap, './img/warning.png');
        console.log('[game.onPlayerStartedQuest]: player started quest, marker was changed')
    },

    // Requests quest postions from node
    requestQuestPositions(socket){
        socket.emit('init-quest-positons');
        console.log('[game.requestQuestPositions]: questpostions requested from client')
    },

    // Renders all quest markers when user logs in
    renderQuestMarkers(){
        for(let id in this.questPositions) {
            const newQuestMarker = new Marker({
                lat: this.questPositions[id].lat,
                lng: this.questPositions[id].lng
            }, Map.googleMap, './img/placeholder.png');

            new QuestCircle({lat: this.questPositions[id].lat, lng: this.questPositions[id].lng}, 'normal', Map.googleMap);

            newQuestMarker.id = id;
            // Adds listeners to all markers
            newQuestMarker.marker.addListener('click', ()=>{
                ui.render('quest-dialog', this.questPositions[id], id);
            })
            this.questMarkers[id] = newQuestMarker;
        }
        console.log('[game.renderQuestMarkers]: questpositions received and questmarkers rendered')
    },

    // When quest is started checks if quest is available
    startQuest(questId){
        if(this.playerInRange.call(this, this.questMarkers[questId]))
        {
            if(this.questPositions[questId].isAvailable) {
                play(this.questPosition[questId].type)
                console.log('[game.startQuest]: quest started', questId)
                this.socket.emit('start-quest', questId);
            } else {
                console.log('[game.startQuest]: quest not avail', questId);
            }
        }
        else
        {
            console.log('[game.startQuest]: player was not in range to start quest', questId)
        }

    },

    // When quest ends, updates marker
    onQuestEnd(questId){
        this.questPositions[questId].isBeingTaken = false;
        this.questMarkers[questId].reRender(Map.googleMap, './img/cooldown.png');
        console.log('[game.onQuestEnd]: quest ended, cooldown started and marker changed...', questId);
    },

    // When quest cooldown ends, updates marker
    onCoolDownEnd(questId){
        this.questPositions[questId].isAvailable = true;
        this.questMarkers[questId].reRender(Map.googleMap, './img/blue.png');
        this.questMarkers[questId].addClickEvent(()=>{
            ui.render('quest-dialog', this.questPositions[questId], questId);
        });
        console.log('[game.onCoolDownEnd]: cooldown ended quest is now avail, marker changed', questId)
    },

    // Checks if player is in range of a questposition
    playerInRange(questPosition){
        const range = 0.0001;
        const inLat =  questPosition.coords.lat;
        const inLng = questPosition.coords.lng;

        const x = user.coords.lat - inLat;
        const y = user.coords.lng - inLng;

        const r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        console.log('x', x, 'y',y, 'r', r);

        if(
            // user.coords.lat < inLat + range &&
            // user.coords.lat > inLat - range &&
            // user.coords.lng < inLng + range &&
            // user.coords.lng > inLng - range
            r <= range
        )
        {
            console.log('[game.playerInRange]: true');
            return true;
        }
        else
        {
            console.log('[game.playerInRange]: false');
            return false;
        }
    }
}

/* TESTING */
const mockUsers = [
    {username: 'Daniel', id: 1337, team: 'Hackermen'},
    {username: 'Robbin', id: 1338, team: 'Hackermen'},
    {username: 'Simon', id: 1339, team: 'Hackermen'},
    {username: 'Alexander', id: 1340, team: 'Hackermen'},
    {username: 'Björn', id: 1341, team: 'Hackermen'}
    //{username: 'Vladimir Putin', id: 1342, team: 'Russia'}
]
function getRandomMockUser(){
    return mockUsers[Math.floor(Math.random() * mockUsers.length)];
}
const mockUser = getRandomMockUser();
/* TESTING */


// Socket, user, geolocation and map initialized
const socket = io('http://localhost:8080');
const user = new User(socket);

// Fetch user details from api
fetch(`https://development.test/api/user/${globalUser}`).then(response => {
  response.json().then(json => {
    user.id = json[0].id;
    user.team = json[0].team_id;
    user.name = json[0].username;
  });
}).catch(e => {
    console.log(e, 'failed to get user from api');
});

user.logon(socket);

game.initEvents(socket, user);
game.requestQuestPositions(socket);

initGeolocation(user, Map, socket);
