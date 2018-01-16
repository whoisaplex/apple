const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
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
  id1: {lat: 59.313393, lng: 18.110012, name: 'bankomat', isActive: true},
  id2: {lat: 59.312775, lng: 18.109838, name: 'bankomat', isActive: true},
  id3: {lat: 59.313044 , lng: 18.10862, name: 'bankomat', isActive: true},
  id4: {lat: 59.331307 , lng: 17.998706, name: 'bankomat', isActive: true},
  id5: {lat: 59.330984 , lng: 17.999951, name: 'bankomat', isActive: true},
  id6: {lat: 59.331141 , lng: 17.999464, name: 'bankomat', isActive: true},
  id7: {lat: 59.331141 , lng: 17.999464, name: 'bankomat', isActive: true},
  id8: {lat: 59.298719 , lng: 17.996614, name: 'bankomat', isActive: true},
  id9: {lat: 59.300198 , lng: 17.995423, name: 'bankomat', isActive: true},
  id10:{lat: 59.300751 , lng: 17.995144, name: 'bankomat', isActive: true},
  id11:{lat: 59.447881 , lng: 18.081537, name: 'bankomat', isActive: true},
  id12:{lat: 59.449642 , lng: 18.079338, name: 'bankomat', isActive: true},
  id13:{lat: 59.448595 , lng: 18.076334, name: 'bankomat', isActive: true},
  id14:{lat: 59.370847 , lng: 17.839844, name: 'bankomat', isActive: true},
  id15:{lat: 59.371350 , lng: 17.841666, name: 'bankomat', isActive: true},
  id16:{lat: 59.372527 , lng: 17.844904, name: 'bankomat', isActive: true},
  id17:{lat: 59.368099 , lng: 17.961684, name: 'bankomat', isActive: true},
  id18:{lat: 59.367826 , lng: 17.964833, name: 'bankomat', isActive: true}
};

io.on('connection', function(socket){
  users[socket.id] = socket;
  users[socket.id].emit('sendData', questPositions);

  socket.on('changePosition', (data) =>{
    questPositions[data.id].isActive = data.change;
    console.log(questPositions[data.id]);
  });

});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
