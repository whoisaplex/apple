/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 197);
/******/ })
/************************************************************************/
/******/ ({

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(198);


/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_ui_js__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_user_js__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_geolocation_js__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_play_js__ = __webpack_require__(203);






console.log(globalUser);

var game = {
    /*  When a user connects
     these are updated to reflect
     the server side object */
    questPositions: null,
    questMarkers: {},
    socket: null,
    teamplayers: {},

    // Inits all socket events
    initEvents: function initEvents(socket, user) {
        this.socket = socket;
        socket.on('init-quest-positions', this.onInitQuestPositions.bind(this));
        socket.on('start-quest', this.onPlayerStartedQuest.bind(this));
        socket.on('quest-ended', this.onQuestEnd.bind(this));
        socket.on('cooldown-ended', this.onCoolDownEnd.bind(this));
        socket.on('logon', this.onTeamLogon.bind(this));
        socket.on('super-nice-team', this.onTeamUpdateCoords.bind(this));
        console.log('[game.initEvents]: socket events initialized');
    },
    onTeamUpdateCoords: function onTeamUpdateCoords(teamplayer) {
        console.log(teamplayer);
        if (this.teamplayers[teamplayer.id]) {
            this.teamplayers[teamplayer.id].marker.setMap(null);
        }
        this.teamplayers[teamplayer.id] = new __WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__["b" /* Marker */](teamplayer.coords, __WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__["a" /* Map */].googleMap, './img/hacker.png');
        console.log(this.teamplayers[teamplayer.id].marker);
    },


    // When a team member logs on
    onTeamLogon: function onTeamLogon(teamMember) {
        if (teamMember.id != user.id) {
            console.log('[game.onTeamLogon]: team member loged on', teamMember);
        }
    },


    // When quest positions are received from node
    // renders quest list and inits eventlisteners
    onInitQuestPositions: function onInitQuestPositions(positions) {
        this.questPositions = positions;
        __WEBPACK_IMPORTED_MODULE_1__ui_ui_js__["a" /* default */].render('questlist', positions);
        this.renderQuestMarkers();
        __WEBPACK_IMPORTED_MODULE_1__ui_ui_js__["a" /* default */].initDOMListeners(user, this.questPositions, this.startQuest.bind(this));
        console.log('[game.onInitQuestPositions]: questpositions initialized');
    },


    // When a player starts a quest, receives updated questpostion from node
    onPlayerStartedQuest: function onPlayerStartedQuest(startedQuest, id) {
        this.questPositions[id] = startedQuest;
        this.questMarkers[id].reRender(__WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__["a" /* Map */].googleMap, './img/warning.png');
        console.log('[game.onPlayerStartedQuest]: player started quest, marker was changed');
    },


    // Requests quest postions from node
    requestQuestPositions: function requestQuestPositions(socket) {
        socket.emit('init-quest-positons');
        console.log('[game.requestQuestPositions]: questpostions requested from client');
    },


    // Renders all quest markers when user logs in
    renderQuestMarkers: function renderQuestMarkers() {
        var _this = this;

        var _loop = function _loop(id) {
            var newQuestMarker = new __WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__["b" /* Marker */]({
                lat: _this.questPositions[id].lat,
                lng: _this.questPositions[id].lng
            }, __WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__["a" /* Map */].googleMap, './img/placeholder.png');

            new __WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__["c" /* QuestCircle */]({ lat: _this.questPositions[id].lat, lng: _this.questPositions[id].lng }, 'normal', __WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__["a" /* Map */].googleMap);

            newQuestMarker.id = id;
            // Adds listeners to all markers
            newQuestMarker.marker.addListener('click', function () {
                __WEBPACK_IMPORTED_MODULE_1__ui_ui_js__["a" /* default */].render('quest-dialog', _this.questPositions[id], id);
            });
            _this.questMarkers[id] = newQuestMarker;
        };

        for (var id in this.questPositions) {
            _loop(id);
        }
        console.log('[game.renderQuestMarkers]: questpositions received and questmarkers rendered');
    },


    // When quest is started checks if quest is available
    startQuest: function startQuest(questId) {
        if (this.playerInRange.call(this, this.questMarkers[questId])) {
            if (this.questPositions[questId].isAvailable) {
                Object(__WEBPACK_IMPORTED_MODULE_4__modules_play_js__["a" /* default */])(this.questPositions[questId].type);
                console.log('[game.startQuest]: quest started', questId);
                this.socket.emit('start-quest', questId);
            } else {
                console.log('[game.startQuest]: quest not avail', questId);
            }
        } else {
            console.log('[game.startQuest]: player was not in range to start quest', questId);
        }
    },


    // When quest ends, updates marker
    onQuestEnd: function onQuestEnd(questId) {
        Object(__WEBPACK_IMPORTED_MODULE_4__modules_play_js__["a" /* default */])('end quest');
        this.questPositions[questId].isBeingTaken = false;
        document.querySelector('#questTimerMenu').classList.remove('show');
        this.questMarkers[questId].reRender(__WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__["a" /* Map */].googleMap, './img/cooldown.png');
        console.log('[game.onQuestEnd]: quest ended, cooldown started and marker changed...', questId);
    },


    // When quest cooldown ends, updates marker
    onCoolDownEnd: function onCoolDownEnd(questId) {
        var _this2 = this;

        this.questPositions[questId].isAvailable = true;
        this.questMarkers[questId].reRender(__WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__["a" /* Map */].googleMap, './img/blue.png');
        this.questMarkers[questId].addClickEvent(function () {
            __WEBPACK_IMPORTED_MODULE_1__ui_ui_js__["a" /* default */].render('quest-dialog', _this2.questPositions[questId], questId);
        });
        console.log('[game.onCoolDownEnd]: cooldown ended quest is now avail, marker changed', questId);
    },


    // Checks if player is in range of a questposition
    playerInRange: function playerInRange(questPosition) {
        var range = 1.0011;
        var inLat = questPosition.coords.lat;
        var inLng = questPosition.coords.lng;

        var x = user.coords.lat - inLat;
        var y = user.coords.lng - inLng;

        var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        console.log('x', x, 'y', y, 'r', r);

        if (
        // user.coords.lat < inLat + range &&
        // user.coords.lat > inLat - range &&
        // user.coords.lng < inLng + range &&
        // user.coords.lng > inLng - range
        r <= range) {
            console.log('[game.playerInRange]: true');
            return true;
        } else {
            console.log('[game.playerInRange]: false');
            return false;
        }
    }
};

// Socket, user, geolocation and map initialized
var socket = io('http://localhost:8080');
var user = new __WEBPACK_IMPORTED_MODULE_2__modules_user_js__["a" /* default */](socket);

//add info to user variable
user.id = globalUser.id;
user.name = globalUser.username;
user.team = globalUser.team_id;

console.log(user);

user.logon(socket);

game.initEvents(socket, user);
game.requestQuestPositions(socket);

Object(__WEBPACK_IMPORTED_MODULE_3__modules_geolocation_js__["a" /* default */])(user, __WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__["a" /* Map */], socket);

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var mapstyle = [{
  "elementType": "geometry",
  "stylers": [{
    "color": "#1d2c4d"
  }]
}, {
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#8ec3b9"
  }]
}, {
  "elementType": "labels.text.stroke",
  "stylers": [{
    "color": "#1a3646"
  }]
}, {
  "featureType": "administrative",
  "elementType": "geometry",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "administrative.country",
  "elementType": "geometry.stroke",
  "stylers": [{
    "color": "#4b6878"
  }]
}, {
  "featureType": "administrative.land_parcel",
  "elementType": "labels",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "administrative.land_parcel",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#64779e"
  }]
}, {
  "featureType": "administrative.province",
  "elementType": "geometry.stroke",
  "stylers": [{
    "color": "#4b6878"
  }]
}, {
  "featureType": "landscape.man_made",
  "elementType": "geometry.stroke",
  "stylers": [{
    "color": "#334e87"
  }]
}, {
  "featureType": "landscape.natural",
  "elementType": "geometry",
  "stylers": [{
    "color": "#023e58"
  }]
}, {
  "featureType": "poi",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "poi",
  "elementType": "geometry",
  "stylers": [{
    "color": "#283d6a"
  }]
}, {
  "featureType": "poi",
  "elementType": "labels.text",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "poi",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#6f9ba5"
  }]
}, {
  "featureType": "poi",
  "elementType": "labels.text.stroke",
  "stylers": [{
    "color": "#1d2c4d"
  }]
}, {
  "featureType": "poi.park",
  "elementType": "geometry.fill",
  "stylers": [{
    "color": "#023e58"
  }]
}, {
  "featureType": "poi.park",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#3C7680"
  }]
}, {
  "featureType": "road",
  "elementType": "geometry",
  "stylers": [{
    "color": "#304a7d"
  }]
}, {
  "featureType": "road",
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "road",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#98a5be"
  }]
}, {
  "featureType": "road",
  "elementType": "labels.text.stroke",
  "stylers": [{
    "color": "#1d2c4d"
  }]
}, {
  "featureType": "road.highway",
  "elementType": "geometry",
  "stylers": [{
    "color": "#2c6675"
  }]
}, {
  "featureType": "road.highway",
  "elementType": "geometry.stroke",
  "stylers": [{
    "color": "#255763"
  }]
}, {
  "featureType": "road.highway",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#b0d5ce"
  }]
}, {
  "featureType": "road.highway",
  "elementType": "labels.text.stroke",
  "stylers": [{
    "color": "#023e58"
  }]
}, {
  "featureType": "road.local",
  "elementType": "labels",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "transit",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "transit",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#98a5be"
  }]
}, {
  "featureType": "transit",
  "elementType": "labels.text.stroke",
  "stylers": [{
    "color": "#1d2c4d"
  }]
}, {
  "featureType": "transit.line",
  "elementType": "geometry.fill",
  "stylers": [{
    "color": "#283d6a"
  }]
}, {
  "featureType": "transit.station",
  "elementType": "geometry",
  "stylers": [{
    "color": "#3a4762"
  }]
}, {
  "featureType": "water",
  "elementType": "geometry",
  "stylers": [{
    "color": "#0e1626"
  }]
}, {
  "featureType": "water",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#4e6d70"
  }]
}];

