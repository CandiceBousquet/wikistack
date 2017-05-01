const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get('/', function(req, res, next) {
  // RETRIEVE ALL WIKI PAGES
  var pages = Page.findAll().then(function(result) {
    res.render("./index.html", {pages: result});
  })
  .catch(next);
});

router.get('/add', function(req, res) {
  // RETRIVE THE 'ADD A PAGE' FORM
  res.render('./addpage.html');
});

router.post('/', function(req, res, next) {
  // SUBMIT A NEW PAGE TO THE DATABASE
  User.findOrCreate({
    where: {
      name: req.body.authorName,
      email: req.body.authorEmail
    }
  })
  .then(function(user) {
    var myUser = user[0];

    var page = Page.build({
      title: req.body.title,
      content: req.body.content
    });
    return page.save()
               .then(function (page) {
                  return page.setAuthor(myUser);
               });
  })
  .then(function(persistedPage) {
    res.redirect(persistedPage.route);
  })
  .catch(function(err) {
    res.render("./error.html", {
      message: err.message, 
      error: {
        status: 400,
        stack: err.errors
      }
    });
  });
});

router.get("/:urlTitle", function(req, res, next) {
  var result = Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    include: [{
      model: User, as: 'author'
    }]
  });

  result.then(function(row) {
    // console.log(row.author.name);
    const localVars = {
      content: row.content,
      title: row.title,
      authorName: row.author.name,
    };
    res.render('./wikipage.html', localVars);
  })
  .catch(next);
})

module.exports = router;


