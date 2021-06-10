const { Server } = require("socket.io")
const { authentication } = require("./middleware");
const { 
    logout, 
    addOnlineUser,
    newMessage 
} = require("./handlers");

/**
 * Initializing web socket
 * @param {object} server | Express application
 */
const initialize = (server) => {
    const io = new Server(server);

    // authenticate user middleware
    io.use(authentication);
  
    io.on("connection", (socket) => {
        socket.on("go-online", ((id) => addOnlineUser(socket, id)));
    
        socket.on("new-message", (data) => newMessage(socket, data));
    
        socket.on("logout", (id) => logout(socket, id));

        socket.on('error', err => console.log(err))
    });
}

module.exports = {
    initialize
};