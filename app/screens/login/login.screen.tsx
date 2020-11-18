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
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  Button,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import RNBootSplash from 'react-native-bootsplash';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {LoginButton, AccessToken} from 'react-native-fbsdk';
import {signInWithGoogle} from '../../services/auth.google.service';
import {AuthTypes} from '../../reducers/auth.reducer';
import {useAuthContext} from '../../context/auth.context';
import {signInWithFacebook} from '../../services/auth.facebook.service';

declare const global: {HermesInternal: null | {}};

export const loginScreen = () => {
  const {dispatch} = useAuthContext();
  const signInWithGoogleBtn = async () => {
    signInWithGoogle()
      .then((userCredential) => {
        dispatch({
          type: AuthTypes.SignIn,
          payload: {
            userCredential: userCredential,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        switch (error.code) {
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE: {
            // android only
            Alert.alert(
              'Google Play-tjenester er ikke tilgængelige eller forældede!',
            );
            break;
          }
          case 'auth/user-disabled': {
            Alert.alert(
              'Brugerkontoen er blevet deaktiveret af en administrator.',
            );
            break;
          }
        }
      });
  };
  const FacebookSignIn = () => {
    signInWithFacebook().then(() => {
      console.log('Signed in with Facebook!');
    });
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.tsx</Text>
                <GoogleSigninButton
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Light}
                  onPress={signInWithGoogleBtn}
                />
                <Button title="Facebook Sign-In" onPress={FacebookSignIn} />
                <LoginButton
                  onLoginFinished={(error, result) => {
                    if (error) {
                      console.log('login has error: ' + result.error);
                    } else if (result.isCancelled) {
                      console.log('login is cancelled.');
                    } else {
                      AccessToken.getCurrentAccessToken().then((data) => {
                        console.log(data.accessToken.toString());
                      });
                    }
                  }}
                  onLogoutFinished={() => console.log('logout.')}
                />
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
