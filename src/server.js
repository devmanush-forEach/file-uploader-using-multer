const app = require("./index");

const connect = require("./configs/db");

app.listen(2234, connect());