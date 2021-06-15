import { useCallback, useEffect, useState } from "react";
import { useWebSocket } from "./useWebSocket";

export const useTypingEvent = (listenFrom) => {
    const [state, setState] = useState({
        isTyping: false,
        from: undefined
    });
    const { socket } = useWebSocket();

    const isUserTyping = useCallback(({ from }) => {
        setState({
            isTyping: from === listenFrom,
            from
        })
    }, [setState, listenFrom]);

    useEffect(() => {
        if (!socket) return;

        socket.on('otherUser-typing', isUserTyping);

        return () => socket.off('otherUser-typing');
    }, [socket, isUserTyping]);

    useEffect(() => {
        if (!state) return;
        
        const timeout = setTimeout(() => setState({ ...state, isTyping: false}), 1500);

        return () => clearTimeout(timeout);
    }, [state, setState]);

    return {
        ...state,
        updateState: setState,
        isUserTyping
    }
}