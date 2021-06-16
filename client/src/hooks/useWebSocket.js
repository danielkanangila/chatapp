import { useContext } from "react";
import { WebSocketContext } from "./../webSocket";

export const useWebSocket = () => {
    const { socket } = useContext(WebSocketContext);

    const connect = (userId, username) => {
        socket.auth = { userId, username };
        socket.connect();
    }

    const sendMessage = (data, body) => socket.emit("new-message", {
          message: data.message,
          recipientId: body.recipientId,
          sender: data.sender,
    });

    const goOnline = (user) => socket.emit("go-online", user.id);

    const logout = (userId) => {
        socket.emit("logout", userId);
        // removed socket connection
        socket.off("connect_error")
    }

    return {
        socket,
        connect,
        sendMessage,
        goOnline,
        logout,
    }
}