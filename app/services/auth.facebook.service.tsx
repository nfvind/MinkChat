import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
/*

LoginManager.configure({
    scopes: ['email', 'profile'],
    webClientId:
        '930058345444-8nrc5mnhus45qfeoeanr12u7emf275mp.apps.googleusercontent.com',
    offlineAccess: false,
});
const signIn = async () => {
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
        console.error(error);
    }
};
const signOut = async () => {
    try {
        await GoogleSignin.signOut();
        await auth().signOut();
    } catch (error) {
        throw new Error(error.toString());
    }
};
export {signOut, signIn, checkAuth};
*/
