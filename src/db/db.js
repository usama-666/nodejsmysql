const mysql = require("mysql2/promise");

// Create the connection pool. The pool-specific settings are the defaults
const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  // password:process.env.DB_PASSWORD
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

//password = 12345
module.exports = db;