/* harmony default export */ __webpack_exports__["a"] = (mapstyle);

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__ = __webpack_require__(50);


// DOM elements
var menu = document.querySelector('#menu'),
    questList = document.querySelector('#menu-list'),
    compass = document.querySelector('#compass'),
    questDialog = document.querySelector('#quest-dialog'),
    siteMenu = document.querySelector("#site-menu"),
    questGame = document.querySelector("#quest-game"),
    progressBar = document.querySelector('#questTimerMenu'),
    progress = document.querySelector('#questProgress');

// Inits all eventlisteners for the menu-UI
var initDOMListeners = function initDOMListeners(user, positions, startQuestCallback) {

    // Shows the quest list
    menu.addEventListener('click', function () {
        document.querySelector('#menu-list').classList.toggle('show');
    });

    // Profile drop down
    siteMenu.addEventListener('click', function () {
        document.querySelector('#menu-site').classList.toggle('show');
    });

    // Centers the map on the user
    compass.addEventListener('click', function () {
        __WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__["a" /* Map */].setZoom(user.coords.lat, user.coords.lng);
    });

    // Centers map on clicked quest
    questList.addEventListener('click', function (e) {
        if (e.target.classList.contains('center-map')) {
            var questId = e.target.parentNode.dataset.questid;
            __WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__["a" /* Map */].setZoom(positions[questId].lat, positions[questId].lng);
            document.querySelector('#menu-list').classList.toggle('show');
        }
    });

    // Quest dialog events
    questDialog.addEventListener('click', function (event) {

        // Starts quest
        if (event.target.id == 'start-quest') {
            var questId = event.target.parentNode.parentNode.dataset.questid;
            questDialog.classList.remove("show");
            startQuestCallback(questId);
            progressBar.classList.add('show');
            updateProgressBar(event.target.parentNode.parentNode.dataset.questTimer);
        }

        // Closes quest dialog
        if (event.target.id == 'cancel') {
            questDialog.classList.remove("show");
        }
    });
};

