import React, { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client";

import { WS_BASE_URL } from "./config";
import {
    removeOfflineUser,
    addOnlineUser,
} from "./store/conversations"

export const WebSocketContext = createContext();

const WebSocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const mySocket = io(WS_BASE_URL, { autoConnect: false });
        // connect the socket only if the user is authenticated
        if (user.id) {
            mySocket.auth = { userId: user.id, username: user.username };
            mySocket.connect();
        }

        mySocket.on("add-online-user", (id) => {
            dispatch(addOnlineUser(id));
        });
        
        mySocket.on("remove-offline-user", (id) => {
            dispatch(removeOfflineUser(id));
        });
        
        mySocket.onAny((event, ...args) => {
            console.log(event, args);
        });
        mySocket.on("connect_error", (err) => console.log(err.message || err));
        mySocket.on("disconnet", () => console.log("Connection closed by the server."))

        setSocket(mySocket);

        return () => mySocket.close();
    }, [user]) // eslint-disable-line

    return (
        <WebSocketContext.Provider value={{ socket }}>
            { children }
        </WebSocketContext.Provider>
    )
}

export default WebSocketContextProvider;