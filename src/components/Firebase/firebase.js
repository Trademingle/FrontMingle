// import app from 'firebase/app'; 
// import from 'firebase/messaging';
import firebase from 'firebase';
import api from '../api/api';
import "firebase/auth"
// const config = {
//     apiKey: "AIzaSyBYt8_7KADYF1fsBKF0wxOG5_SWY2lPyDk",
//     authDomain: "booktrades-8f170.firebaseapp.com",
//     databaseURL: "https://booktrades-8f170.firebaseio.com",
//     projectId: "booktrades-8f170",
//     storageBucket: "booktrades-8f170.appspot.com",
//     messagingSenderId: "810334480356",
//     appId: "1:810334480356:web:ab2a8b8241701e2c3789f1",
//     measurementId: "G-G8QBQWQNTE"
// };

// var config = {
//     apiKey: "AIzaSyARTjraxEpZqygB62W10x_ISKjzh0NsY5c",
//     authDomain: "booktrades-ef251.firebaseapp.com",
//     databaseURL: "https://booktrades-ef251.firebaseio.com",
//     projectId: "booktrades-ef251",
//     storageBucket: "booktrades-ef251.appspot.com",
//     messagingSenderId: "95103237352",
//     appId: "1:95103237352:web:81873c6a9b042f834d1d5d"
// };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyARTjraxEpZqygB62W10x_ISKjzh0NsY5c",
    authDomain: "booktrades-ef251.firebaseapp.com",
    databaseURL: "https://booktrades-ef251.firebaseio.com",
    projectId: "booktrades-ef251",
    storageBucket: "booktrades-ef251.appspot.com",
    messagingSenderId: "95103237352",
    appId: "1:95103237352:web:81873c6a9b042f834d1d5d",
    measurementId: "G-2RZCGYRG5W"
  };

class Firebase {
    constructor() {
        this.app = firebase.initializeApp(config);
        this.auth = this.app.auth();
        
        this.googleProvider = new firebase.auth.GoogleAuthProvider(); 
        // this.emailProvider = new firebase.auth.EmailAuthProvider();
        // debugger; 
        this.emailProvider = this.app.firebase_.auth.EmailAuthProvider
        // console.log(this.app.firebase_.auth.EmailAuthProvider.credential())
    }
    
    // *** Auth API ***

    registerMessaging(){
      this.messaging = this.app.messaging();
      const messaging = this.messaging;
      Notification.requestPermission().then(async function() {
        messaging.getToken({vapidKey: 'BElgJfbDxG4CjtcSZzwDKLSz_s23S8GWxekpqx-MFgh1ELI4afdHKsJOmNWKh3iN5VPHRTEfR9gtUbWn3PVOmy0'}).then((currentToken) => {
              if (currentToken) {
                  api.sendMessagingToken(currentToken);
              } else {
                  console.log('No registration token available. Request permission to generate one.');
              }
              }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
              });
      })
      .catch(function(err) {
          console.log("Unable to get permission to notify.", err);
      });
      messaging.onMessage((payload) => {
        console.log('Message received. ', payload)
        if(window.location.href.includes("InboxPage")){
          console.log('On messaging');
        }else{
          console.log('not on messaging');
        }
        window.postMessage(payload, window.location.href);
      });
    }
    login(email, password) {
      return this.auth.signInWithEmailAndPassword(email, password)
    }
  
    logout() {
      return this.auth.signOut()
    }
  
    async register(email, password) {
      return this.auth.createUserWithEmailAndPassword(email, password)
      
    }
  
    isInitialized() {
      return new Promise(resolve => {
        this.auth.onAuthStateChanged(resolve)
      })
    }


    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);
    
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password); 
        
    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);
    
    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);

    signup = (email, password, dob, address) => 
         this.auth().createUserWithEmailAndPassword(email, password);
}

export const firebase_instance = new Firebase();
export const auth = firebase.auth; 
export default firebase_instance; 
