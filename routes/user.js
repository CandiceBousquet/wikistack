const express = require('express');
const router = express.Router();
const model = require("../models");
const User = model.User;

router.get('/', function(req, res, next) {
	var users = User.findAll()
  .then(function(result) {
    res.render('./users.html', {users: result});
  });
  // allUsers.then(function(users){
  //   var userArr = [];
  //   for (var i = 0; i < users.length; i++) {
  //     userArr.push(users[i]);
  //   }
  //   res.render('./users.html', userArr);
  // });
});

module.exports = router;