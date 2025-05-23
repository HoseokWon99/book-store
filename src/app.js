const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('passport');
const { join } = require('path');
const { config } = require("dotenv");
const { errorHandler } = require("./common");

config({ path: join(__dirname, '..', '.env') });
require("./auth/guard/passport");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(errorHandler);
app.use(passport.initialize());
app.use("/api-docs", ...require("./config/swagger"));
app.use("/api/users", require("./users"));
app.use("/api/auth", require("./auth"));
app.use("/api/categories", require("./categories"));
app.use("/api/books", require("./books"));
app.use("/api/carts", require("./carts"));
app.use("/api/orders", require("./orders"));
app.use("/api/reviews", require("./reviews"));


require("./config/sequelize").sync()
    .then(() => console.log("Sequelize initialized successfully."))
    .catch(console.error);

app.listen(3001)



