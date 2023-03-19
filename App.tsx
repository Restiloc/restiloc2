import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';

import { useReducer } from 'react';

import Landing from 'screens/Landing';
import Login from 'screens/Login';
import Storage from 'src/Storage';
import Navbar from 'src/components/Navbar';
import Mission from 'src/screens/Mission';
import Planning from 'src/screens/Planning';
import Settings from 'src/screens/Settings';
import Statistics from 'src/screens/Statistics';
import type { Expert } from 'src/Types';
import History from 'src/screens/History';

type credentials = {
  identifier: string,
  password: string,
}

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
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await Storage.get("token");
      } catch (e) {
        await Storage.remove("token");
      }        
      
      // Fetch endpoint to check if token is valid
      let response = fetch('https://restiloc.space/api/me', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + userToken,
        },
      }).then((r) => r.json())

      let data: Expert = await response;
      let isSignedIn: boolean = true;

      if (data.message) {
        Storage.remove("token");
        isSignedIn = false;
      }

      dispatch({ type: 'RESTORE_TOKEN', isSignedIn: isSignedIn });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: credentials) => {
        console.log("Context: ", data)

        const auth = fetch("https://restiloc.space/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(data)
        }).then((response) => response.json())

        let response = await auth

        console.log("Call response:", response);

        if (!response.status) {
          console.log("Error: ", response.message);
          return false;
        }
        
        await Storage.set("token", response.token);

        dispatch({ type: 'SIGN_IN', isSignedIn: true });
      },
      signOut: async () => {
        await Storage.remove("token");
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
            <Stack.Screen name="planning" component={ Planning } options={{ headerShown: false, animation:'none' }} />
            {/* @ts-ignore */}
            <Stack.Screen name="mission" component={ Mission } options={{ headerShown: false, animationTypeForReplace: 'push', animation:'slide_from_bottom' }} />
            <Stack.Screen name="statistics" component={ Statistics } options={{ headerShown: false, animation:'none' }} />
            <Stack.Screen name="settings" component={ Settings } options={{ headerShown: false, animation:'none' }} />
            {/* @ts-ignore */}
            <Stack.Screen name="history" component={ History } options={{ headerShown: false, animationTypeForReplace: 'push', animation:'slide_from_right' }} />
          </>
        )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}

export default App;
