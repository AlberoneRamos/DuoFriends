import firebase from 'firebase';

try{
    var config = {
        apiKey: "AIzaSyAjZ0qRrwTJdlbcwJEOwBbibNM2_fXR6pg",
        authDomain: "notstagram.firebaseapp.com",
        databaseURL: "https://duofriends-44abd.firebaseio.com",
        projectId: "notstagram",
        storageBucket: "duofriends-44abd.appspot.com",
        messagingSenderId: "890113377461"
    };
    firebase.initializeApp(config);
} catch(e){

}
export var facebookProvider = new firebase.auth.FacebookAuthProvider();
export var firebaseRef = firebase.database().ref();
export default firebase;