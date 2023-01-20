// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Rootstackscreen from '../potato_mobileapp/screens/RootstackScreen';



const App = () => {
  return (
    // <StatusBar style="auto" />
      <NavigationContainer>
        <Rootstackscreen/>
      </NavigationContainer>

     /* </View> */
  );
}

export default App;


