// Map style
const mapStyles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]

// Compas button, centers map
const compass = document.querySelector('#compass');

compass.addEventListener('click', centerZoomMap);

// User object
const user = {
  coords: {
    lat: null,
    lng: null
  },
  id: 1,
  marker: null
}

// Map element
const map = document.getElementById('map');
start = {
  lat: 59.332401,
  lng: 18.064442};
// Google maps
const googleMaps = new google.maps.Map(map, {zoom: 13, center: start, styles: mapStyles});

// Gets user position
navigator.geolocation.watchPosition(onSuccess, onError,{enableHighAccuracy: true})

// Fires when position is updated
let foundCoords = false;
function onSuccess(position){
  console.log('position updated', position);
  user.coords.lat = position.coords.latitude;
  user.coords.lng = position.coords.longitude;

  if(!foundCoords) {
    centerZoomMap();
    foundCoords = true;
  }

  // Clears marker
  if(user.marker) {
    user.marker.setMap(null);
  }

  // Adds new marker
  const playerMarker = newMarker(user.coords, 'Player', 'img/playerIcon.png');
  user.marker = playerMarker;
}

// Error
function onError(error){
  console.log(error);
}

function centerZoomMap(){
  googleMaps.setCenter(user.coords);
  googleMaps.setZoom(17);
}
// Creates quest markers
const questMarkers = [];
function renderQuestMarkers(){
  /*
  positions.forEach(position => {
    console.log(position);
    const marker = newMarker(position, 'img/placeholder.png');
    questMarkers.push(marker);
    newQuestCircle(position);
    marker.addListener('click', function(){
      if(inRange(this.position)) {
        alert('in range');
      } else {
        alert('not in range');
      }
      console.log(this.title);
    })
  })
  */
  for(let objectData in positions){
    const marker = newMarker(positions[objectData], objectData, 'img/placeholder.png');
    questMarkers.push(marker);
    marker.CircleOverlay = newQuestCircle(positions[objectData]);
    marker.isAvailable = positions[objectData].isAvailable;
    marker.addListener('click', function(){
      addClickEvent(this);
      /*
      console.log(this);
      if(inRange(this.position)) {
        alert('in range');
        socket.emit('changePosition', {id: this.title, change: false});
        questMarkers.forEach((data, index, object) => {
          if(data.title === this.title){
            //Setting the questmarker and circle to null, and Removing the instance of it from questmarker variable
            data.CircleOverlay.setMap(null);
            data.setMap(null);
            object.splice(index, 1);
          }
        });
      } else {
        alert('not in range');
      }
      */
    });
  }
}

function updateMarker(data){
  /*Function is triggered when a player starts a quest, so every other
  player also get called from socket.io to update the specific quest marker
  first checks if the updated quest's ID is inside questmarker variable.
  if that is true, erease it and create a new questmarker.
  */
  questMarkers.forEach((info, index, object) => {
    if(data.id === info.title){
      info.CircleOverlay.setMap(null);
      info.setMap(null);
      object.splice(index, 1);
    }
  });

  const marker = newMarker(data.data, data.id, 'img/placeholder.png');
  questMarkers.push(marker);
  marker.CircleOverlay = newQuestCircle(data.data);
  marker.isAvailable = data.data.isAvailable;
  marker.captureId = data.data.captureId;
  marker.addListener('click', function() {
    addClickEvent(this);
  });
}

function addClickEvent(positionObject){
  if(positionObject.isAvailable === 'green'){
    if(inRange(positionObject.position)) {
      if(positionObject.captureId === socket.id){
        console.log('You already have this point');
      }
    }
  }else if(positionObject.isAvailable === 'yellow'){
    if(inRange(positionObject.position)) {
      alert('in range');
      sendUpdateMarker(positionObject);
    } else {  alert('not in range');}
  }else{
    if(inRange(positionObject.position)) {
      console.log('You cannot take this quest the time');
    }
  }
}

function sendUpdateMarker(positionObject){
  socket.emit('changePosition', {id: positionObject.title, change: 'red'});
  questMarkers.forEach((data, index, object) => {
    if(data.title === positionObject.title){
      //Setting the questmarker and circle to null, and Removing the instance of it from questmarker variable
      data.CircleOverlay.setMap(null);
      data.setMap(null);
      object.splice(index, 1);
    }
  });
}

// Check if player is in range
function inRange(questPosition){
  const range = 0.0111;
  const quest = {
    lat: questPosition.lat(),
    lng: questPosition.lng()
  }
  if(user.coords.lat < quest.lat + range &&
    user.coords.lat > quest.lat - range
    && user.coords.lng < quest.lng + range &&
    user.coords.lng > quest.lng - range) {
    return true;
  } else {
    return false;
  }
}

//renderQuestMarkers();

// Returns new marker
function newMarker(pos, id, icon = undefined){
  return new google.maps.Marker({position: pos, map: googleMaps, icon: icon, title: id});
};
// Create quest cirlcles
function newQuestCircle(position){
  if(position.isAvailable === 'red'){
    if(position.captureId === socket.id){
      return new google.maps.Circle({
        strokeColor: '#388E3C',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#4CAF50',
        fillOpacity: 0.35,
        map: googleMaps,
        center: position,
        radius: 11
       });
    }else{
     return new google.maps.Circle({
       strokeColor: '#FF0000',
       strokeOpacity: 0.8,
       strokeWeight: 2,
       fillColor: '#FF0000',
       fillOpacity: 0.35,
       map: googleMaps,
       center: position,
       radius: 11
      });
    }
  }else if(position.isAvailable === 'green'){
    //Creates a Green circle that indicates the zone is taken.
    return new google.maps.Circle({
      strokeColor: '#388E3C',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#4CAF50',
      fillOpacity: 0.35,
      map: googleMaps,
      center: position,
      radius: 11
     });
  }else{
    //Creates a yellow cirlce that indicates that the zone is unavailable
    return new google.maps.Circle({
      strokeColor: '#FBC02D',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FFEB3B',
      fillOpacity: 0.35,
      map: googleMaps,
      center: position,
      radius: 11
     });
  }
}
