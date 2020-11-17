/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RNBootSplash from 'react-native-bootsplash';
import {AuthProvider} from './app/context/auth.context';
import {RootNavigator} from './app/navigators';
declare const global: {HermesInternal: null | {}};

const App = () => {
  let init = async () => {
    // …do multiple async tasks
  };

  useEffect(() => {
    init().finally(() => {
      RNBootSplash.hide({duration: 250});
    });
  }, []);
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
