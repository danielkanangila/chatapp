import { useContext } from "react";
import { WebSocketContext } from "./../webSocket";

export const useWebSocket = () => {
    const { socket } = useContext(WebSocketContext);

    const connect = (userId, username) => {
        if (!socket) return;
        socket.auth = { userId, username };
        socket.connect();
    }

    const sendMessage = (data, body) => {
        if (!socket) return;
        socket.emit("new-message", {
            message: data.message,
            recipientId: body.recipientId,
            sender: data.sender,
        });
    }

    const emitMessageUpdated = (data) => {
        if (!socket) return;
        socket.emit("update-message", data);
    };

    const goOnline = (user) => {
        if (!socket) return;
        socket.emit("go-online", user.id);
    }

    const logout = (userId) => {
        if (!socket) return;
        socket.emit("logout", userId);
        // removed socket connection
        socket.off("connect_error")
    }

    return {
        socket,
        connect,
        sendMessage,
        goOnline,
        emitMessageUpdated,
        logout,
    }
}