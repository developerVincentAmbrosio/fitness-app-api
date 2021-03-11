if (process.env.NODE_ENV !== "production") require('dotenv').config();
console.log(process.env.DATABASE_URL, 123);
module.exports = {
    "migrationsDirectory": "migrations",
    "driver": "pg",
    "ConnectionString": process.env.DATABASE_URL,
}