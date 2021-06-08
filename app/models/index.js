const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./usermodel")(sequelize, Sequelize);
db.todos = require("./todoModel")(sequelize, Sequelize);

///////////////relation ///////////

db.users.hasMany(db.todos, { foreignKey: "userId" });
db.todos.belongsTo(db.users, { foreignKey: "userId" });


module.exports = db;
