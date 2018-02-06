import { Marker } from './googlemaps.js';

// User
export default class User {

    constructor(username, id, team, socket){
        this.name = username;
        this.team = team;
        this.googleMapMarker = null;
        this.id = id;
        this.socket = socket;
        this.coords = {
            lat: 59.300198,
            lng: 17.995423
        }
    }

    logon(socket){
        socket.emit('logon', {id: this.id, team: this.team, coords: this.coords});
    }

    upDateCoords(coords, map){
        console.log('[User.upDateCoords]: coords updated on user');
        this.coords = coords;
        this.drawMarker(map);
        this.socket.emit('update-team-coords', {team: this.team, coords: this.coords, id: this.id});
    }

    drawMarker(map){
        console.log('[User.drawMarker]: new marker rendered on user');
        this.clearMarker();
        this.googleMapMarker = new Marker({lat: this.coords.lat, lng: this.coords.lng}, map, './img/playericon.png');
    }

    clearMarker(){
        if(this.googleMapMarker) {
            this.googleMapMarker.marker.setMap(null);
        }
    }
}
