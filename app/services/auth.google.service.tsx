import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId:
    '1082060407939-jssggi0ner14jkglv5jtr4k03ffhfmnd.apps.googleusercontent.com',
  offlineAccess: false,
});
const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const googlecredentials = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );

    return await auth().signInWithCredential(googlecredentials);
  } catch (e) {
    console.error(e);
  }
};

const checkGoogleAuth = async () => {
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
const signOutGoogle = async () => {
  try {
    await GoogleSignin.signOut();
    await auth().signOut();
  } catch (error) {
    throw new Error('signout', error.toString());
  }
};
export {signOutGoogle, signInWithGoogle, checkGoogleAuth};
