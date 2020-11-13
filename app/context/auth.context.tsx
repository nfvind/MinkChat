import React, {Dispatch} from 'react';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {authReducer, AuthActions} from '../reducers/auth.reducer';

type AuthStateType = {
  isLoading: boolean;
  isSignout: boolean;
  userCredential: FirebaseAuthTypes.UserCredential;
};
const initialState: AuthStateType = {
  isLoading: true,
  isSignout: false,
  userCredential: null,
};

// @ts-ignore
const AuthContext = React.createContext<{
  state: AuthStateType;
  dispatch: Dispatch<AuthActions>; // Dispatch<AuthAction>
}>({
  state: initialState,
  dispatch: () => null,
});
export const AuthProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  return context;
}