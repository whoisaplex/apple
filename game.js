import { Map, Markers, Player } from './map.js'; 
import socket from './mapmarkers.js'; 

function updatePlayerPos(position){
    if(player.lat || player.lng){
      player.marker.setMap(null);
    }
    player.updatePlayerPos(position);
    socket.emit('TeamPosUpdate', {lat: player.lat, lng: player.lng, teamID: 'SickPlayers'});
    if(!player.foundCoords){
      map.centerZoomMap({lat: player.lat, lng: player.lng}, 15);
      player.foundCoords = true;
    }
  }
  function onError(){}
  //Render all questemarkers first time
 export default function renderQuestMarkers(data){
    for(let dataID in data){
      const TempMarker = new Markers(data[dataID].lat, data[dataID].lng, map.map, 'img/placeholder.png', dataID);
      if(data[dataID].captureId != socket.id){
        if(data[dataID].isAvailable === true){                                                                         // Adds name so we can acces it when quest dialog is clicked 
          questMarkerHolder[dataID] = TempMarker.questMarker('#FBC02D', data[dataID].isAvailable, data[dataID].isBeingTaken, data[dataID].name);
        }else{
          questMarkerHolder[dataID] = TempMarker.questMarker('#D32F2F', data[dataID].isAvailable, data[dataID].isBeingTaken, data[dataID].name);
        }
      }else{
        questMarkerHolder[dataID] = TempMarker.questMarker('#388E3C', data[dataID].isAvailable, data[dataID].isBeingTaken, data[dataID].name);
      }
    }
  }
  //Update QuestMarkers
  function updateMarker(data){
    questMarkerHolder[data.id].CircleGraphics.setMap(null);
    questMarkerHolder[data.id].setMap(null);
    const TempMarker = new Markers(data.data.lat, data.data.lng, map.map, 'img/placeholder.png', data.id);
    if(data.data.captureId != socket.id){
      if(data.data.isAvailable === true){                             
        questMarkerHolder[data.id] = TempMarker.questMarker('#FBC02D', data.data.isAvailable, data.data.isBeingTaken);
      }else{
        questMarkerHolder[data.id] = TempMarker.questMarker('#D32F2F', data.data.isAvailable, data.data.isBeingTaken);
      }
    }else{
      questMarkerHolder[data.id] = TempMarker.questMarker('#388E3C', data.data.isAvailable, data.data.isBeingTaken);
    }
  }
  
  socket.on('TeamCoords', data => {
    if(TeamHolder[data.identifier]){
      //If player exist, clear the marker
      TeamHolder[data.identifier].setMap(null);
    }
    TeamHolder[data.identifier] = new Markers(data.coords.lat, data.coords.lng, map.map, 'img/TeamPlayerIcon.png', 'TeamPlayer');
    TeamHolder[data.identifier] = TeamHolder[data.identifier].playerMarker();
  });
  
  
  //Initialized
  const questMarkerHolder = [];
  const TeamHolder = [];
  const map = new Map(document.getElementById('map'), 59.332401, 18.064442, mapStyles);
  map.initMap();
  const player = new Player(null, null, 1, false);
  navigator.geolocation.watchPosition(updatePlayerPos, onError,{enableHighAccuracy: true})
  
  // Compas button, centers map
  const compass = document.querySelector('#compass');
  compass.addEventListener('click', () => {
    map.centerZoomMap();
  });