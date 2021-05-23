const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
require('dotenv').config()
//database username   password
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
    }
)

const Game = require('./models/game')(sequelize, DataTypes);
const User = require('./models/user')(sequelize, DataTypes);

try {
    sequelize.authenticate();

    console.log("Connected to DB");
} catch (err) {
    console.log(`Error: ${err}`);
}

module.exports = { sequelize, Game, User }