function updateProgressBar() {
    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2000;

    var max = time;
    var value = max;

    var interval = setInterval(function () {
        tick();
        //console.log(progress.value, value)
    }, 50);

    function tick() {
        value -= 50;
        var wow = value / max * 100;
        if (value <= 0) {
            clearInterval(interval);
            progress.value = 0;
            console.log('cleared');
        } else {
            progress.value = wow;
        }
    }
}

// Renders all quests on logon
function renderQuestList(quests) {
    questList.querySelector('.menu-container ul').innerHTML = "";
    for (var id in quests) {
        questList.querySelector('.menu-container ul').innerHTML += '\n            <li data-questid=' + id + '>\n                <a href="#">\n                    <i class="fa fa-money fa-2x"></i>\n                    <span style="margin-left: 20px;">\n                        ' + quests[id].name.toUpperCase() + '\n                        (' + quests[id].area.toUpperCase() + ')\n                    </span>\n                </a>\n                <i class="center-map fa fa-compass fa-2x" aria-hidden="true"></i>\n            </li> ';
    }
}

// Opens quest dialog and renders HTML
function renderQuestDialog(position, id) {
    console.log(position);
    questDialog.classList.add("show");
    questDialog.dataset.questid = id;
    questDialog.dataset.questTimer = position.questTimer;
    questDialog.querySelector('#quest-dialog-name h4').innerHTML = position.name + ('(' + id + ')');
}

/*
** Renders something in the menu-UI
** depending on the type that was sent in
** ...data = parameters that the render needs, for example questpostions */
function render(type) {
    for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        data[_key - 1] = arguments[_key];
    }

    switch (type) {
        case 'questlist':
            renderQuestList.apply(undefined, data);
            break;
        case 'quest-dialog':
            renderQuestDialog.apply(undefined, data);
            break;
        default:
            break;
    }
}

