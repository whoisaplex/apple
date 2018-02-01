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
    res.send('Admin stuff?')
})

function admin(users){
    return users; 
}

// Exports
module.exports = {
    app,
    server, 
}