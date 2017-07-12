import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyDTZtBPUDwjtFav_QUC3yyg1JkEaczSQqs",
    authDomain: "expense-manager-d38a7.firebaseapp.com",
    databaseURL: "https://expense-manager-d38a7.firebaseio.com",
    projectId: "expense-manager-d38a7",
    storageBucket: "expense-manager-d38a7.appspot.com",
    messagingSenderId: "561886209780"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;