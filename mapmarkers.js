let positions;
let socket;
//const timerLiner = document.getElementById('timerLiner');

function getMarkers(){
  socket = io('http://localhost:3000');
  socket.on('sendData', (data) => {
    positions = data;
    renderQuestMarkers(data);
    renderQuestItemList();
  });
}
getMarkers();

socket.on('updateMarker', (data) => {
  updateMarker(data);
});

/*
socket.on('timerData', (data) => {
  let woah = (parseFloat(data) * 100);
  timerLiner.style.width = woah + '%';
});
*/

/* Loops trough the positions object
   and renders HTML for each item */
function renderQuestItemList(){
  questItems.innerHTML = '';
  for(let id in positions) {
    questItems.innerHTML += questListItem(positions[id], id);
  }
}
