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
export enum AuthAction {
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
  [AuthAction.Restore]: {
    userCredential: FirebaseAuthTypes.UserCredential;
  };
  [AuthAction.SignIn]: {
    userCredential: FirebaseAuthTypes.UserCredential;
  };
  [AuthAction.SignOut]: undefined;
};
export type AuthActionType = ActionMap<AuthPayload>[keyof ActionMap<
  AuthPayload
>];
export const authReducer = (state: AuthType, action: AuthActionType) => {
  console.log('authRed', action.type, AuthAction.Restore);
  if (action.type !== "SIGN_OUT") {
    console.log("reducer",action.payload.userCredential);
  }
  switch (action.type) {
    case AuthAction.Restore: {
      return {
        ...state,
        userCredential: action.payload.userCredential,
        isLoading: false,
      };
    }
    case AuthAction.SignIn:
      return {
        ...state,
        isSignout: false,
        userCredential: action.payload.userCredential,
      };
    case AuthAction.SignOut:
      return {
        ...state,
        isSignout: true,
        userCredential: null,
      };
    default:
      return state;
  }
};
