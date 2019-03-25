/**
 * Initializes Social Network application
 * @param {Object} config configuration data from firebase
 */
function initApp(config) {
  // Initialize Firebase
  
  firebase.initializeApp(config);

  // Get elements
  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById("txtPassword");
  const btnLogin = document.getElementById("btnLogin");
  const btnSignUp = document.getElementById("btnSignUp");;
  const btnLogOut = document.getElementById("btnLogOut");

  let errorDiv = document.getElementById("error");
  // add login Event
  btnLogin.addEventListener("click", event => {
    // Get email and password
    console.log("DEBUG_MSG: login event");
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.then( ()=> {
      errorDiv.style.display = "none";
    }).catch(error => {
      let errorCode = error.code;
      
      errorDiv.style.display = "block";
      switch (errorCode){
        case "auth/invalid-email":
          errorDiv.innerHTML = "Correo Electrónico inválido";
          break;
        case "auth/user-not-found":
          errorDiv.innerHTML = "Correo Electrónico no registrado";
          break;
        case "auth/wrong-password":
          errorDiv.innerHTML = "Contraseña incorrecta";
          break;  
        default:
      }
      console.log(error.message);
    });
  });

  // add sign up event
  btnSignUp.addEventListener("click", event => {
    // Get email and pass
    //TODO: check for real email
    console.log("DEBUG_MSG: sign up event");
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.then( ()=> {
      errorDiv.style.display = "none";
    }).catch(error => {
      let errorCode = error.code;
      
      errorDiv.style.display = "block";
      switch (errorCode){
        case "auth/email-already-in-use":
          errorDiv.innerHTML = "Este correo eléctrónico ya está registrado, intenta con otro";
          break;
        case "auth/invalid-email":
          errorDiv.innerHTML = "Correo Electrónico inválido";
          break;
        case "auth/weak-password":
          errorDiv.innerHTML = "La contraseña debe tener al menos 6 caracteres";
          break;  
        default:
      }
      console.log(error.message);
    });
  });

  // add log out event listener
  btnLogOut.addEventListener("click", event => {
    firebase.auth().signOut();
  });

  // add realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    // TODO create functions handleSignedInUser and handleSignedOutUser
    console.log("DEBUG_MSG: auth state change event");
    if (firebaseUser) {
      console.log(firebaseUser);
      btnLogOut.style.visibility = "visible";
      //handleSignedInUser(firebaseUser);
    } else {
      console.log("not logged in");
      btnLogOut.style.visibility = "hidden";
      //handleSignedOutUser(firebaseUser)
    }
  });

};

initApp(config);

