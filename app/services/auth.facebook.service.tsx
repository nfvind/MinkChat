import auth from '@react-native-firebase/auth';
import {AccessToken, LoginManager} from 'react-native-fbsdk';

const SignInWithFacebook = async () => {
  try {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    // Create a Firebase credential with the AccessToken
    let credentials = auth.FacebookAuthProvider.credential(data.accessToken);
    // Sign-in the user with the credential
    return await auth().signInWithCredential(credentials);
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
export {signOutFacebook, SignInWithFacebook, checkFacebookAuth};
