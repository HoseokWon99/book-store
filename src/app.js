require("dotenv").config({ path: `${__dirname}/../.env` });

const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const errorHandler = require("./config/error-handler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(errorHandler);
app.use("/api-docs", ...require("./config/swagger"));
app.use("/api/users", require("./users"));
app.use("/api/users/verification", require("./users/verification"));
app.use("/api/auth", require("./auth"));
app.use("/api/categories", require("./categories"));
app.use("/api/books", require("./books"));
app.use("/api/carts", require("./carts"));
app.use("/api/orders", require("./orders"));
app.use("/api/reviews", require("./reviews"));

app.listen(3001);



