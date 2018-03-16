const socket = require('socket.io');
const positions = require('./positions.js');
const events = require('./events.js');

function initSocket(server){
    const io = socket();
    io.listen(server);
    io.set('origins', '*:*');
    // Inits connection to socket io
    initConnectionAndEvents(io);

    return io;
}

function initConnectionAndEvents(io){
    io.on('connection', (socket) => {
        console.log('[initConnectionAndEvents]: socket', socket.id, 'connected');

        // Inits all socket events
        events.onLogon(socket, io);
        events.onDisconnect(socket);

        events.onInitQuestPositions(socket);
        events.onBeginQuest(socket, io);
        events.onTeamCoordsUpdate(socket, io);

    });
}

// Exports
module.exports = {
    initSocket,
    initConnectionAndEvents
}
