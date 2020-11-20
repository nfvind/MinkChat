import React, {useEffect} from 'react';
import {StyleSheet, Text, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuthContext} from '../../context/auth.context';

export const ChatRooms = () => {
  const {state, dispatch} = useAuthContext();

  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={styles.title}>{'Hej chat rooms'}</Text>
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
