const router = require("express").Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');
const { checkUsernameFree, checkUsernameExists, checkPasswordLength } = require('./auth-middleware');

router.post('/register', checkUsernameFree, checkPasswordLength, (req, res, next) => {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 12);
    const user = { username, password: hash };
  
    Users.add(user)
      .then(newUser => {
        res.status(200).json(newUser);
      })
      .catch(err => {
        next(err);
      })
})

router.post('/login', checkUsernameExists, (req, res, next) => {
  const { username, password } = req.body;
  Users.findBy({ username })
    .then(user => {
      const success = bcrypt.compareSync(password, user[0].password);

      if(!success) {
        next({ status: 401, message: "Invalid credentials" })
        return;
      } else{
        req.session.user = user;
        res.status(200).json({ message: `Welcome ${username}!` });
      }
      
    })
    .catch(err => {
      next(err);
    })
})

router.get('/logout', (req, res, next) => {
  if(req.session.user) {
    req.session.destroy(err => {
      if(err){
        next(err);
        return;
      }
      res.status(200).json({ message: "logged out" });
    })
  } else {
    res.status(200).json({ message: "no session" })
  }
})

module.exports = router