const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Stopwatch = require('timer-stopwatch');
let users = {};

const questPositions = {
  id1: {lat: 59.313393, lng: 18.110012, name: 'bankomat', isAvailable: true, isBeingTaken: false},
  id2: {lat: 59.312775, lng: 18.109838, name: 'bankomat', isAvailable: true, isBeingTaken: false},
  id3: {lat: 59.313044 , lng: 18.10862, name: 'bankomat', isAvailable: true, isBeingTaken: false},
  id4: {lat: 59.331307 , lng: 17.998706, name: 'bankomat', isAvailable: true, isBeingTaken: false},
  id5: {lat: 59.330984 , lng: 17.999951, name: 'bankomat', isAvailable: true, isBeingTaken: false},
  id6: {lat: 59.331141 , lng: 17.999464, name: 'bankomat', isAvailable: true, isBeingTaken: false},
  id7: {lat: 59.331141 , lng: 17.999464, name: 'bankomat', isAvailable: true, isBeingTaken: false},
  id8: {lat: 59.298719 , lng: 17.996614, name: 'bankomat', isAvailable: true, isBeingTaken: false},
  id9: {lat: 59.300198 , lng: 17.995423, name: 'bankomat', isAvailable: true, isBeingTaken: false},
  id10:{lat: 59.300751 , lng: 17.995144, name: 'bankomat', isAvailable: true, isBeingTaken: false},
  id11:{lat: 59.447881 , lng: 18.081537, name: 'bankomat', isAvailable: true, isBeingTaken: false},
  id12:{lat: 59.449642 , lng: 18.079338, name: 'bankomat', isAvailable: true, isBeingTaken: false},
  id13:{lat: 59.448595 , lng: 18.076334, name: 'bankomat', isAvailable: true, isBeingTaken: false},
  id14:{lat: 59.370847 , lng: 17.839844, name: 'bankomat', isAvailable: true, isBeingTaken: false},
  id15:{lat: 59.371350 , lng: 17.841666, name: 'bankomat', isAvailable: true, isBeingTaken: false},
  id16:{lat: 59.372527 , lng: 17.844904, name: 'bankomat', isAvailable: true, isBeingTaken: false},
  id17:{lat: 59.368099 , lng: 17.961684, name: 'bankomat', isAvailable: true, isBeingTaken: false},
  id18:{lat: 59.367826 , lng: 17.964833, name: 'bankomat', isAvailable: true, isBeingTaken: false}
};

io.on('connection', function(socket){
  users[socket.id] = socket;
  users[socket.id].emit('sendData', questPositions);

  socket.on('changePosition', (data) =>{
    questPositions[data].isAvailable = false;
    questPositions[data].isBeingTaken = true;
    questPositions[data].captureId = socket.id;
    io.sockets.emit('updateMarker', {data: questPositions[data], id: data});
    questPositions[data].timer = new Stopwatch(3000);
    questPositions[data].timer.start();
    questPositions[data].timer.onDone(function(){
      questPositions[data].timer.stop();
      questPositions[data].isBeingTaken = false;
      io.sockets.emit('updateMarker', {data: questPositions[data], id: data});
      questPositions[data].cooldown = new Stopwatch(5000);
      questPositions[data].cooldown.start();
      questPositions[data].cooldown.onDone(function(){
        questPositions[data].cooldown.stop();
        questPositions[data].isAvailable = true;
        questPositions[data].captureId = '';
        io.sockets.emit('updateMarker', {data: questPositions[data], id: data});
      });
    });






    /*
    io.sockets.emit('updateMarker', {data: questPositions[data], id: data});
//Start timer
    questPositions[data].timer = new Stopwatch(3000); //The time it takes to take the quest.
    questPositions[data].timer.start();
//Call function when timer is done.
    questPositions[data].timer.onDone(function(){
//Change data before sending it
//***What happens when the player completes the quest***
        questPositions[data].timer.stop();
        questPositions[data].isAvailable = 'red';
        questPositions[data].captureId = socket.id;
        io.sockets.emit('updateMarker', {data: questPositions[data], id: data});
//Sets the cooldown timer for the quest to true.
        questPositions[data].cooldownIsActive = true;
        questPositions[data].cooldown = new Stopwatch(10000); //The time that the quest should not be available for anyone.
        questPositions[data].cooldown.start();
        questPositions[data].cooldown.onDone(function(){
//Set the cooldown timer for the quest to false.
          questPositions[data].cooldown.stop();
          questPositions[data].isAvailable = true;
          questPositions[data].captureId = '';
          io.sockets.emit('updateMarker', {data: questPositions[data], id: data});

        });
    });
    */
  });
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
