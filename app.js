const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');
const router = require('./routes');
const models = require('./models');

models.db.sync({force: true})
.then(function () {
    // make sure to replace the name below with your express app
    app.listen(3000, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);

app.use(express.static("public"));

