require("dotenv").config();

const { Poll, Pool} = require("pg");

const  poll = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    porta: process.env.DB_PORT,
});

module.exports = poll;