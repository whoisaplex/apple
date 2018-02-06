// Imports 
const app = require('./modules/server.js'); 
const sockets = require('./modules/sockets.js'); 

// Inits socket io and events 
const IO = sockets.initSocket(app.server); 

