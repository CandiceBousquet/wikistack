const express = require('express');
const router = express.Router();
const model = require("../models");
const User = model.User;

router.get("/users", function(req, res, next) {
	var users = User.findAll();
	res.render("./users.html", users);
})

module.exports = router;