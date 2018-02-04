const express = require('express'); 
const http = require('http');

// App 
const app = express(); 

// Create server
const server = http.createServer(app).listen(8080,()=> {
    console.log('[server]: Server running on port 8080'); 
}); 

// Routes 
app.get('/admin', (req, res) => {
    res.send('<h1>Admin stuff?</h1>')
})

// Exports
module.exports = {
    app,
    server, 
}