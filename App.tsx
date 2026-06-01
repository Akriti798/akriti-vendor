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
import VendorBusinessDetailsScreen from './src/screens/VendorBusinessDetailsScreen';
import VendorCategorySelectionScreen from './src/screens/VendorCategorySelectionScreen';
import VendorSellerDetailsScreen from './src/screens/VendorSellerDetailsScreen';
import VendorShippingLocationScreen from './src/screens/VendorShippingLocationScreen';
import VendorBankDetailsScreen from './src/screens/VendorBankDetailsScreen';
import VendorBrandDetailsScreen from './src/screens/VendorBrandDetailsScreen';
import VendorStoreSettingScreen from './src/screens/VendorStoreSettingScreen';
import VendorProfileSettingScreen from './src/screens/VendorProfileSettingScreen';
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
            name="VendorBusinessDetails"
            component={VendorBusinessDetailsScreen}
          />
          <Stack.Screen
            name="VendorCategorySelection"
            component={VendorCategorySelectionScreen}
            options={{ presentation: 'transparentModal', headerShown: false }}
          />
          <Stack.Screen
            name="VendorSellerDetails"
            component={VendorSellerDetailsScreen}
          />
          <Stack.Screen
            name="VendorBankDetails"
            component={VendorBankDetailsScreen}
          />
          <Stack.Screen
            name="VendorBrandDetails"
            component={VendorBrandDetailsScreen}
          />
          <Stack.Screen
                      name="VendorShippingLocation"
                      component={VendorShippingLocationScreen}
                    />
                    <Stack.Screen
                                          name="ProfileSetting"
                                          component={VendorProfileSettingScreen}
                                        />
          <Stack.Screen
                                name="StoreSetting"
                                component={VendorStoreSettingScreen}
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
