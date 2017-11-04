import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyC3elyKa7A3AKA2PdfU7XeY-XydwfjS4LQ",
    authDomain: "duofriends-44abd.firebaseapp.com",
    databaseURL: "https://duofriends-44abd.firebaseio.com",
    projectId: "duofriends",
    storageBucket: "duofriends-44abd.appspot.com",
    messagingSenderId: "367419709060"
};

firebase.initializeApp(config);

export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const firebaseRef = firebase.database().ref();
export const firebaseAuth = firebase.auth();
export const storageKey = 'AUTH_TOKEN';
export const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem(storageKey);
}
export const storageRef = firebase.storage().ref();
export default firebase;