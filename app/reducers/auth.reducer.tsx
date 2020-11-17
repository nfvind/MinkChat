import {FirebaseAuthTypes} from '@react-native-firebase/auth';

type ActionMap<M extends {[index: string]: any}> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};
export enum AuthTypes {
  Restore = 'RESTORE',
  SignInGoogle = 'SIGN_IN_GOOGLE',
  SignOut = 'SIGN_OUT',
  SignInFB = 'SIGN_IN_FB',
  SignIn = 'SIGN_IN',
}
type AuthType = {
  isLoading: boolean;
  isSignout: boolean;
  userCredential: FirebaseAuthTypes.UserCredential;
};

type AuthPayload = {
  [AuthTypes.Restore]: {
    userCredential: FirebaseAuthTypes.UserCredential;
  };
  [AuthTypes.SignIn]: {
    userCredential: FirebaseAuthTypes.UserCredential;
  };
  [AuthTypes.SignOut]: undefined;
};
export type AuthActionType = ActionMap<AuthPayload>[keyof ActionMap<
  AuthPayload
>];
export const authReducer = (state: AuthType, action: AuthActionType) => {
  console.log('authRed', action.type, AuthTypes.Restore);
  if (action.type !== "SIGN_OUT") {
    console.log(action.payload.userCredential);
  }
  switch (action.type) {
    case AuthTypes.Restore: {
      return {
        ...state,
        userCredential: action.payload.userCredential,
        isLoading: false,
      };
    }
    case AuthTypes.SignIn:
      return {
        ...state,
        isSignout: false,
        userCredential: action.payload.userCredential,
      };
    case AuthTypes.SignOut:
      return {
        ...state,
        isSignout: true,
        userCredential: null,
      };
    default:
      return state;
  }
};
