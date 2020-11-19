import {GoogleSignIn, signOutGoogle} from '../services/auth.google.service';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {SignInWithFacebook, signOutFacebook} from './auth.facebook.service';
import {useAuthContext} from '../context/auth.context';
import {statusCodes} from "@react-native-community/google-signin";
const signIn = async (LoginProviderType: keyof typeof LoginProviderTypes) => {
  try {
    let credentials = null;

    switch (LoginProviderType) {
      case LoginProviderTypes.Facebook: {
        credentials = await SignInWithFacebook();
        break;
      }

      case LoginProviderTypes.Google: {
        credentials = await GoogleSignIn();
        break;
      }
      default: {
        break;
      }
    }

    return await auth().signInWithCredential(credentials);
  } catch (e) {
    console.error(e);
  }
};
enum LoginProviderTypes {
  Facebook = 'Facebook',
  Google = 'Google',
}
const checkAuth = async () => {
  try {
  } catch (e) {

  }
};
const signOut = async (LoginProviderType: keyof typeof LoginProviderTypes) => {
  try {
    switch (LoginProviderType) {
      case LoginProviderTypes.Facebook: {
        await signOutFacebook();
        break;
      }

      case LoginProviderTypes.Google: {
        await signOutGoogle();
        break;
      }
      default: {
        break;
      }
    }
  } catch (error) {
    throw new Error(error.toString());
  }
};
export {signOut, signIn, checkAuth, LoginProviderTypes};
