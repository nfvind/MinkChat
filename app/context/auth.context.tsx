import React, {useState} from 'react';
import {createContext, useReducer, useContext, Dispatch} from 'react';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {authReducer, AuthActionType} from '../reducers/auth.reducer';
import {LoginProviderTypes} from "../services/auth.service";

type AuthStateType = {
  isLoading: boolean;
  isSignedOut: boolean;
  userCredential: FirebaseAuthTypes.UserCredential;
};

const initialState: AuthStateType = {
  isLoading: true,
  isSignedOut: false,
  userCredential: null,
};

const AuthContext = createContext<{
  state: AuthStateType;
  dispatch: Dispatch<AuthActionType>; // Dispatch<AuthAction>
}>({
  state: initialState,
  dispatch: () => null,
});

export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [AuthProviderType, setAuthProviderType] = useState<
    LoginProviderTypes
  >();
  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  return context;
};
