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
/******/ 	return __webpack_require__(__webpack_require__.s = 251);
/******/ })
/************************************************************************/
/******/ ({

/***/ 191:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 20:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Marker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return QuestCircle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map_style_js__ = __webpack_require__(253);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Map = {
    googleMap: new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: { lat: 59.313282, lng: 18.06616 },
        styles: __WEBPACK_IMPORTED_MODULE_0__map_style_js__["a" /* default */],
        disableDefaultUI: true
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



/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(252);


/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_ui_js__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_user_js__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_geolocation_js__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_play_js__ = __webpack_require__(260);






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
        this.teamplayers[teamplayer.id] = new __WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__["b" /* Marker */](teamplayer.coords, __WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__["a" /* Map */].googleMap, 'https://development.test/img/hacker.png');
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
        this.questMarkers[id].reRender(__WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__["a" /* Map */].googleMap, 'https://development.test/img/warning.png');
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
            }, __WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__["a" /* Map */].googleMap, 'https://development.test/img/placeholder.png');

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
            if (this.questPositions[questId].isAvailable && !user.inGame) {
                user.inGame = true;
                Object(__WEBPACK_IMPORTED_MODULE_4__modules_play_js__["a" /* default */])(this.questPositions[questId].type);
                __WEBPACK_IMPORTED_MODULE_1__ui_ui_js__["a" /* default */].render('start-progress-bar', this.questPositions[questId].questTimer);
                console.log('[game.startQuest]: quest started', questId);
                this.socket.emit('start-quest', questId);
            } else {
                console.log('[game.startQuest]: quest not avail', questId);
                console.log('user in game', user.inGame);
            }
        } else {
            console.log('[game.startQuest]: player was not in range to start quest', questId);
        }
    },


    // When quest ends, updates marker
    onQuestEnd: function onQuestEnd(questId) {
        Object(__WEBPACK_IMPORTED_MODULE_4__modules_play_js__["a" /* default */])('end quest');
        //ui.render('update-game-menu');
        this.questPositions[questId].isBeingTaken = false;
        user.inGame = false;
        this.questMarkers[questId].reRender(__WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__["a" /* Map */].googleMap, 'https://development.test/img/cooldown.png');
        console.log('[game.onQuestEnd]: quest ended, cooldown started and marker changed...', questId);

        localStorage.removeItem("questName");
    },


    // When quest cooldown ends, updates marker
    onCoolDownEnd: function onCoolDownEnd(questId) {
        var _this2 = this;

        this.questPositions[questId].isAvailable = true;
        this.questMarkers[questId].reRender(__WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__["a" /* Map */].googleMap, 'https://development.test/img/blue.png');
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
var user = new __WEBPACK_IMPORTED_MODULE_2__modules_user_js__["a" /* default */](socket, globalUser.id, globalUser.name, globalUser.team_id);

console.log(user);

user.logon(socket);

game.initEvents(socket, user);
game.requestQuestPositions(socket);

Object(__WEBPACK_IMPORTED_MODULE_3__modules_geolocation_js__["a" /* default */])(user, __WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__["a" /* Map */], socket);

/***/ }),

/***/ 253:
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

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_googlemaps_js__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_util__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_util__);



String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

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

            console.log('QUEST NAME: ' + event.target.parentNode.parentNode.dataset.name);
            questDialog.classList.remove("show");
            startQuestCallback(questId);
        }

        // Closes quest dialog
        if (event.target.id == 'cancel') {
            questDialog.classList.remove("show");
        }
    });
};

// Updates the in game menu. 
// Fires when player completes a quest 
function updateGameMenu() {
    document.querySelector('#menu-site object').data = 'https://development.test/home';
}

function updateProgressBar(time) {
    progressBar.classList.add('show');

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
            clearProgressInterval();
            progress.value = 0;
            console.log('cleared');
            document.querySelector('#questTimerMenu').classList.remove('show');
        } else {
            progress.value = wow;
        }
    }

    function clearProgressInterval() {
        clearInterval(interval);
    }
    window.addEventListener('message', function (e) {
        clearProgressInterval();
    });
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

    var questName = position.name.capitalize() + " " + position.area.capitalize() + " (#" + id + ")";

    questDialog.classList.add("show");
    questDialog.dataset.questid = id;
    questDialog.dataset.name = questName;
    questDialog.dataset.questTimer = position.questTimer;
    questDialog.querySelector('#quest-dialog-name h4').innerHTML = questName;
    questDialog.querySelector('#quest-dialog-cash').innerHTML = "<i class=\"fa fa-bitcoin\"></i> " + position.currency;
    questDialog.querySelector('#quest-dialog-xp').innerHTML = position.xp + "xp";

    localStorage.setItem("questName", questName);
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
        case 'update-game-menu':
            debugger;
            updateGameMenu();
            break;
        case 'start-progress-bar':
            updateProgressBar.apply(undefined, data);
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

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = Object({"NODE_ENV":"development"}).NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(256);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(257);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(191), __webpack_require__(20)))

/***/ }),

/***/ 256:
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ 257:
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__googlemaps_js__ = __webpack_require__(201);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



// User

var User = function () {
    function User(socket, id, name, team_id) {
        _classCallCheck(this, User);

        this.name = name;
        this.team = team_id;
        this.googleMapMarker = null;
        this.id = id;
        this.socket = socket;
        this.coords = {
            lat: null,
            lng: null
        }, this.inGame = false;
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
            this.googleMapMarker = new __WEBPACK_IMPORTED_MODULE_0__googlemaps_js__["b" /* Marker */]({ lat: this.coords.lat, lng: this.coords.lng }, map, 'https://development.test/img/playericon.png');
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

/***/ 259:
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

/***/ 260:
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

/***/ })

/******/ });