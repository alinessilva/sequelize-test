const Sequelize = require('sequelize');

const connection = new Sequelize('POC', 'sa', 'w551100W#', {
    host: 'localhost',
    dialect: "mssql",
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
});

const Article = connection.define('article', {
  slug: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      len: {
        args: [10, 150],
        msg: 'Please enter a title with at least 10 chars but no more than 150'
      }
    }
  },
  body: {
    type: Sequelize.TEXT,
    validate: {
      startsWithUpper: function(bodyVal) {
        const first = bodyVal.charAt(0);
        const startsWithUpper = first === first.toUpperCase();
        if (!startsWithUpper) {
          throw new Error('First letter must be a uppercase caracter.')
        }
      }
    }
  }
}, {
    timestamps: false,
});

connection
  .sync({
    force: true,
    logging: console.log
  })
  .then(function() {
    return Article.create({
      title: 'Lorem Ipsum',
      slug: '1',
      body: 'lorem'
    })
  })
  .catch(function(error) {
    console.log(error);
  });

// connection.sync().then(function(){
//   Article.create({
//     title: 'demo title',
//     body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam vero.'
//   });
// });

// connection.sync().then(function() {
//   Article.findById(1).then(function(article) {
//     console.log(article.dataValues)
//   });
// });

// connection.sync().then(function() {
//   Article.findAll().then(function(articles) {
//     console.log(articles.length);
//   });
// });