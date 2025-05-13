const Redis = require('ioredis');

module.exports = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    db: Number(process.env.REDIS_DB_INDEX)
});