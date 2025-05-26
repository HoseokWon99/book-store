module.exports = (err, req, res, next) => {
    console.error(err);
    res.sendStatus(err.status || 500);
};

