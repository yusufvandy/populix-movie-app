import Navbar from '@components/Navbar';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export const renderRoutes = () => {
    return (
        <>
            <Stack.Screen name="HOME_SCREEN" component={Navbar} options={{ title:"asd", headerShown: false, animationEnabled: true }} />
        </>
    );
};