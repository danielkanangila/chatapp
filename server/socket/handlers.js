const sessions = require("./store");

const addOnlineUser = (socket) => {
    if (!sessions.get(socket.sessionId)) {
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
    if (sessions.get(socket.sessionId)) {
        sessions.remove(socket.sessionId);
        socket.sessionId = undefined;
        /**
         * as we are supporting multiple we are going to check is user has another opening session, 
         * if yes, we will not emit remove-offline-user event.
         * Otherwise we will emit the event
         */
        if (sessions.isUserOnline(socket.userId)) return;
        
        socket.broadcast.emit("remove-offline-user", socket.userId);
    }
}

module.exports = {
    addOnlineUser,
    newMessage,
    updateMessage,
    logout,
}