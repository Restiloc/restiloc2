import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';

import { useReducer, useState } from 'react';

import {
  StyleSheet,
} from 'react-native';

import Landing from 'screens/Landing';
import Login from 'screens/Login';
import Storage from 'src/Storage';
import Dashboard from 'src/screens/Dashboard';

type meResponseType = {
	message?: string,
	created_at: string,
	email: string,
	email_verified_at?: string,
	firstName: string,
	id: number,
	lastName: string,
	phoneNumber: string,
	updated_at: string,
	username: string,
}

type credentials = {
  identifier: string,
  password: string,
}

const Stack = createNativeStackNavigator();

export const AuthContext = React.createContext("auth");

function App(): JSX.Element {

  const [ loginError, setLoginError ] = useState(false);

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

      let data: meResponseType = await response;
      let isSignedIn: boolean = true;

      if (data.message) {
        isSignedIn = false;
      }
      Storage.remove("token");

      dispatch({ type: 'RESTORE_TOKEN', isSignedIn: isSignedIn });
    };

    bootstrapAsync();
  }, []);

  const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
  });

  console.log(state)

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
      signOut: () => dispatch({ type: 'SIGN_OUT' })
    }),
    []
  );

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator>
        {state.isSignedIn === false ? (
          <>
            <Stack.Screen name="landing" component={ Landing } options={{ headerShown: false }} />
            <Stack.Screen name="login" component={ Login } options={{ headerShown: false }} /> 
          </>
        ) : (
          <>
            <Stack.Screen name="dashboard" component={ Dashboard } options={{ headerShown: false }} />
          </>
        )}      
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}

export default App;
