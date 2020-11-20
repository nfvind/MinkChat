import React, {useEffect} from 'react';
import {StyleSheet, Text, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuthContext} from '../../context/auth.context';
import {signOutGoogle} from '../../services/auth.google.service';
import {signInWithFacebook} from '../../services/auth.facebook.service';
import {AuthAction} from '../../reducers/auth.reducer';
import {LoginProviderTypes, signOut} from '../../services/auth.service';
export const HomeScreen = () => {
  const {state, dispatch} = useAuthContext();

  useEffect(() => {}, [state.userCredential]);

  const handleSignOut = async () => {
    await signOut(LoginProviderTypes.Facebook);
    await signOut(LoginProviderTypes.Google);
    console.log('logout');
    dispatch({type: AuthAction.SignOut});
  };
  const handleChatRoomsClick = ({}) => {};
  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={styles.title}>
        {'Hej'} {state.userCredential?.additionalUserInfo.profile.name}
      </Text>
      <Button
        style={{marginHorizontal: 40, marginBottom: 20}}
        title={'translations.logout'}
        color={'#ff0000'}
        onPress={handleSignOut}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 40,

    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
  },
});
