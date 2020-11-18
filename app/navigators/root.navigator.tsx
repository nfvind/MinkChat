import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useAuthContext} from '../context/auth.context';
import {AuthTypes} from '../reducers/auth.reducer';
import {AccessToken} from 'react-native-fbsdk';
import {checkGoogleAuth} from '../services/auth.google.service';
//import {checkFacebookAuth} from '../services/auth.facebook.service';
import {AuthNavigator} from './auth.navigator';
import {Text, View} from 'react-native';
import {HomeNavigator} from './home.navigator';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  const {state, dispatch} = useAuthContext();

  useEffect(() => {
    const loadAuth = async () => {
      let userCredentialG = null;
      let userCredentialFB = null;
      try {
        userCredentialG = await checkGoogleAuth();
        userCredentialFB = await AccessToken.getCurrentAccessToken();

        AccessToken.getCurrentAccessToken().then((data) => {
          console.log(data.accessToken.toString());
          userCredentialFB = data.accessToken.toString();
        });
      } catch (error) {
        console.log('error', error);
      }
      dispatch({
        type: AuthTypes.Restore,
        payload: {
          userCredential: userCredentialFB,
        },
      });
    };
    loadAuth();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" mode="card">
        {state.userCredential == null ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          // User is signed in
          <Stack.Screen name="Home" component={HomeNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
