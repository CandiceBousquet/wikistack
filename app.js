const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');
const router = require('./routes');
const models = require('./models');
const bodyparser = require('body-parser');

models.db.sync()
.then(function () {
    // make sure to replace the name below with your express app
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);

nunjucks.configure("./views", { 
  autoescape: true ,
  express: app,
  noCache: true
});

app.use(express.static("public"));
app.use(volleyball);
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());
app.use('/', router);