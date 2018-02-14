// Inits geolocation
export default function initGeolocation(user, Map){
    navigator.geolocation.watchPosition(onUpdatePos, onPosError);

    function onUpdatePos(pos){
        user.upDateCoords({lat: pos.coords.latitude, lng: pos.coords.longitude}, Map);
    }
    function onPosError(err){ console.log('Pos update error:', err) }
}
