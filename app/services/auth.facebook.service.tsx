import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import AuthProvider = FirebaseAuthTypes.AuthProvider;

const signInWithFacebook = async () => {
  try {
    const result = await LoginManager.LogInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      console.error('noget gik galt ved hentning af token');
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      console.error('no token data');
    }
    const fbCreds = auth.FacebookAuthProvider.credential(data.accessToken);
    return auth().signInWithCredential(fbCreds);
  } catch (e) {
    console.error(e);
  }
};

const checkFacebookAuth = async () => {
  try {
    const result = await LoginManager.LogInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      console.error('noget gik galt ved hentning af token');
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      console.error('no token data');
    }
    const fbCreds = auth.FacebookAuthProvider.credential(data.accessToken);

    return auth().signInWithCredential(fbCreds);
  } catch (e) {
    // @ts-ignore
    console.error(e);
  }
};
const signOutFacebook = async () => {
  try {
    LoginManager.logOut();
  } catch (e) {
    throw new Error(e.toString());
  }
};
export {signOutFacebook, signInWithFacebook, checkFacebookAuth};
