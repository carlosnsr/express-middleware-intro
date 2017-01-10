const express = require('express');
const body_parser = require('body-parser');

const app = express();

// First tell express that we want to use body-parser to convert form/json data into JS objects
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

// Calls without routes will be executed for every request
// Will encounter this middleware first, because it is before the others
// Add this to you URL get passed this middleware: /?loggedin=true
app.use(function(req, res, next) {
  console.log('Hello from first the middleware!');
  if(req.query.loggedin) {
    next();
  } else {
    res.send('HAHA you cant get past me.');
  }
});

// mount the Users router on the app
var users_router = require('./user.js')
app.use('/users', users_router)

app.use(function(req, res, next) {
  console.log('Hello from second the middleware!');
  next();
});

app.use(function(req, res, next) {
  console.log('Hello from third the middleware!');
  next();
});

// Here our function is the middleware
// We are saying run this function when this GET route happens
app.get('/', (req, res) => {
  console.log('Hello from inside the route');
  throw new Error('WOAHHHH!!!');
  res.send('Hello World 1!');
});

// If it gets here without being handled by one of our other middleware above here,
// Then this executes.  Here is normally where we would put our 404 handling
app.use(function(req, res, next) {
  console.log('Route not found');
  res.send('NOT FOUND!!!!');
});

app.use(function(error, req, res, next) {
  console.log('An error was thrown');
  console.log(error);
  res.status(500);
  res.send(error.message);
});

const port = process.env.PORT || 3000;
app.listen(port, () =>{
  console.log(`Listening on ${port}`);
});
