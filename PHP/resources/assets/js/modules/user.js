import { Marker } from './googlemaps.js';

// User
export default class User {

    constructor(socket, id, name, team_id){
        this.name = name;
        this.team = team_id;
        this.googleMapMarker = null;
        this.id = id;
        this.socket = socket;
        this.coords = {
            lat: null,
            lng: null
        },
        this.inGame = false; 
        this.geolocationInitialized = false; 
    }

    logon(socket){
        socket.emit('logon', {id: this.id, team: this.team, coords: this.coords});
    }

    upDateCoords(coords, Map){

        console.log('[User.upDateCoords]: coords updated on user');
        this.coords = coords;
        this.drawMarker(Map.googleMap);
        this.socket.emit('update-team-coords', {team: this.team, coords: this.coords, id: this.id});

        /* Sets the map to the players position 
         * the first time geolocation is updated */ 
        if(!this.geolocationInitialized) {
            Map.setZoom(this.coords.lat, this.coords.lng);
            this.geolocationInitialized = true; 
        }
    }

    drawMarker(map){
        console.log('[User.drawMarker]: new marker rendered on user');
        this.clearMarker();
        this.googleMapMarker = new Marker({lat: this.coords.lat, lng: this.coords.lng}, map, 'https://' + window.location.hostname + '/img/playericon.png');
    }

    clearMarker(){
        if(this.googleMapMarker) {
            this.googleMapMarker.marker.setMap(null);
        }
    }
}
