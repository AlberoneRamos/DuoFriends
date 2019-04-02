import { firebaseRef, firebaseAuth } from './index';

export function createUser(email, password) {
  return firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(saveUser)
}

export function SignOut() {
  return firebaseAuth.signOut();
}

export function authenticate(email, password) {
  return firebaseAuth.signInWithEmailAndPassword(email, password)
}

export function resetPassword (email) {
  return firebaseAuth.sendPasswordResetEmail(email)
}

export const storageKey = 'USER_UID';

export const isAuthenticated = () => {
  return !!firebaseAuth.currentUser || !!localStorage.getItem(storageKey);
}

export function saveUser (user) {
  return firebaseRef.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}