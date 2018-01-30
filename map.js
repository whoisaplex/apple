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
  centerZoomMap(coords, zoom = 10){
    this.map.setCenter(coords);
    this.map.setZoom(zoom);
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
  questMarker(color, available, taken, questName){
    let TempQuestMarker = new google.maps.Marker({position: {lat: this.lat, lng: this.lng}, map: this.map, icon: this.icon, title: this.title});
    // Adds 'name', 'available' and 'taken' property to marker object
    TempQuestMarker.questName = questName; 
    TempQuestMarker.isAvailable = available;
    TempQuestMarker.isBeingTaken = taken;
    TempQuestMarker.CircleGraphics = this.questCircleGraphics({ lat: this.lat, lng: this.lng }, color);
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
    
    questDialog.classList.add("show");
    questDialog.innerHTML = '';
    questDialog.innerHTML += `
      <div id="quest-dialog-info">
        <div id="quest-dialog-name"><h4>${data.questName} (${data.title})</h4></div>
        <div id="quest-dialog-status">${data.isAvailable === false && data.isBeingTaken === true ? 'Otillgänglig <i class="fa fa-times-circle-o red" aria-hidden="true"></i>' : 'Tillgänglig <i class="fa fa-check-circle-o green" aria-hidden="true"></i>'}</div>
      </div>

      <div id="quest-dialog-progress">
      ${data.isAvailable === false && data.isBeingTaken === true ? '<progress id="quest-dialog-cooldown" value="60" max="100"></progress>' : data.isAvailable === true ? 'Du kan ta denna quest' : '<progress id="quest-dialog-taking" value="22" max="100"></progress>' }
      </div>

      <div id="quest-dialog-loot">
        ${data.isAvailable === false && data.isBeingTaken === true ? 'Questen måste vara tillgängligt för att se denna info!' : '<div id="quest-dialog-cash">$0</div><div id="quest-dialog-xp">0 XP</div>' }
      </div>

      <div id="quest-dialog-buttons">
        <button id="quest-dialog-go" ${data.isAvailable === false && data.isBeingTaken === true ? 'class="btn-sm btn-secondary" disabled' : 'class="btn-sm btn-success"' } >Kör</button><button id="quest-dialog-cancel" class="btn-sm btn-primary">Avbryt</button>
      </div>
      `

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
    // Render marker 
    this.marker = this.marker.playerMarker();
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

export { Map, Markers, Player }; 
