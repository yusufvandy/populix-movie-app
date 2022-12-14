import Navbar from '@components/Navbar';
import { Home as HOME_SCREEN } from '@screens/home';
import { MovieDetail as MOVIE_DETAIL_SCREEN } from '@screens/movie/detail';
import { MovieList as MOVIE_LIST_SCREEN } from '@screens/movie/list';
import { List as LIST_SCREEN } from '@screens/list';
import { ListDetail as LIST_DETAIL_SCREEN } from '@screens/list/detail';
import { ListForm as LIST_FORM_SCREEN } from '@screens/list/form';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export const renderRoutes = (token, account_id) => {
    return (
        <>
            <Stack.Screen name="HOME_SCREEN" component={(!account_id && !token) ? HOME_SCREEN : Navbar} options={{ headerShown: false, animationEnabled: true }} />
            <Stack.Screen name="MOVIE_DETAIL_SCREEN" component={MOVIE_DETAIL_SCREEN} options={{ headerShown: false, animationEnabled: true }} />
            <Stack.Screen name="MOVIE_LIST_SCREEN" component={MOVIE_LIST_SCREEN} options={{ headerShown: false, animationEnabled: true }} />
            <Stack.Screen name="LIST_SCREEN" component={LIST_SCREEN} options={{ headerShown: false, animationEnabled: true }} />
            <Stack.Screen name="LIST_DETAIL_SCREEN" component={LIST_DETAIL_SCREEN} options={{ headerShown: false, animationEnabled: true }} />
            <Stack.Screen name="LIST_FORM_SCREEN" component={LIST_FORM_SCREEN} options={{ headerShown: false, animationEnabled: true }} />
        </>
    );
};