import { Server } from "socket.io";

const io = new Server(3000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
})
const messages = [
    {
        id: Date.now().toString(),
        content: "Welcome to the chat",
        username: "System",
        type: "system",
        timestamp: new Date().toISOString(),
    },
]

io.on('connection', (socket) => {
    console.log("New user connect socket: " + socket.id)
    socket.join("groupMessage")
    socket.on('message:join', (data) => {
        // const message = {
        //     id: Date.now().toString(),
        //     content: `${data.username} join chat group`,
        //     username: "System",
        //     timestamp: new Date().toISOString(),
        //     type: "system",
        // }

        // messages.push(message);
        io.to("groupMessage").emit('message:history', messages)
    })

    socket.on('message:send', (data) => {
        const message = {
            id: Date.now().toString(),
            content: data.content,
            username: data.username,
            timestamp: new Date().toISOString(),
            type: "user",
        }
        messages.push(message)
        io.to("groupMessage").emit('message:receive', message)
    })

    socket.on('disconnect', () => {
        // const message = {
        //     id: Date.now().toString(),
        //     content: "Some one left the chat",
        //     username: "System",
        //     timestamp: new Date().toISOString(),
        //     type: "system",
        // }
        // messages.push(message)
        console.log("User disconnect: " + socket.id)
        // socket.emit('message:receive', message)
    })
})