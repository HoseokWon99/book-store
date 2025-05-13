const mongoose = require('mongoose');
const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE, MONGO_USERNAME, MONGO_PASSWORD, MONGO_AUTH_SOURCE } = process.env;

exports.init =  async () => {
    await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`, {
        user: MONGO_USERNAME,
        pass: MONGO_PASSWORD,
        authSource: MONGO_AUTH_SOURCE
    });
};

