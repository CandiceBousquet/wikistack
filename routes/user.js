const express = require('express');
const router = express.Router();
const model = require("../models");
const User = model.User;
const Page = model.Page;
const Promise = require('bluebird');

router.get('/', function(req, res, next) {
	var users = User.findAll()
  .then(function(result) {
    res.render('./users.html', {users: result});
  })
  .catch(next);
});

router.get('/:id', function(req, res, next) {
  // User lookup
  var user = User.findOne({
    where: {
      id: req.params.id
    }
  });

  // Page lookup whose author is this user
  var pages = Page.findAll({
    where: {
      authorId: req.params.id
    }
  });

  Promise.all([user, pages]).then(function(data) {
    console.log(data[0]); // id, name, email
    console.log(data[1]); // id, title, urlTitle, content, status, authorId

    const localVars = {
      email: data[0].email,
      name: data[0].name,
      pages: data[1]
    };
    // for(var i = 0; i < data.length; i++) {
    //   localVars.push(data[i]);
    // }
    // console.log(localVars);
    res.render('./userList.html', {user: localVars});
  });
});

module.exports = router;