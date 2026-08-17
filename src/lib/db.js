import mysql from "mysql2/promise";

const globalForDatabase = globalThis;

const pool =
  globalForDatabase.aumiauDatabasePool ??
  mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 3,
    queueLimit: 0,
    enableKeepAlive: true,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.aumiauDatabasePool = pool;
}

export default pool;