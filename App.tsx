import React from 'react';
import "./src/global.css";
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import VendorSplashScreen from './src/screens/VendorSplashScreen';
import VendorLoginScreen from './src/screens/VendorLoginScreen';
import VendorRegisterScreen from './src/screens/VendorRegisterScreen';
import VendorRegisterOTPScreen from './src/screens/VendorRegisterOTPScreen';
import OTPVerifyScreen from './src/screens/OTPVerifyScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import { RootStackParamList } from './src/navigation/types';



const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        <Stack.Navigator
          initialRouteName="VendorSplash"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name="VendorSplash"
            component={VendorSplashScreen}
          />
          <Stack.Screen
            name="VendorRegister"
            component={VendorRegisterScreen}
          />
          <Stack.Screen
            name="VendorRegisterOTP"
            component={VendorRegisterOTPScreen}
          />
          <Stack.Screen
            name="VendorLogin"
            component={VendorLoginScreen}
          />
          <Stack.Screen
            name="OTPVerify"
            component={OTPVerifyScreen}
          />
          <Stack.Screen
            name="MainApp"
            component={MainTabNavigator}
          />
        </Stack.Navigator>


      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
