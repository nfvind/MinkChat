import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId:
    '1082060407939-jssggi0ner14jkglv5jtr4k03ffhfmnd.apps.googleusercontent.com',
  offlineAccess: false,
});
const GoogleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return auth.GoogleAuthProvider.credential(userInfo.idToken);
  } catch (e) {
    console.error(e);
  }
};
const signOutGoogle = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    throw new Error(error.toString());
  }
};
export {signOutGoogle, GoogleSignIn};
