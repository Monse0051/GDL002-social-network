function handleSignedInUser(firebaseUser) {
    location.hash = "#timeline";
}

function handleSignedOutUser() {
    location.hash = "#login";
}