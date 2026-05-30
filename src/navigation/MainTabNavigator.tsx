import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Animated } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


// Import our Tab Stacks
import { 
  HomeStack, 
  CategoriesStack, 
  OrdersStack, 
  ProductsStack, 
  ProfileStack 
} from './TabStacks';

const Tab = createBottomTabNavigator();

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabBarMain}>
        {state.routes.map((route, index) => {
          const options = descriptors[route.key].options;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Map emojis
let iconName = '';
let label = '';

switch (route.name) {
  case 'Home':
    iconName = isFocused ? 'home' : 'home-outline';
    label = 'Home';
    break;

  case 'Products':
    iconName = isFocused ? 'cube' : 'cube-outline';
    label = 'Products';
    break;

  case 'Categories':
    iconName = isFocused ? 'grid' : 'grid-outline';
    label = 'Categories';
    break;

  case 'Orders':
    iconName = isFocused ? 'receipt' : 'receipt-outline';
    label = 'Orders';
    break;

  case 'Profile':
    iconName = isFocused ? 'person' : 'person-outline';
    label = 'Profile';
    break;
}

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
             <View style={styles.iconContainer}>
               <Ionicons
                 name={iconName}
                 size={24}
                 color={isFocused ? '#ff7a00' : '#8E8E93'}
               />
             </View>
              <Text style={[
                styles.tabLabel,
                { color: isFocused ? '#ff7a00' : '#8E8E93', fontWeight: isFocused ? '700' : '500' }
              ]}>
                {label}
              </Text>
              
              {isFocused && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Products" component={ProductsStack} />
      <Tab.Screen name="Categories" component={CategoriesStack} />
      <Tab.Screen name="Orders" component={OrdersStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  tabBarMain: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 95 : 75,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 12,
    paddingBottom: Platform.OS === 'ios' ? 30 : 12,
    paddingTop: 12,
    // Premium Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 25,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(240, 240, 240, 0.8)',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  iconContainer: {
    padding: 4,
    borderRadius: 12,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ff7a00',
    marginTop: 6,
  }
});


export default MainTabNavigator;
