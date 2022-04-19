import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import RegisterScreen from './screens/RegisterScreen';
import LogInscreen from './screens/LogInscreen';
import AddChatScreen from './screens/AddChatScreen';
import Chat from './screens/Chat';
const Stack = createStackNavigator();
const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2C68ED" },
  headerTintColor: "white",
};
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions} >
        <Stack.Screen name='Login' component={LogInscreen}></Stack.Screen>  
        <Stack.Screen name='Register' component={RegisterScreen}></Stack.Screen>
        <Stack.Screen name='Home' component={Home}></Stack.Screen>
        <Stack.Screen name='AddChat' component={AddChatScreen}></Stack.Screen>
        <Stack.Screen name='Chat' component={Chat}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
