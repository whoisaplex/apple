/*
green #388E3C
yellow #FBC02D
red #D32F2F
*/
class Map{
  constructor(mapHolder, startX, startY, mapStyle){
    this.mapHolder = mapHolder;
    this.startPos = {lat: startX, lng: startY};
    this.mapStyle = mapStyle;
  }
  initMap(){
    this.map = new google.maps.Map(this.mapHolder, {zoom: 13, center: this.startPos, styles: this.mapStyle});
  }
  centerZoomMap(){
    this.map.setCenter({lat: player.lat, lng: player.lng});
    this.map.setZoom(17);
  }
}

class Markers{
  constructor(lat, lng, map, icon = undefined, title){
    this.lat = lat;
    this.lng = lng;
    this.map = map;
    this.icon = icon;
    this.title = title;
  }
  playerMarker(){
    return new google.maps.Marker({position: {lat: this.lat, lng: this.lng}, map: this.map, icon: this.icon, title: this.title});
  }
  questMarker(color, available, taken){
    let TempQuestMarker = new google.maps.Marker({position: {lat: this.lat, lng: this.lng}, map: this.map, icon: this.icon, title: this.title});
    TempQuestMarker.isAvailable = available;
    TempQuestMarker.isBeingTaken = taken;
    TempQuestMarker.CircleGraphics = this.questCircleGraphics({lat: this.lat, lng: this.lng}, color);
    TempQuestMarker.addListener('click', () => {
      this.questClickHandle(TempQuestMarker);
    });
    return TempQuestMarker;
  }
  questClickHandle(data){
    if(player.inRange(data)){
      if(data.isAvailable === true && data.isBeingTaken === false){
        socket.emit('changePosition', data.title);
      }else{
        console.log('Quest could not be taken now');
      }
    }else{
      console.log('Player is not in range');
    }
  }
  questCircleGraphics(position, color){
    return new google.maps.Circle({
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.35,
      map: map.map,
      center: position,
      radius: 11
     });
  }
}

class Player{
  constructor(lat, lng, id, foundCoords){
    this.lat = lat;
    this.lng = lng;
    this.id = id;
    this.foundCoords = foundCoords;
  }
  updatePlayerPos(position){
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
    this.marker = new Markers(this.lat, this.lng, map.map, 'img/playerIcon.png', 'Player');
    this.marker.playerMarker();
  }
  inRange(data){
    const range = 0.0011;
    const inLat =  data.position.lat();
    const inLng = data.position.lng();
    if(player.lat < inLat + range && player.lat > inLat - range && player.lng < inLng + range && player.lng > inLng - range){
      return true;
    }else{
      return false;
    }
  }
}

function updatePlayerPos(position){
  if(player.lat || player.lng){
    player.marker.setMap(null);
  }
  player.updatePlayerPos(position);
  if(!player.foundCoords){
    map.centerZoomMap();
    player.foundCoords = true;
  }
}
function onError(){}
function renderQuestMarkers(data){
  for(let dataID in data){
    const TempMarker = new Markers(data[dataID].lat, data[dataID].lng, map.map, 'img/placeholder.png', dataID);
    if(data[dataID].captureId != socket.id){
      if(data[dataID].isAvailable === true){
        questMarkerHolder[dataID] = TempMarker.questMarker('#FBC02D', data[dataID].isAvailable, data[dataID].isBeingTaken);
      }else{
        questMarkerHolder[dataID] = TempMarker.questMarker('#D32F2F', data[dataID].isAvailable, data[dataID].isBeingTaken);
      }
    }else{
      questMarkerHolder[dataID] = TempMarker.questMarker('#388E3C', data[dataID].isAvailable, data[dataID].isBeingTaken);
    }
  }
}
function updateMarker(data){
  questMarkerHolder[data.id].CircleGraphics.setMap(null);
  questMarkerHolder[data.id].setMap(null);
  const TempMarker = new Markers(data.data.lat, data.data.lng, map.map, 'img/placeholder.png', data.id);
  if(socket.id === data.data.captureId){
    questMarkerHolder[data.id] = TempMarker.questMarker('#388E3C', data.data.isAvailable, data.data.isBeingTaken);
  }else{
    questMarkerHolder[data.id] = TempMarker.questMarker('#D32F2F', data.data.isAvailable, data.data.isBeingTaken);
  }
}
//Initialized
const questMarkerHolder = [];
const map = new Map(document.getElementById('map'), 59.332401, 18.064442, mapStyles);
map.initMap();
const player = new Player(null, null, 1, false);
navigator.geolocation.watchPosition(updatePlayerPos, onError,{enableHighAccuracy: true})

// Compas button, centers map
const compass = document.querySelector('#compass');
compass.addEventListener('click', () => {
  map.centerZoomMap();
});
