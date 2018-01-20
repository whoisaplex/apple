let positions;
let socket;

function getMarkers(){
  socket = io('http://localhost:3000');
  socket.on('sendData', (data) => {
    renderQuestMarkers(data);
  });
}
getMarkers();

socket.on('updateMarker', (data) => {
  updateMarker(data);
});
