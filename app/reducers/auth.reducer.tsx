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
  [AuthTypes.SignInGoogle]: {
    userCredential: FirebaseAuthTypes.UserCredential;
  };
  [AuthTypes.SignInFB]: {
    userCredential: FirebaseAuthTypes.UserCredential;
  };
  [AuthTypes.SignOut]: undefined;
};

type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

const authReducer = (state: AuthType, action: AuthActions) => {
  switch (action.type) {
    case AuthTypes.Restore: {
      return {
        ...state,
        userCredential: action.payload.userCredential,
        isLoading: false,
      };
    }
    case AuthTypes.SignInGoogle:
      return {
        ...state,
        isSignout: false,
        userCredential: action.payload.userCredential,
      };
    case AuthTypes.SignInFB:
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

export {AuthActions, authReducer};
