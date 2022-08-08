import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Home as HOME_SCREEN } from '@screens/home';
import { Favorite as FAVORITE_SCREEN } from '@screens/favorite';
import { Watchlist as WATCHLIST_SCREEN } from '@screens/watchlist';
import { List as LIST_SCREEN } from '@screens/list';
import { Regular } from './Text';

export default Navbar = () => {
    const Tab = createBottomTabNavigator();

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
                name='FAVORITE_SCREEN_TAB'
                component={FAVORITE_SCREEN}
                options={{
                    tabBarLabel: 'Favorite',
                    tabBarIcon: ({ focused, color, size }) => (
                        <MaterialCommunityIcons name={focused ? "heart-circle" : "heart-circle-outline"} color={color} size={30} />
                    ),
                }} />
            <Tab.Screen
                name='WATCHLIST_SCREEN_TAB'
                component={WATCHLIST_SCREEN}
                options={{
                    tabBarLabel: 'Watchlist',
                    tabBarIcon: ({ focused, color, size }) => (
                        <MaterialIcons name={focused ? "bookmark" : "bookmark-outline"} color={color} size={size} />
                    ),
                }} />
            <Tab.Screen
                name='LIST_SCREEN_TAB'
                component={LIST_SCREEN}
                options={{
                    tabBarLabel: 'Rate',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? "ios-list" : "ios-list"} color={color} size={size} />
                    ),
                }} />
        </Tab.Navigator>
    )
}