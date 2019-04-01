// //Manual request of FIRESTORE (google documentation)
// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");

console.log(`Hi Firestore is here!`);

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();


//Add Data to FIRESTORE 
//   db.collection("users").add({ //creates COLLECTION "users" then adds DOCUMENT
//     first: "Claudia",
//     last: "Garfias",
//     born: 1914,
//     profilePic: "https://claudiagarfias.works/contents/uploads/media/claudia-garfias-web-developer-profile-photo.jpg?"
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id); //DOCUMENT ID
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error.code);//Catches ERROR
// });