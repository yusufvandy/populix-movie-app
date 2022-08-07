import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from '@app/store';
import { renderRoutes } from './routes'
import CustomStatusBar from '@components/CustomStatusBar';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

// navigation helpers
export const navigationRef = React.createRef();
export const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

const Stack = createStackNavigator();
const Routes = () => {
  const routeNameRef = React.useRef();
  // initiate custom font
  const [appIsReady, setAppIsReady] = React.useState(false);
  const [accessToken, setAccessToken] = React.useState(null);
  const { request_token } = useSelector(state => state.account);

  // trigger reactive token
  React.useEffect(() => {
    (async () => {
      const ls_access_token = await AsyncStorage.getItem('access_token')
      setAccessToken(ls_access_token)
    })();
  }, [request_token])

  React.useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
          'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    })();
  }, []);

  if (!appIsReady) return null

  SplashScreen.hideAsync()
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
    >
      <Stack.Navigator>{renderRoutes(accessToken)}</Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <CustomStatusBar backgroundColor="#1f1d2b" barStyle="light-content" />
      <Routes />
    </Provider>
  );
};

export default App
