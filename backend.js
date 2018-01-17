const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Stopwatch = require('timer-stopwatch');
let users = {};

/*
const questPositions = [
  {lat: 59.313393, lng: 18.110012, name: 'bankomat'},
  {lat: 59.312775, lng: 18.109838, name: 'bankomat'},
  {lat: 59.313044 , lng: 18.10862, name: 'bankomat'},
  {lat: 59.331307 , lng: 17.998706, name: 'bankomat'},
  {lat: 59.330984 , lng: 17.999951},
  {lat: 59.331141 , lng: 17.999464},
  {lat: 59.298719 , lng: 17.996614},
  {lat: 59.300198 , lng: 17.995423},
  {lat: 59.300751 , lng: 17.995144},
  {lat: 59.447881 , lng: 18.081537},
  {lat: 59.449642 , lng: 18.079338},
  {lat: 59.448595 , lng: 18.076334},
  {lat: 59.370847 , lng: 17.839844},
  {lat: 59.371350 , lng: 17.841666},
  {lat: 59.372527 , lng: 17.844904},
  {lat: 59.368099 , lng: 17.961684},
  {lat: 59.367826 , lng: 17.964833}
];
*/
const questPositions = {
  id1: {lat: 59.313393, lng: 18.110012, name: 'bankomat', isAvailable: 'yellow'},
  id2: {lat: 59.312775, lng: 18.109838, name: 'bankomat', isAvailable: 'yellow'},
  id3: {lat: 59.313044 , lng: 18.10862, name: 'bankomat', isAvailable: 'yellow'},
  id4: {lat: 59.331307 , lng: 17.998706, name: 'bankomat', isAvailable: 'yellow'},
  id5: {lat: 59.330984 , lng: 17.999951, name: 'bankomat', isAvailable: 'yellow'},
  id6: {lat: 59.331141 , lng: 17.999464, name: 'bankomat', isAvailable: 'yellow'},
  id7: {lat: 59.331141 , lng: 17.999464, name: 'bankomat', isAvailable: 'yellow'},
  id8: {lat: 59.298719 , lng: 17.996614, name: 'bankomat', isAvailable: 'yellow'},
  id9: {lat: 59.300198 , lng: 17.995423, name: 'bankomat', isAvailable: 'yellow'},
  id10:{lat: 59.300751 , lng: 17.995144, name: 'bankomat', isAvailable: 'yellow'},
  id11:{lat: 59.447881 , lng: 18.081537, name: 'bankomat', isAvailable: 'yellow'},
  id12:{lat: 59.449642 , lng: 18.079338, name: 'bankomat', isAvailable: 'yellow'},
  id13:{lat: 59.448595 , lng: 18.076334, name: 'bankomat', isAvailable: 'yellow'},
  id14:{lat: 59.370847 , lng: 17.839844, name: 'bankomat', isAvailable: 'yellow'},
  id15:{lat: 59.371350 , lng: 17.841666, name: 'bankomat', isAvailable: 'yellow'},
  id16:{lat: 59.372527 , lng: 17.844904, name: 'bankomat', isAvailable: 'yellow'},
  id17:{lat: 59.368099 , lng: 17.961684, name: 'bankomat', isAvailable: 'yellow'},
  id18:{lat: 59.367826 , lng: 17.964833, name: 'bankomat', isAvailable: 'yellow'}
};

io.on('connection', function(socket){
  users[socket.id] = socket;
  users[socket.id].emit('sendData', questPositions);

  socket.on('changePosition', (data) =>{
    questPositions[data.id].isAvailable = data.change;
    questPositions[data.id].captureId = socket.id;
    io.sockets.emit('updateMarker', {data: questPositions[data.id], id: data.id});
//Start timer
    questPositions[data.id].timer = new Stopwatch(3000); //The time it takes to take the quest.
    questPositions[data.id].timer.start();
//Call function when timer is done.
    questPositions[data.id].timer.onDone(function(){
//Change data before sending it
//***What happens when the player completes the quest***
        questPositions[data.id].timer.stop();
        questPositions[data.id].isAvailable = 'red';
        questPositions[data.id].captureId = socket.id;
        io.sockets.emit('updateMarker', {data: questPositions[data.id], id: data.id});
//Sets the cooldown timer for the quest to true.
        questPositions[data.id].cooldownIsActive = true;
        questPositions[data.id].cooldown = new Stopwatch(10000); //The time that the quest should not be available for anyone.
        questPositions[data.id].cooldown.start();
        questPositions[data.id].cooldown.onDone(function(){
//Set the cooldown timer for the quest to false.
          questPositions[data.id].cooldown.stop();
          questPositions[data.id].isAvailable = 'yellow';
          questPositions[data.id].captureId = '';
          io.sockets.emit('updateMarker', {data: questPositions[data.id], id: data.id});

        });
    });
  });

});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
