import {GoogleSignIn} from '../services/auth.google.service';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {SignInWithFacebook} from "./auth.facebook.service";
import {useAuthContext} from "../context/auth.context";
const signIn = async (LoginProviderType: keyof typeof LoginProviderTypes) => {
  const {AuthProviderType, setAuthProviderType} = useAuthContext();
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
    const userInfo = await GoogleSignin.signInSilently();
    const googlecredentials = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );
    const userCredential = await auth().signInWithCredential(googlecredentials);

    return userCredential;
  } catch (e) {
    // @ts-ignore
    const error =
      e.code === statusCodes.SIGN_IN_REQUIRED ? 'Venligst log ind' : e.message;
    console.error('googleservce', error);
    throw new Error(error);
  }
};
const signOut = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    throw new Error(error.toString());
  }
};
export {signOut, signIn, checkAuth, LoginProviderTypes};
