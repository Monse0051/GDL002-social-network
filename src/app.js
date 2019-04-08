//startup login template
const contentDiv = document.getElementById("content"); 

contentDiv.innerHTML = loginTemplate();

firebase.initializeApp(config);

// Get elements
const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnSignUp = document.getElementById("btnSignUp");
const btnLogOut = document.getElementById("btnLogOut");



let errorDiv = document.getElementById("error");

/**
 * Function that maps firebase error code from firebase API
 * to a descriptive message of the error in spanish
 * @param {string} errorCode 
 */
function codeMessageMapper(errorCode){
  let message = "";
  switch(errorCode){
    case "auth/invalid-email":
      message = `<p class = "warn">Correo Electrónico inválido</p>`;
      break;
    case "auth/user-not-found":
      message = `<p class = "warn">Correo Electrónico no registrado</p>`;
      break;
    case "auth/wrong-password":
      message =`<p class = "warn">contraseña incorrecta</p>`;
      break;
    case "auth/email-already-in-use":
      message = `<p class = "warn">este Correo Electrónico ya está en uso</p>`;
      break;
    case "auth/weak-password":
      message = `<p class = "warn">la contraseña debe tener al menos 6 caracteres</p>`;
      break;
    default:

  }

  return message;
}

/**
 * Wrapper for firebase authentication services.
 * @param {string} email 
 * @param {string} password 
 * @param {firebase auth service interface} object returned from firebase.auth() 
 * @param {string} authEvent signin or createuser 
 * @param {DOM element} errorSection DOM element where errors messages are shown
 */
function authEvent(email, password, auth, authEvent, errorSection) {

  let promise;

  if (authEvent === "signin") {
    promise = auth.signInWithEmailAndPassword(email, password);
  }
  else if (authEvent === "createuser") {
    promise = auth.createUserWithEmailAndPassword(email, password);
   
  }

  promise.then( function(){
    //console.log("DEBUG_MSG auth event");
    errorSection.style.display = "none";
    if (authEvent === "createuser") {
      //createUser(email);
    }
  }).catch(function (error) {
    errorSection.style.display = "block";
    errorSection.innerHTML = codeMessageMapper(error.code);
    //console.log(error.message);
  });
}

btnLogin.addEventListener("click", function(event) {
  authEvent(txtEmail.value, txtPassword.value, firebase.auth(), "signin", errorDiv);
});

btnSignUp.addEventListener("click", function(event){
  authEvent(txtEmail.value, txtPassword.value, firebase.auth(), "createuser", errorDiv);
});


  // add log out event listener
  // logs out the user and refreshes window to #login
  btnLogOut.addEventListener("click", event => {
    firebase.auth().signOut();
    location.reload(true);
  });


// add realtime listener
/**
 * firebaseUser is an object with all information of a login user
 * if the user logs out or is not sign in then firebaseUser is null
 */
firebase.auth().onAuthStateChanged( function(firebaseUser) {
  // TODO create functions handleSignedInUser and handleSignedOutUser
  //console.log("DEBUG_MSG: auth state change event");
  
  if (firebaseUser) {
    //console.log(firebaseUser);
    btnLogOut.style.visibility = "visible";
        handleSignedInUser(firebaseUser);
  } else {
    console.log("not logged in");
    btnLogOut.style.visibility = "hidden";
    handleSignedOutUser();
  }
});

const signInGoogleBtn = document.getElementById('sign-in-google');
// Set GOOGLE as provider
let provider = new firebase.auth.GoogleAuthProvider();
//let provider = new firebase.auth.FacebookAuthProvider();

//Get GOOGLE ACCOUNT Authentication FIREBASE DOCUMENTATION
const googleSignin = () => {
 firebase.auth().signInWithRedirect(provider).then(function(result) {
 // This gives you a Google Access Token. You can use it to access the Google API.
 var token = result.credential.accessTokzen;
 // The signed-in user info.
 var user = result.user;

 //FIXME what happens if user already exist
 //createUser(user.email);
}).catch(function(error) {
 // Handle Errors here.
 var errorCode = error.code;
 var errorMessage = error.message;
 // The email of the user's account used.
 var email = error.email;
 // The firebase.auth.AuthCredential type that was used.
 var credential = error.credential;
 console.log("DEBUG_MSG: error code = " + errorCode);
});
};

signInGoogleBtn.addEventListener("click", googleSignin );


// // Navigate whenever the fragment identifier value changes.
// // TODO
// window.addEventListener("hashchange", router);
// window.addEventListener("load", router);
