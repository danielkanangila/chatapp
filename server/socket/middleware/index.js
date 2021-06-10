const authentication = (socket, next) => {
    if (!socket.handshake.auth.user) {
        return next(new Error("Authentication Error."));
    }
    socket.request.user = socket.handshake.auth.user
    next();
}

module.exports = {
    authentication,
}