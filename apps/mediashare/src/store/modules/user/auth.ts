import { Auth } from 'aws-amplify';

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('[signOut] error signing out: ', error);
  }
}
export { signOut };
