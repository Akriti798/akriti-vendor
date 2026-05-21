import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens
import VendorDashboardScreen from '../screens/VendorDashboardScreen';
import VendorCategoriesScreen from '../screens/VendorCategoriesScreen';
import VendorOrdersScreen from '../screens/VendorOrdersScreen';
import VendorOrderDetailScreen from '../screens/VendorOrderDetailScreen';
import VendorProductListScreen from '../screens/VendorProductListScreen';
import VendorAddProductScreen from '../screens/VendorAddProductScreen';
import VendorEditProductScreen from '../screens/VendorEditProductScreen';
import VendorProfileScreen from '../screens/VendorProfileScreen';
import VendorTransactionsScreen from '../screens/VendorTransactionsScreen';
import WithdrawScreen from '../screens/WithdrawScreen';
import EarningDashboardScreen from '../screens/EarningDashboardScreen';
import RefundTransactionsScreen from '../screens/RefundTransactionsScreen';
import SettingsDashboardScreen from '../screens/SettingsDashboardScreen';
import { 
  TabStackParamList, 
  OrdersStackParamList, 
  ProductsStackParamList,
  ProfileStackParamList
} from './types';

const Stack = createNativeStackNavigator();

// Home Stack
export const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="VendorDashboard" component={VendorDashboardScreen} />
  </Stack.Navigator>
);

// Categories Stack
export const CategoriesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="VendorCategories" component={VendorCategoriesScreen} />
  </Stack.Navigator>
);

// Orders Stack
const OrdersStackLayer = createNativeStackNavigator<OrdersStackParamList>();
export const OrdersStack = () => (
  <OrdersStackLayer.Navigator screenOptions={{ headerShown: false }}>
    <OrdersStackLayer.Screen name="VendorOrders" component={VendorOrdersScreen} />
    <OrdersStackLayer.Screen name="VendorOrderDetail" component={VendorOrderDetailScreen} />
  </OrdersStackLayer.Navigator>
);

// Products Stack
const ProductsStackLayer = createNativeStackNavigator<ProductsStackParamList>();
export const ProductsStack = () => (
  <ProductsStackLayer.Navigator screenOptions={{ headerShown: false }}>
    <ProductsStackLayer.Screen name="VendorProductList" component={VendorProductListScreen} />
    <ProductsStackLayer.Screen name="VendorAddProduct" component={VendorAddProductScreen} />
    <ProductsStackLayer.Screen name="VendorEditProduct" component={VendorEditProductScreen} />
  </ProductsStackLayer.Navigator>
);

// Profile Stack
const ProfileStackLayer = createNativeStackNavigator<ProfileStackParamList>();
export const ProfileStack = () => (
  <ProfileStackLayer.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStackLayer.Screen name="VendorProfile" component={VendorProfileScreen} />
    <ProfileStackLayer.Screen name="VendorTransactions" component={VendorTransactionsScreen} />
    <ProfileStackLayer.Screen name="Withdraw" component={WithdrawScreen} />
    <ProfileStackLayer.Screen name="EarningDashboard" component={EarningDashboardScreen} />
    <ProfileStackLayer.Screen name="RefundTransactions" component={RefundTransactionsScreen} />
    <ProfileStackLayer.Screen name="SettingsDashboard" component={SettingsDashboardScreen} />
  </ProfileStackLayer.Navigator>
);
