const { Poll, Pool} = require("pg");

const  poll = new Pool({
    user: "edivaldosouzapaixao",
    host: "localhost",
    database: "crud_pessoas",
    porta: 5432,
});

module.exports = poll;