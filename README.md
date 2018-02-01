# apple

### Client

#### Modules 

* geolocation.js 
* googlemaps.js
* map.style.js
* user.js 

* ui.js 

#### Entry point 
* game.js 

#### Adding dom eventlisteners: 
In ui.js in the initDOMEvents function

### Node server

#### Modules 

* events.js
* positions.js
* server.js
* sockets.js

#### Entry point
* app.js 


#### Adding new socket events: 
In events.js in the events object. Then include it in the initConnectionAndEvents function in sockets.js and pass it the socket.  