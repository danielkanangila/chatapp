const crypto = require("crypto")
const Cookies = require("../utils/socket-cookies");
const AccessToken = require("./../../utils/access-token");
const randomId = () => crypto.randomBytes(8).toString("hex");

const socketAuthentication = async (socket, next) => {
    
    const cookies = Cookies(socket);
    const accessToken = AccessToken(cookies.get('x-access-token'));
    
    
    if (!accessToken.isTokenValid) return next(new Error('Unauthorized.'));
    
    if (socket.sessionId) return next();
    // get the authenticated user
    const authenticatedUser = await accessToken.getUser();

    socket.request.user = authenticatedUser;
    socket.userId = authenticatedUser.id;
    socket.sessionId = randomId();

    next()
}

const warp = middleware => (socket, next) => middleware(socket.request, {}, next);

module.exports = {
    authentication: socketAuthentication,
    warp
}