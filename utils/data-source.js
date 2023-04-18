const { DataSource } = require("typeorm");
const path = require("path");
require("dotenv").config();

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: 'postgres' || process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [path.join(__dirname, "..", "entity/**/*.entity.js")],
    subscribers: [],
    migrations: [],
})

module.exports = AppDataSource;