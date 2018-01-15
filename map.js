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

// User object
const user = {
  coords: {
    lat: null,
    lng: null
  },
  id: 1,
  marker: null
}

// Quest posiions
const questPositions = [
  {lat: 59.313393, lng: 18.110012},
  {lat: 59.312775, lng: 18.109838},
  {lat: 59.313044 , lng: 18.10862},
  {lat: 59.331307 , lng: 17.998706},
  {lat: 59.330984 , lng: 17.999951},
  {lat: 59.331141 , lng: 17.999464},
  {lat: 59.298719 , lng: 17.996614},
  {lat: 59.300198 , lng: 17.995423},
  {lat: 59.300751 , lng: 17.995144},
  {lat: 59.447881 , lng: 18.081537},
  {lat: 59.449642 , lng: 18.079338},
  {lat: 59.448595 , lng: 18.076334}
]

// Map element
const map = document.getElementById('map');
start = {
  lat: 59.332401,
  lng: 18.064442};
// Google maps
const googleMaps = new google.maps.Map(map, {zoom: 13, center: start, styles: mapStyles});

// Gets user position
navigator.geolocation.watchPosition(onSuccess, onError,{timeout: 0, enableHighAccuracy: true, maximumAge: Infinity})

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
  const playerMarker = newMarker(user.coords, 'img/playerIcon.png');
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
  questPositions.forEach(position => {
    const marker = newMarker(position, 'img/placeholder.png');
    questMarkers.push(marker);
    newQuestCircle(position);
    marker.addListener('click', function(){
      if(inRange(this.position)) {
        alert('in range');
      } else {
        alert('not in range');
      }
    })
  })
}
// Check if player is in range
function inRange(questPosition){
  const range = 0.0001;
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

renderQuestMarkers();

// Returns new marker
function newMarker(pos, icon = undefined){
  return new google.maps.Marker({position: pos, map: googleMaps, icon: icon});
};
// Create quest cirlcles
function newQuestCircle(position){
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
