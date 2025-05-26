const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

sequelize.sync()
    .then(() => console.log("Sequelize initialized successfully."))
    .catch(console.error);

module.exports = sequelize;