import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useAuthContext} from '../context/auth.context';
import {AuthTypes} from '../reducers/auth.reducer';
import {checkGoogleAuth} from '../services/auth.google.service';
//import {checkFacebookAuth} from '../services/auth.facebook.service';
import {AuthNavigator} from './auth.navigator';
import {Text, View} from 'react-native';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  const {state, dispatch} = useAuthContext();

  useEffect(() => {
    const loadAuth = async () => {
      let userCredential = null;
      try {
        userCredential = await checkGoogleAuth();
        console.log('root nav', userCredential);
      } catch (error) {
        console.log('error', error);
      }
      dispatch({
        type: AuthTypes.Restore,
        payload: {
          userCredential: userCredential,
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

          <View>lol</View>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
