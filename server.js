const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// /?loggedin=true

app.use(function(req, res, next) {
  console.log('Hello from first the middleware!');
  if(req.query.loggedin) {
    next();
  } else {
    res.send('HAHA you cant get past me.');
  }
});

app.use(function(req, res, next) {
  console.log('Hello from second the middleware!');
  next();
});

app.use(function(req, res, next) {
  console.log('Hello from third the middleware!');
  next();
});

app.get('/', (req, res) => {
  console.log('Hello from inside the route');
  throw new Error('WOAHHHH!!!');
  res.send('Hello World 1!');
});

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
