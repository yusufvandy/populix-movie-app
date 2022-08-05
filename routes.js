import Navbar from '@components/Navbar';
import { Home as HOME_SCREEN } from '@screens/home';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export const renderRoutes = () => {
    return (
        <>
            <Stack.Screen name="HOME_SCREEN" component={true ? HOME_SCREEN : Navbar} options={{ headerShown: false, animationEnabled: true }} />
        </>
    );
};