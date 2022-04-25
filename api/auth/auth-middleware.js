const Users = require('../users/users-model');

function restricted(req, res, next) {
  if(req.session.user){
    next();
  } else {
    next({ status: 401, message: "You shall not pass!" })
  }
}

function checkUsernameFree(req, res, next) {
  Users.find()
    .then(users => {
      users.forEach(user => {
        if(user.username === req.body.username){
          next({ status: 422, message: "Username taken" });
          return;
        } 
      })
      next();
    })
}

function checkUsernameExists(req, res, next) {
  const username = { username: req.body.username }
  Users.find()
    .then(users => {
      let active = users.find(user => user.username === req.body.username)
      if(!active){
        next({ status: 401, message: "Invalid credentials" })
        return;
      } else {
        next();
      }
    })
    
}

function checkPasswordLength(req, res, next) {
  const password = req.body.password;
  if(!password || password.trim().length <= 3 ){
    next({ status: 422, message: "Password must be longer than 3 chars" });
    return;
  } else {
    next();
  }
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength
}