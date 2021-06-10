import React, { createContext } from 'react';
import io from "socket.io-client";
import { useDispatch } from "react-redux";

import { WS_BASE_URL } from "./config";
import {
    setNewMessage,
    removeOfflineUser,
    addOnlineUser,
} from "./store/conversations"

export const WebSocketContext = createContext();

const WebSocketContextProvider = ({ children }) => {
    const dispatch = useDispatch();

    let socket;

    if (!socket) {
        socket = io(WS_BASE_URL);

        socket.on("connect", () => {
            console.log("connected to server");
          
            socket.on("add-online-user", (id) => {
              dispatch(addOnlineUser(id));
            });
          
            socket.on("remove-offline-user", (id) => {
              dispatch(removeOfflineUser(id));
            });
            socket.on("new-message", (data) => {
              dispatch(setNewMessage(data.message, data.sender));
            });
            socket.on("connect_error", (err) => console.log(err.message));
        });
    }

    return (
        <WebSocketContext.Provider value={{ socket  }}>
            { children }
        </WebSocketContext.Provider>
    )
}

export default WebSocketContextProvider;