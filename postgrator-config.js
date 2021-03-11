if (process.env.NODE_ENV !== "production") require('dotenv').config();

module.exports = {
    "migrationsDirectory": "migrations",
    "driver": "pg",
    "ConnectionString": process.env.DATABASE_URL,
}