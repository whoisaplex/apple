let positions;
function getMarkers(){
  const socket = io('http://localhost:3000');
  socket.on('sendData', (data) => {
    positions = data;
    renderQuestMarkers();
  });
}
