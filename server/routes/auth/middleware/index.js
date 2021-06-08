const jwt = require("jsonwebtoken");
const { User } = require("./../../../db/models");

const authentication = (req, res, next) => {
    const accessToken = req.cookies['x-access-token']
    if (accessToken) {
        jwt.verify(accessToken, process.env.SESSION_SECRET, (err, decoded) => {
            if (err) {
              return next();
            }
            User.findOne({
              where: { id: decoded.id },
            }).then((user) => {
              req.user = user;
              return next();
            });
        });
    } else return next();
};

const isAuthenticated = (req, res, next) => {
    if (req.user) return next();
    return res.sendStatus(401);
}

module.exports = {
    authentication,
    isAuthenticated,
};