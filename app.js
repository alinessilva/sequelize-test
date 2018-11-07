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
  title: Sequelize.STRING,
  body: Sequelize.TEXT
});

connection.sync()