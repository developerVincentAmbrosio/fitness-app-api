//if (process.env.NODE_ENV !== "production") require('dotenv').config();

module.exports = {
    "migrationsDirectory": "migrations",
    "driver": "pg",
    "connectionString": process.env.DATABASE_URL,
    "ssl" : { "rejectUnauthorized": false }
}