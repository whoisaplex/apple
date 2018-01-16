let positions;
let socket;

function getMarkers(){
  socket = io('http://localhost:3000');
  socket.on('sendData', (data) => {
    positions = data;
    renderQuestMarkers();
  });
}
getMarkers();

socket.on('updateMarker', (data) => {
  updateMarker(data);
});
