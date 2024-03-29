import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {enableLatestRenderer} from 'react-native-maps';
import React, { useReducer } from 'react';

/**
 * Screens
 */
import Landing from 'src/screens/Landing';
import Login from 'src/screens/Login';
import Mission from 'src/screens/Mission';
import Planning from 'src/screens/Planning';
import Settings from 'src/screens/Settings';
import Statistics from 'src/screens/Statistics';
import History from 'src/screens/History';
import Unavailable from 'src/screens/Unavailable';
import Expertise from 'src/screens/Expertise';
import PeriodStatistics from 'src/screens/PeriodStatistics';
import Years from 'src/screens/Years';
import Weeks from 'src/screens/Weeks';
import WeekStatistics from 'src/screens/WeekStatistics';
import Missions from 'src/screens/Missions';
import FinishedMissions from 'src/screens/FinishedMissions';

/**
 * Services
 */
import { authenticated, login, logout } from 'src/services/api/Auth';
import { Credentials } from 'src/Types';
import Observer from 'src/services/Observer';

enableLatestRenderer();

Observer.networkObserver();

const Stack = createNativeStackNavigator();

export const AuthContext = React.createContext("auth");

function App(): JSX.Element {

  const [state, dispatch] = useReducer(
    (prevState: any, action: any): any => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            isSignedIn: action.isSignedIn,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignedIn: action.isSignedIn,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignedIn: false,
          };
      }
    },
    {
    }
  );

  React.useEffect(() => {
    (async () => {
      let isSignedIn: boolean = true;
      const auth = await authenticated();
      if (!auth) isSignedIn = false;
      dispatch({ type: 'RESTORE_TOKEN', isSignedIn: isSignedIn });
    })();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: Credentials) => {
        console.log("Call login with the following payload: ", data);
        const auth = await login(data);
        if (!auth) return false;
        dispatch({ type: 'SIGN_IN', isSignedIn: true });
      },
      signOut: async () => {
        await logout();
        dispatch({ type: 'SIGN_OUT'})
      }
    }),
    []
  );

  return (
    <NavigationContainer>
      {/* @ts-ignore */}
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator>
        {state.isSignedIn === false ? (
          <>
            <Stack.Screen name="landing" component={ Landing } options={{ headerShown: false }} />
            <Stack.Screen name="login" component={ Login } options={{ headerShown: false, animationTypeForReplace: 'push', animation:'slide_from_right' }}/> 
          </>
        ) : (
          <>
            {/* @ts-ignore */}
            <Stack.Screen name="planning" component={ Planning } options={{ headerShown: false, animation:'none' }} />
            <Stack.Screen name="missions" component={ Missions } options={{ headerShown: false, animationTypeForReplace: 'push', animation:'slide_from_right' }} />
            <Stack.Screen name="finishedMissions" component={ FinishedMissions } options={{ headerShown: false, animationTypeForReplace: 'push', animation:'slide_from_right' }} />
            {/* @ts-ignore */}
            <Stack.Screen name="mission" component={ Mission } options={{ headerShown: false, animationTypeForReplace: 'push', animation:'slide_from_bottom' }} />
            <Stack.Screen name="statistics" component={ Statistics } options={{ headerShown: false, animation:'none' }} />
            <Stack.Screen name="settings" component={ Settings } options={{ headerShown: false, animation:'none' }} />
            {/* @ts-ignore */}
            <Stack.Screen name="history" component={ History } options={{ headerShown: false, animationTypeForReplace: 'push', animation:'slide_from_right' }} />
            {/* @ts-ignore */}
            <Stack.Screen name="unavailable" component={ Unavailable } options={{ headerShown: false, animationTypeForReplace: 'push', animation:'slide_from_right' }} />
            {/* @ts-ignore */}
            <Stack.Screen name="expertise" component={ Expertise } options={{ headerShown: false, animationTypeForReplace: 'push', animation:'slide_from_right' }} />
            {/* @ts-ignore */}
            <Stack.Screen name="period" component={ PeriodStatistics } options={{ headerShown: false, animationTypeForReplace: 'push', animation:'slide_from_right' }} />
            <Stack.Screen name="years" component={ Years } options={{ headerShown: false, animationTypeForReplace: 'push', animation:'slide_from_right' }} />
            {/* @ts-ignore */}
            <Stack.Screen name="weeks" component={ Weeks } options={{ headerShown: false, animationTypeForReplace: 'push', animation:'slide_from_right' }} />
            {/* @ts-ignore */}
            <Stack.Screen name="week" component={ WeekStatistics } options={{ headerShown: false, animationTypeForReplace: 'push', animation:'slide_from_right' }} />
          </>
        )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}

export default App;
