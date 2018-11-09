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

var Article = connection.define('article', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
    body: {
      type: Sequelize.TEXT
  }
}, {
    timestamps: false,
    freezeTableName: true

});

connection.sync({
  force: true,
  logging: console.log
}).then(function() {

})

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