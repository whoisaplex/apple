import mapstyle from './map.style.js';

const Map = {
    googleMap: new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: {lat: 59.313282, lng: 18.06616},
        styles: mapstyle, 
        disableDefaultUI: true
    }),
    setZoom(lat, lng, zoom = 17){
        this.googleMap.setCenter({lat: lat, lng: lng});
        this.googleMap.setZoom(zoom);
    }
}

class Marker {
    constructor(pos = {}, map, icon = undefined){
        this.marker = new google.maps.Marker({
            position: pos,
            map: map,
            icon: icon
        });

        // Saves the coords on the marker object
        this.coords = pos;
    }

    // When a quest icon is changed
    reRender(map, icon){
        this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            position: this.coords,
            map: map,
            icon: icon
        });
    }

    // Adds click event
    addClickEvent(callback){
        this.marker.addListener('click', callback);
    }
}

class QuestCircle {

    constructor(position, type, map){

        let color = type == 'normal' ? 'green' : type == 'unavailable' ? 'red' : 'yellow';

        this.circle = new google.maps.Circle({
            strokeColor: color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0.35,
            map: map,
            center: position,
            radius: 11
        });
    }

}



export { Map, Marker, QuestCircle };