var ui = {
    render: render,
    initDOMListeners: initDOMListeners
};

/* harmony default export */ __webpack_exports__["a"] = (ui);

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__googlemaps_js__ = __webpack_require__(50);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



// User

var User = function () {
    function User(socket) {
        _classCallCheck(this, User);

        this.name = null;
        this.team = null;
        this.googleMapMarker = null;
        this.id = null;
        this.socket = socket;
        this.coords = {
            lat: null,
            lng: null
        };
        this.geolocationInitialized = false;
    }

    _createClass(User, [{
        key: 'logon',
        value: function logon(socket) {
            socket.emit('logon', { id: this.id, team: this.team, coords: this.coords });
        }
    }, {
        key: 'upDateCoords',
        value: function upDateCoords(coords, Map) {

            console.log('[User.upDateCoords]: coords updated on user');
            this.coords = coords;
            this.drawMarker(Map.googleMap);
            this.socket.emit('update-team-coords', { team: this.team, coords: this.coords, id: this.id });

            /* Sets the map to the players position 
             * the first time geolocation is updated */
            if (!this.geolocationInitialized) {
                Map.setZoom(this.coords.lat, this.coords.lng);
                this.geolocationInitialized = true;
            }
        }
    }, {
        key: 'drawMarker',
        value: function drawMarker(map) {
            console.log('[User.drawMarker]: new marker rendered on user');
            this.clearMarker();
            this.googleMapMarker = new __WEBPACK_IMPORTED_MODULE_0__googlemaps_js__["b" /* Marker */]({ lat: this.coords.lat, lng: this.coords.lng }, map, './img/playericon.png');
        }
    }, {
        key: 'clearMarker',
        value: function clearMarker() {
            if (this.googleMapMarker) {
                this.googleMapMarker.marker.setMap(null);
            }
        }
    }]);

    return User;
}();

/* harmony default export */ __webpack_exports__["a"] = (User);

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initGeolocation;
// Inits geolocation
function initGeolocation(user, Map) {
    navigator.geolocation.watchPosition(onUpdatePos, onPosError);

    function onUpdatePos(pos) {
        user.upDateCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }, Map);
    }
    function onPosError(err) {
        console.log('Pos update error:', err);
    }
}

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = play;
var screen = document.getElementById('quest-game');

function play(type) {

    // screen.classList.add('show');
    var gameScreen = document.createElement('iframe');
    gameScreen.className = 'game-screen';
    screen.classList.add('show');
    switch (type) {
        case 1:
            screen.innerHTML = "";
            gameScreen.src = '/colormatch';
            break;
        case 2:
            screen.innerHTML = "";
            gameScreen.src = '/swiftwrite';
            break;
        case 3:
            screen.innerHTML = "";
            gameScreen.src = '/wordmatch';
            break;
        case 'end quest':
            screen.innerHTML = "";
            document.querySelector('#questTimerMenu').classList.remove('show');
            return;
        default:
            screen.innerHTML = "";
            break;
    }

    screen.appendChild(gameScreen);
}

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Marker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return QuestCircle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map_style_js__ = __webpack_require__(199);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Map = {
    googleMap: new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: { lat: 59.313282, lng: 18.06616 },
        styles: __WEBPACK_IMPORTED_MODULE_0__map_style_js__["a" /* default */]
    }),
    setZoom: function setZoom(lat, lng) {
        var zoom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 17;

        this.googleMap.setCenter({ lat: lat, lng: lng });
        this.googleMap.setZoom(zoom);
    }
};

var Marker = function () {
    function Marker() {
        var pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var map = arguments[1];
        var icon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

        _classCallCheck(this, Marker);

        this.marker = new google.maps.Marker({
            position: pos,
            map: map,
            icon: icon
        });

        // Saves the coords on the marker object
        this.coords = pos;
    }

    // When a quest icon is changed


    _createClass(Marker, [{
        key: 'reRender',
        value: function reRender(map, icon) {
            this.marker.setMap(null);
            this.marker = new google.maps.Marker({
                position: this.coords,
                map: map,
                icon: icon
            });
        }

        // Adds click event

    }, {
        key: 'addClickEvent',
        value: function addClickEvent(callback) {
            this.marker.addListener('click', callback);
        }
    }]);

    return Marker;
}();

var QuestCircle = function QuestCircle(position, type, map) {
    _classCallCheck(this, QuestCircle);

    var color = type == 'normal' ? 'green' : type == 'unavailable' ? 'red' : 'yellow';

    this.circle = new google.maps.Circle({
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.35,
        map: map,
        center: position,
        radius: 11
    });
};



/***/ })

/******/ });