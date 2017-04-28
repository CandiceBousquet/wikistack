const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/wikistack', {
	logging: false
});

const Page = db.define('page', {
	title: {
		allowNull: false,
		type: Sequelize.STRING
	},
	urlTitle: {
		allowNull: false,
		type: Sequelize.STRING
	},
	content: {
		allowNull: false,
		type: Sequelize.TEXT
	},
	status: Sequelize.ENUM('open', 'closed'),
	date: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
}, {
	// getter methods go here
});

const User = db.define('user', {
	name: {
		allowNull: false,
		type: Sequelize.STRING
	},
	email:{
		allowNull: false,
		type: Sequelize.STRING,
		validate: {
			isEmail: true
		}
	}
});

module.exports = {
	db: db,
	Page: Page,
	User: User
};