const jwt = require("jsonwebtoken");
const { User } = require("../db/models");

const AccessToken = (accessToken) => {
    let isTokenValid = false;
    let decoded;

    const verifyAccessToken = () => {
        if (!accessToken) return isTokenValid = false;
        else {
            jwt.verify(accessToken, process.env.SESSION_SECRET, (err, _decoded) => {
                if (err) {
                  return isTokenValid = false;
                }
                decoded = _decoded;
                isTokenValid = true;
            });
        }
    }

    const getUser = async () => {
        if (!isTokenValid && !decoded) return null;
        const user = await User.findOne({where: { id: decoded.id }});

        return user;
    }

    verifyAccessToken();

    return {
        isTokenValid,
        decoded,
        getUser
    }
}

module.exports = AccessToken;