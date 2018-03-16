# StreetHack - Apple
This is a online, GPS-based, team and singleplayer game. Adapted for mobileusage.
Hack ATM's and earn experiance and bitcoints.

## Client

#### Modules 

* geolocation.js 
* googlemaps.js
* map.style.js
* user.js 

* ui.js 

#### Entry point 
* game.js 

#### Client socket.io receiving events

*   socket.on('init-quest-positions', this.onInitQuestPositions.bind(this));
    - When the user receives quest positions from node.  

*   socket.on('start-quest', this.onPlayerStartedQuest.bind(this)); 
    - When a player starts a quest (changes markers). 

*   socket.on('quest-ended', this.onQuestEnd.bind(this));   
    - When a player ends a quest (changes markers).  

*   socket.on('cooldown-ended', this.onCoolDownEnd.bind(this));
    - When the cooldown ends for a quest (changes markers).  

*   socket.on('logon', this.onTeamLogon.bind(this)); 
    - When a player logs on. Emited from the client when loged on, gets response from node if player is in the same team. 

#### Adding dom eventlisteners: 
In ui.js in the initDOMEvents function. 

## Node server

#### Modules 

* events.js
* positions.js
* server.js
* sockets.js

#### Entry point
* app.js 


#### Adding new socket events: 
Add the event in events.js in the events object. Then include it in the initConnectionAndEvents function in sockets.js and pass it the socket as a parameter. 

# Get it running
## Laravel 

### Requirments
1. Composer
2. PHP & MySQL or alt. Vagrient/other envirement (LAMP/MAMP etc)
3. npm install
4. React

### Process
1. Env-file 
	- ```cd ./apple/PHP/```
	- Edit the .env-file ```sudo nano .env```
		- Add the db-credentials
2. Run the command: ```php artisan key:generate```to generate a uniqe key for your envirement.
2. Install dependencies:
	- ```composer install```
	- ```npm install```
	- ```npm run dev```
3. Create database:
	- php artisan migrate
4. For connecting with the Node server (Socket.io) change the url in ```resources\assets\js\game.js```

## Node
### Process
1. To configure the port edit ```server/app.js```, currently is ```8080```
2. Run ```npm install``` to install dependencies
3. To start the server, run ```npm start```

Visit the page with the ```https://```-protocol.
