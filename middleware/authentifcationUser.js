module.exports = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    var err = {
            status : 401,
            name : "Utilisateur non authentifié",
            message : "Veuillez vous connecter via la page d'accueil"
        };
    return next(err);
}
