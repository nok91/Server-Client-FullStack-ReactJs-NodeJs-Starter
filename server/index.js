// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth', { useNewUrlParser: true, useCreateIndex : true  })

// App Setup
//app.use apply middleware
app.use(morgan('combined'));  //morgan is log in incoming request, using for debugging
app.use(cors()); //Allow request to coming from  anywhere (for security setup to accept requesto for a certain domain, subdomain or specific port)
app.use(bodyParser.json({ type : '*/*'})); // parse incoming request, it gonna be parsed as JSON
router(app);


// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);