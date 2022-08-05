import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Home as HOME_SCREEN } from '@screens/home';
import { Account as ACCOUNT_SCREEN } from '@screens/account';
import { Find as FIND_SCREEN } from '@screens/find';
import { Regular } from './Text';

export default Navbar = () => {
    const Tab = createBottomTabNavigator();
    // const [token, setToken] = React.useState(null)

    // const getToken = async () => {
    //     const token = await AsyncStorage.getItem('TOKEN')
    //     setToken(token)
    // }
    // getToken()

    return (
        <Tab.Navigator
            initialRouteName={"HOME_SCREEN_TAB"}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#0cc1cf',
                tabBarShowLabel: false,
                tabBarStyle: {
                    padding: 5
                }
            }}
        >
            <Tab.Screen
                name='HOME_SCREEN_TAB'
                component={HOME_SCREEN}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size} />
                    ),
                }} />
            <Tab.Screen
                name='FIND_SCREEN_TAB'
                component={FIND_SCREEN}
                options={{
                    tabBarLabel: 'Find',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? "search" : "search"} color={color} size={size} />
                    ),
                }} />
            <Tab.Screen
                name='ACCOUNT_SCREEN_TAB'
                component={ACCOUNT_SCREEN}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ focused, color, size }) => (
                        <MaterialCommunityIcons name={focused ? "account-circle" : "account-circle-outline"} color={color} size={size} />
                    ),
                }} />
        </Tab.Navigator>
    )
}