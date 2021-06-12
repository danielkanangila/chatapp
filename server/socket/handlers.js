const sessions = require("./store");

const addOnlineUser = (socket) => {
    if (!sessions.findWhere("userId", socket.userId)) {
        sessions.save(socket.sessionId, { userId: socket.userId });
    }
    // send the user who just went online to everyone else who is already online
    socket.broadcast.emit("add-online-user", socket.userId);
}

const updateMessage = (socket, message) => {
    socket.broadcast.to(message.senderId).emit("updated-message", message);
}
const newMessage = (socket, { message, recipientId, sender }) => {
    socket.broadcast.to(recipientId).emit("receive-message", { 
        message, 
        sender,
        recipientId
    });
}

const logout = (socket) => {
    if (sessions.find(socket.sessionId)) {
        sessions.remove(socket.sessionId);
        socket.sessionId = undefined;
        socket.broadcast.emit("remove-offline-user", socket.userId);
    }
}

module.exports = {
    addOnlineUser,
    newMessage,
    updateMessage,
    logout,
}