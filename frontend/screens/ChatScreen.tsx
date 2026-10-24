import { useEffect, useRef, useState } from 'react'
import { FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Paperclip, Send } from 'lucide-react-native'
import { useRoute } from '@react-navigation/native'
import { createSocketConnection } from '../socket/socket'
import { Socket } from 'socket.io-client'
export default function ChatScreen() {
    const [messages, setMessages] = useState<any[]>([])
    const [isConnected, setConnected] = useState(false)
    const route = useRoute<any>()
    const socketRef = useRef<Socket | null>(null)
    const [input, setInput] = useState<string>('')

    const name = route.params?.username;

    useEffect(() => {
        const socket = createSocketConnection()
        socketRef.current = socket;

        const handleConnect = () => {
            setConnected(true)
            socket.emit("message:join", { username: name })
        }
        const handleGetInitialMessages = (initialMessages: any) => {
            setMessages(initialMessages)
        }
        const handleReceiveMessage = (message: any) => {
            setMessages((prevMessages) => [...prevMessages, message])
        }
        const handleDisconnect = () => {
            setConnected(false)
        }
        socket.on('connect', handleConnect)
        socket.on('message:history', handleGetInitialMessages)
        socket.on('message:receive', handleReceiveMessage)
        socket.on('disconnect', handleDisconnect)

        return () => {
            socket.off('connect', handleConnect)
            socket.off('message:history', handleGetInitialMessages)
            socket.off('message:receive', handleReceiveMessage)
            socket.off('disconnect', handleDisconnect)
            socket.disconnect()
        }
    }, [name])

    const handleSendMessage = () => {
        const socket = socketRef.current;
        if (!input.trim() || !socket) return;
        socket.emit('message:send', { content: input, username: name })
        setInput('')
    }

    const renderMessage = ({ item }: any) => {
        if (item?.type === 'system') {
            return (
                <View style={{ alignSelf: 'center', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 2, backgroundColor: '#40c977' }}>
                    <Text style={{ color: '#fff' }}>{item.content}</Text>
                </View>
            )
        }
        return (
            <View style={{ alignItems: item?.username !== name ? 'flex-start' : 'flex-end' }}>
                {item?.username !== name && (
                    <View style={{ maxWidth: '60%', marginBottom: 5 }}>
                        <Text>{item?.username}</Text>
                    </View>
                )}
                <View style={{ maxWidth: '60%', padding: 7, backgroundColor: item?.username === name ? 'rgb(32, 160, 145, 1)' : '#ccc', borderTopStartRadius: item?.username === name ? 15 : 0, borderTopEndRadius: item?.username !== name ? 15 : 0, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                    <Text style={{ color: item?.username === name ? '#fff' : '#111', fontWeight: '500', fontSize: 15, letterSpacing: 1 / 4 }}>
                        {item?.content}
                    </Text>
                </View>
                <Text style={{ color: '#999', fontSize: 12, fontWeight: '400' }}>
                    {new Date(item?.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </View>
        )

    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
            <View style={{ flex: 1, padding: 10 }}>
                <FlatList
                    data={messages}
                    keyExtractor={(item: any) => item?.id}
                    renderItem={renderMessage}
                    contentContainerStyle={{ gap: 12 }}
                />
            </View>
            <View style={{ height: '10%', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 15, paddingHorizontal: 10, marginVertical: 10 }}>
                <View>
                    <Paperclip size={20} color={'#111'} />
                </View>
                <TextInput onChangeText={setInput} value={input} placeholder="Type a message..." style={{ flex: 1, borderRadius: 15, borderWidth: 1 / 2, paddingHorizontal: 15 }} />
                <TouchableOpacity onPress={handleSendMessage} style={{
                    backgroundColor: '#159e8c', padding: 12, borderRadius: 25, justifyContent: 'center', alignItems: 'center'
                }}>
                    <Send size={25} color={'#fff'} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}