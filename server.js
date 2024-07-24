//packages and simplifiers
const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();


//import routes
const view_routes = require('./routes/view-routes')
const api_routes = require('./routes/api-routes')

// Middleware for my public folder
app.use(express.static('./public'));
// Middleware for parsing JSON request bodies
app.use(express.json());


//Load Routes:
app.use('/', view_routes)
app.use('/api', api_routes)



//This will be for all requests not found w/in files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});