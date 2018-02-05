const express = require('express');
const http = require('http');
const path = require('path');

// App
const app = express();

// Create server
const server = http.createServer(app).listen(8080,()=> {
    console.log('[server]: Server running on port 8080');
});

app.use(express.static(path.join(__dirname, '../../server/public')));


// Exports
module.exports = {
    app,
    server,
}
