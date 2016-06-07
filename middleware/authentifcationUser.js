module.exports = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    var err = {
            status : 401,
            name : "User not authenticated",
            message : "Please login"
        };
    return next(err);
}
