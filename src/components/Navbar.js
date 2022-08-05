import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Home as HOME_SCREEN } from '@screens/home';
import { Recommendation as RECOMMENDATION_SCREEN } from '@screens/recommendation';
import { Favorite as FAVORITE_SCREEN } from '@screens/favorite';
import { Watchlist as WATCHLIST_SCREEN } from '@screens/watchlist';
import { Rate as RATE_SCREEN } from '@screens/rate';
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
                name='RECOMMENDATION_SCREEN_TAB'
                component={RECOMMENDATION_SCREEN}
                options={{
                    tabBarLabel: 'Recommendation',
                    tabBarIcon: ({ focused, color, size }) => (
                        <MaterialCommunityIcons name={focused ? "comment-check" : "comment-check-outline"} color={color} size={size} />
                    ),
                }} />
            <Tab.Screen
                name='FAVORITE_SCREEN_TAB'
                component={FAVORITE_SCREEN}
                options={{
                    tabBarLabel: 'Favorite',
                    tabBarIcon: ({ focused, color, size }) => (
                        <AntDesign name={focused ? "heart" : "hearto"} color={color} size={size} />
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
                name='RATE_SCREEN_TAB'
                component={RATE_SCREEN}
                options={{
                    tabBarLabel: 'Rate',
                    tabBarIcon: ({ focused, color, size }) => (
                        <AntDesign name={focused ? "star" : "staro"} color={color} size={size} />
                    ),
                }} />
        </Tab.Navigator>
    )
}