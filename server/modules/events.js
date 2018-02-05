const positions = require('./positions.js');
const Stopwatch = require('timer-stopwatch');

// Connected users
const USERS = new Map();

// Events
const events = {

    beginQuest(questId, socket, io){
        positions[questId].timer = new Stopwatch(5000, {refreshRateMS: 100});
        positions[questId].timer.start();
        console.log('[beginQuest]: quest started counting down 5 sec...', questId);

        this.onEndQuest.call(this, questId, socket, io);
    },

    onEndQuest(questId, socket, io){
        positions[questId].timer.onDone(()=> {
            positions[questId].timer.stop();
            positions[questId].isBeingTaken = false;
            console.log('[onEndQuest]: quest ended after 5 sec, starting cooldown', questId, positions[questId].isBeingTaken);
            io.sockets.emit('quest-ended', questId);
            this.coolDownQuest.call(this, questId, socket, io);
        })
    },

    coolDownQuest(questId, socket, io){
        positions[questId].coolDown = new Stopwatch(5000, {refreshRateMS: 100});
        positions[questId].coolDown.start();
        positions[questId].coolDown.onDone(()=>{
            positions[questId].timer.stop();
            positions[questId].isAvailable = true;
            console.log('[coolDownQuest]: cooldown stoped after 5 sec', questId, positions[questId].isAvailable);
            io.sockets.emit('cooldown-ended', questId);
        });
    },

    onInitQuestPositions(socket){
        socket.on('init-quest-positons', (user) => {
            socket.emit('init-quest-positions', positions);
        });
    },

    // When player begins quest
    onBeginQuest(socket, io) {
        socket.on('start-quest', (questId) => {
            console.log('[coolDownQuest]: started quest:', questId);

            // Toggles quest to unavailable
            positions[questId].isAvailable = false;
            positions[questId].isBeingTaken = true;

            // Emits that quest was started to all sockets
            io.sockets.emit('start-quest', positions[questId], questId);

            // Starts quest and binds `this` to the events object
            this.beginQuest.call(this, questId, socket, io);
        })
    },

    // When a user connects, adds that user to the USERS-map
    onLogon(socket, io){
        socket.on('logon', (user) => {
            console.log('[logon]: user loged on', user.id);
            USERS.set(socket.id, user);
            console.log('[logon]: connected users:', USERS);

            // If user is in team, join that channel and emit to all the members
            if(user.team) {
                console.log('[logon]: user has team, create room and broadcast to:', user.team);
                socket.join(user.team);
                io.sockets.in(user.team).emit('logon', user);
            }
        })
    },

    // When a user disconnects, removes that user from the USERS-map
    onDisconnect(socket){
        socket.on('disconnect', (reason) => {
            if(USERS.get(socket.id)) {
                console.log('[onDisconnect]: user disconnected', USERS.get(socket.id));
                USERS.delete(socket.id);
                console.log('[onDisconnect]: online users:', USERS);
            }
        })
    },

    onTeamCoordsUpdate(socket, io) {
      socket.on('update-team-coords', (player) => {
        socket.to(player.team).emit('super-nice-team', player);
      });
    },

    broadcastTeamCoords(socket, io, player){
      io.sockets.in(player.team).emit('super-nice-team', player);
    }

}

// Exports
module.exports = events;
