const Sequelize = require('sequelize');
//database username   password
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    }
)

try {
    sequelize.authenticate();

    console.log("Connected to DB");
} catch {
    console.log(`Error: ${err}`);
}

module.exports = sequelize