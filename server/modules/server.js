const express = require('express');
const http = require('http');

// App
const app = express();

// Create server
const server = http.createServer(app).listen(3000,()=> {
    console.log('[server]: Server running on port 3000');
});



// Exports
module.exports = {
    app,
    server,
}
