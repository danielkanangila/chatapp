const { authentication } = require("./middleware");
const { 
    logout, 
    addOnlineUser,
    newMessage,
} = require("./handlers");

/**
 * Initializing web socket
 * @param {object} server | Express application
 */
const initialize = (server) => {
    const io = require("socket.io")(server, {
        cors: "*"
    });

    // authenticate user middleware
    io.use(authentication);
  
    io.on("connection", (socket) => {
        // add connected user to the online user list
        addOnlineUser(socket)
        // join the user id room
        socket.join(socket.userId);
        // Other events handler
        socket.on("go-online", ((id) => addOnlineUser(socket, id)));
    
        socket.on("new-message", (data) => newMessage(socket, data));
    
        socket.on("logout", () => logout(socket, socket.userId))//logout(socket, id));

        socket.on('error', err => console.log(err));

        socket.on("disconnect", () => logout(socket, socket.userId)) //logout(socket, socket.request.user.id))
    });
}

module.exports = {
    initialize
};