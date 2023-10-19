var provider = new firebase.auth.OAuthProvider('apple.com');
provider.addScope('email');
provider.addScope('name');
provider.setCustomParameters({
    // Localize the Apple authentication screen in French.
    locale: 'fr'
});

firebase
  .auth()
  .signInWithPopup(provider)
  .then(function(result) {
    // The signed-in user info.
    var user = result.user;
     // You can also get the Apple OAuth Access and ID Tokens.
    var accessToken = result.credential.accessToken;
    var idToken = result.credential.idToken;

    // ...
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });

firebase.auth().signInWithRedirect(provider); 
// Result from Redirect auth flow.
firebase
  .auth()
  .getRedirectResult()
  .then(function(result) {
    if (result.credential) {
      // You can get the Apple OAuth Access and ID Tokens.
      var accessToken = result.credential.accessToken;
      var idToken = result.credential.idToken;

      // ...
    }
    // The signed-in user info.
    var user = result.user;
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });

  