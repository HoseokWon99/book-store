const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('passport');
const { errorHandler } = require("./common");
const { join } = require('path');
const { config } = require("dotenv");

config({ path: join(__dirname, '..', '.env') });
global.PUBLIC_DIR = join(__dirname, '..', 'public');
require("./auth/guard/passport");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(PUBLIC_DIR));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(errorHandler);
app.use("/api-docs", ...require("./config/swagger"));
app.use("/api/users", require("./users"));
app.use("/api/auth", require("./auth"));
app.use("/api/books", require("./books"));
app.use("/api/books/categories", require("./books/categories"));
app.use("/api/books/likes", require("./books/likes"));

app.listen(3001, async () => {

    await require("./config/sequelize").sync()
        .then(() => console.log("sequelize successfully initialized"))
        .catch(console.error);

    await require("./config/mongoose").init()
        .then(() => console.log("mongoose successfully initialized"))
        .catch(console.error);
});
