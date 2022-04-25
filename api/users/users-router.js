const express = require('express');
const Users = require('./users-model');
const { checkPasswordLength } = require('../auth/auth-middleware')
// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!
const router = express.Router();

/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
*/

router.get('/', (req, res, next) => {
  res.send("test route")
})

module.exports = router

// Don't forget to add the router to the `exports` object so it can be required in other modules
