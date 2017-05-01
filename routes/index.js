const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');

router.get('/', function(req, res) {
  res.render('index.html');
});

router.use('/wiki', wikiRouter);
router.use('/users', userRouter);

module.exports = router;