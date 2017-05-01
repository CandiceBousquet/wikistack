const express = require('express');
const router = express.Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get('/', function(req, res) {
  // RETRIEVE ALL WIKI PAGES
  res.redirect('/');
});

router.post('/', function(req, res, next) {
  // SUBMIT A NEW PAGE TO THE DATABASE
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });
  
  page.save()
  .then(function(persistedPage){
    res.json(persistedPage);
  });
});

router.get('/add', function(req, res) {
  // RETRIVE THE 'ADD A PAGE' FORM
  res.render('./addpage.html');
});

router.get('/')
module.exports = router;


