var express = require('express')
var router = express.Router()

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
// "Stack" because we are specifying more than one middleware (i.e. each funciton),
// and it is going to start at the top and work its way down
// "Sub-stack" because the stack is only on one route (i.e. '/user/:id')
// and is already part of a larger stack of all the other middlewares that we have defined so far
router.use('/:id',
  function (req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
  },
  function (req, res, next) {
    console.log('Request Type:', req.method)
    next()
  }
)

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/:id',
  function (req, res, next) {
    // if the user ID is 0, skip to the next router
    if (req.params.id === '0')
      next('route')
    // otherwise pass control to the next middleware function in this stack
    else
      next()
  },
  function (req, res, next) {
    res.send("Show REGULAR page")
  }
)

// handler for the /user/:id path, which renders a special page
router.get('/:id', function (req, res, next) {
  console.log(req.params.id)
  res.send("Show SPECIAL page")
})

module.exports = router
