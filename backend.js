const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

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
  {lat: 59.448595 , lng: 18.076334}
]


app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

app.get('/', function(req, res){
  res.send(questPositions);
});

io.on('connection', function(socket){
  console.log(socket.id);
  socket.emit('hello', 'can you hear me?', 1, 2, 'abc');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
