function initApp() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAG-k8sfR7HI-GHNFHv5mQlfb4Bu8zvJIY",
    authDomain: "social-network-a702c.firebaseapp.com",
    databaseURL: "https://social-network-a702c.firebaseio.com",
    projectId: "social-network-a702c",
    storageBucket: "social-network-a702c.appspot.com",
    messagingSenderId: "99341463255"
  };
  firebase.initializeApp(config);

  // Get elements
  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById("txtPassword");
  const btnLogin = document.getElementById("btnLogin");
  const btnSignUp = document.getElementById("btnSignUp");;
  const btnLogOut = document.getElementById("btnLogOut");

  // add login Event
  btnLogin.addEventListener("click", function(event) {
    // Get email and password
    console.log("DEBUG_MSG: login event");
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch( event => console.log(event.message));
  });

  // add sign up event
  btnSignUp.addEventListener("click", event => {
    // Get email and pass
    //TODO: check for real email
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e =>console.log(e.message));
});

// add log out event listener
btnLogOut.addEventListener("click", event => {
    firebase.auth().signOut();
});

// add realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    // TODO create functions handleSignedInUser and handleSignedOutUser
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

initApp();

