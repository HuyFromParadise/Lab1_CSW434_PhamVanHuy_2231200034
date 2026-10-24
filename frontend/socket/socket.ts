import { Platform } from "react-native";
import { io } from "socket.io-client"

const BACKEND_URl = Platform.OS === 'android'
    ? 'http://10.0.2.2:3000'
    : 'http://localhost:3000';

export const createSocketConnection = () => {
    return io(BACKEND_URl, {
        transports: ["websocket"],
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
    })
}