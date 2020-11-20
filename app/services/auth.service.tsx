import {GoogleSignIn, signOutGoogle} from '../services/auth.google.service';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {SignInWithFacebook, signOutFacebook} from './auth.facebook.service';
import {useAuthContext} from '../context/auth.context';
import {statusCodes} from "@react-native-community/google-signin";
const signIn = async (credProvider) => {
  try {
    let credentials = await credProvider();
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
  } catch (e) {}
};
const signOut = async () => {
  try {
  } catch (error) {
    throw new Error(error.toString());
  }
};
export {signOut, signIn, checkAuth, LoginProviderTypes};
