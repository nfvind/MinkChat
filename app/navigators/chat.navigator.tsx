import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ChatRoom} from '../screens/chatroom/chatroom.screen';
import {ChatRooms} from '../screens/chatrooms/chatrooms.screen';

const Stack = createStackNavigator();

export const ChatNavigator = () => (
  <Stack.Navigator initialRouteName="Chatroom" headerMode="none">
    <Stack.Screen name="ChatRooms" component={ChatRooms} />
    <Stack.Screen name="Home" component={ChatRoom} />
  </Stack.Navigator>
);
