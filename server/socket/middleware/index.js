const Cookies = require("../utils/socket-cookies");
const AccessToken = require("./../../utils/access-token");

const socketAuthentication = async (socket, next) => {
    const cookies = Cookies(socket);
    const accessToken = AccessToken(cookies.get('x-access-token'));

    if (!accessToken.isTokenValid) return next(new Error('Unauthorized.')) 

    socket.request.user = await accessToken.getUser();

    next()
}

const warp = middleware => (socket, next) => middleware(socket.request, {}, next);

module.exports = {
    authentication: socketAuthentication,
    warp
}