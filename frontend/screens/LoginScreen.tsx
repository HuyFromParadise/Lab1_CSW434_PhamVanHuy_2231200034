import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
    const [name, setName] = useState("")
    const navigation = useNavigation<any>()
    const handleLogin = () => {
        if (!name.trim()) {
            Alert.alert("Failed", "Please enter username")
            return
        }

        navigation.navigate('Chat', { username: name })
    }
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 100, marginHorizontal: 20 }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={{ gap: 70 }}>
                    <View style={{ gap: 30 }}>
                        <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: 'semibold' }}>Your Name</Text>
                        <Text style={{ color: '#999', textAlign: 'center' }}>Please enter your name to start a new chat</Text>
                    </View>
                    <View>
                        <View>
                            <Text style={{ color: '#4da37f' }}>Your name</Text>
                            <TextInput style={{ borderBottomColor: '#cdcdcd', borderBottomWidth: 1, height: 50 }} onChangeText={setName} value={name} />
                            <TouchableOpacity onPress={handleLogin} style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#4da37f',
                                height: 50,
                                borderRadius: 30,
                                marginTop: 20,
                            }}>
                                <Text style={{ color: '#fff', fontWeight: '500', fontSize: 25, letterSpacing: 5 }}>Start Chat</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen