var helper = {
  generateURLTitle: function(title) {
    if (!title) {
      return this.randomString();
    }
    var result = this.removeNonAlphaNum(title);
    return result.replace(/ +/g, '_');

  },
  randomString: function() {
    var length = 10;
    var validChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += validChars[Math.floor(Math.random() * validChars.length)];
    return result;
  },
  removeNonAlphaNum: function(title) {
    return title.replace(/[^a-zA-Z0-9 -]+/g, '');
  }
};

////////////////////////////////////////////////////////////////////////


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
	getterMethods: {
		route: function() {
			return '/wiki/' + this.urlTitle;
		}
	},
	hooks: {
		beforeValidate: function(page) {
			page.urlTitle = helper.generateURLTitle(page.title);
		}
	}
});

const User = db.define('user', {
	name: {
		allowNull: false,
		type: Sequelize.STRING
	},
	email: {
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