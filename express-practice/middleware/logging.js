module.exports = function logger(req, res, next) {
    console.log("logging middleware called");
    next();

}