const onlineUsers = require("./../onlineUsers");

const addOnlineUser = (socket, userId) => {
    if (!onlineUsers.includes(userId)) {
        onlineUsers.push(userId);
    }
    // send the user who just went online to everyone else who is already online
    socket.broadcast.emit("add-online-user", userId);
}

const newMessage = (socket, { message, sender }) => {

    socket.broadcast.emit("new-message", { message, sender });
}

const logout = (socket, userId) => {
    if (onlineUsers.includes(userId)) {
        userIndex = onlineUsers.indexOf(userId);
        onlineUsers.splice(userIndex, 1);
        socket.broadcast.emit("remove-offline-user", userId);
    }
}


module.exports = {
    addOnlineUser,
    newMessage,
    logout,
}