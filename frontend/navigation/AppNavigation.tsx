import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import ChatScreen from "../screens/ChatScreen";

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
    )

}

export default AppNavigator;