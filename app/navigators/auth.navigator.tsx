import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {loginScreen} from '../screens/login/login.screen';
import {useAuthContext} from '../context/auth.context';

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  const {state} = useAuthContext();

  return (
    <Stack.Navigator headerMode="none" mode="card">
      <Stack.Screen
        name="Login"
        component={loginScreen}
        options={{
          animationTypeForReplace: state.isSignout ? 'pop' : 'push',
        }}
      />
    </Stack.Navigator>
  );
};
