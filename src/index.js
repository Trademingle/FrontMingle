import React from 'react';
import ReactDOM from 'react-dom';
 
import './index.css';
// import * as serviceWorker from './serviceWorker';
 
import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';

if ("serviceWorker" in navigator) {
  // navigator.serviceWorker
  //   .register("/firebase-messaging-sw.js")
  //   .then(function(registration) {
  //     console.log("Registration successful, scope is:", registration.scope);
  //     Firebase.registerMessaging()
  //     Firebase.app.messaging(Firebase.app).useServiceWorker(registration);
  //   })
  //   .catch(function(err) {
  //     debugger;
  //     console.log("Service worker registration failed, error:", err);
  //   });

    navigator.serviceWorker.getRegistration('/').then(registration => {
      if (registration) {
          // optionally update your service worker to the latest firebase-messaging-sw.js
          registration.update().then(() => { 
              Firebase.app.messaging(Firebase.app).useServiceWorker(registration);
              Firebase.registerMessaging()
              // firebase.messaging(this.firebaseApp).useServiceWorker(registration);
              // this.isMessagingInitialized$.next();
          });
      }
      else {
          navigator.serviceWorker.register('firebase-messaging-sw.js', { scope:'/'}).then(
              registration => {
                Firebase.app.messaging(Firebase.app).useServiceWorker(registration);
                Firebase.registerMessaging()
              }
          );

      }
  });
}


ReactDOM.render(
  
  <FirebaseContext.Provider value={Firebase}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);
