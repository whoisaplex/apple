const express = require('express');
const http = require('http');

// App
const app = express();

// Create server
const server = http.createServer(app).listen(8080,()=> {
    console.log('[server]: Server running on port 8080');
});



// Exports
module.exports = {
    app,
    server,
}
