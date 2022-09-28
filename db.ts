import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize ({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: "postgres",
    host: "localhost",
    //models: [__dirname + '/models']
});

module.exports = sequelize;