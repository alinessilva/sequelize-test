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
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
}, {
  hooks: {
    beforeValidate: (article, options) => {
      article.title = 'Some article';
    },
    afterValidate: (article, options) => {
      article.body = 'Some name';
    }
  }
});
//     hooks: {
//       beforeValidate: function() {
//         console.log('beforeValidate');
//       },
//     afterValidate: function() {
//         console.log('afterValidate');
//     },
//     beforeCreate: function() {
//       console.log('beforeCreate');
//     },
//     afterCreate: function() {
//       console.log('afterCreate');
//     }
//   }
// });

connection
  .sync({
    force: true,
  })
  .then(function() {
    Article.create({
      slug: 'some-slug',
      title: 'Some-title',
      body: 'some-body'
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