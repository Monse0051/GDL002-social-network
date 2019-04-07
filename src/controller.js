const USERS_COLLECTION = "users_posts";

function createPost(mail, textval, isPublic) {
   
    ////Function to return current date
    const getDate=()=> {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;
        return today;
    };

    let getTime = () => {
        let today = new Date();
        let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
        return time;
    };

    let date = getDate();
    let time = getTime();
    console.log(time);
    ////CREATES OBJECT for post
    return {
        email:mail,
        text: textval,
        is_public: isPublic,
        date : `${date}`,
        time : `${time}`,
        likes: 0
        };
}

function savePost(mail, postSection, errorSection){
    let db = firebase.firestore();
    let postText = postSection.value;

    if (postText.length >0) {
        const post = createPost(mail, postText, true);

        db.collection(`${USERS_COLLECTION}`).add(post)
        .then (function (docRef){
            location.reload();
        }).catch (function (error){
            console.error ("Error del post:", error.code);
        });
    }
    else{
        if (postText == "") {
            errorSection.innerHTML = "La publicación no puede estar vacía."
        }
    }
}

function editPost(domElemPost, date, text) {
    domElemPost.getElementsByTagName("p")[0].innerText = `Fecha: ${date}`;
    domElemPost.getElementsByTagName("section")[0].innerHTML = `<i>${text}</i>`;
}

function handleSignedInUser(firebaseUser) {
    location.hash = "#timeline";

    ////DECLARE and CALL Variables 
    let userEmail = firebaseUser.email; 
    contentDiv.innerHTML = timelineTemplate();
    let db = firebase.firestore();
    let greetUser = document.getElementById('logged-user');
    let signOutFromNav = document.getElementById('sign-out-nav');
    let postsSection= document.getElementById("all-posts");

    greetUser.innerHTML = `¡Hola, ${userEmail}!`;

    signOutFromNav.addEventListener("click", event => {
        firebase.auth().signOut();
        location.reload(true);
    });

    ////CREATES POST
    let buttonPost = document.getElementById("button-post");
    buttonPost.addEventListener("click", function () {
        savePost(userEmail, document.getElementById("input-post"), document.getElementById("post-error"));
    });
    ////end of CREATES POST

    //// SHOW POSTS FROM ALL USERS
    let collectionRef = db.collection(USERS_COLLECTION);

    collectionRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            let id = doc.id;
            let data = doc.data();
            
            let postEditable = false;
            let cssClass = "";

            if (userEmail === data.email) {
                postEditable = true;
                cssClass = "purple";
            }

            postsSection.innerHTML += postTemplate(cssClass, data.date, data.email, id,
                                                data.text, data.likes, postEditable);
  
        });
    }).then(function () {
         /// LIKE BUTTON HANDLER ///
        let buttonsLike = document.getElementsByClassName("btn-like");
        let db = firebase.firestore();

        for (let index = 0; index < buttonsLike.length; index++) {
            const button = buttonsLike[index];
            let id = button.id.slice("add-like_".length);

            button.addEventListener("click", function () {
                let postDocRef = db.collection(USERS_COLLECTION).doc(id);

                db.runTransaction(function (transaction) {
                    return transaction.get(postDocRef).then(function (post){
                        //increasing likes by 1
                        let likesCount = post.data().likes + 1;
                        transaction.update(postDocRef, {likes: likesCount});
                        return likesCount;
                    });
                }).then(function (likesCount) {
                    document.getElementById(`likes-counter_${id}`).innerHTML = likesCount;
                    console.log("likes = " + likesCount);
                });

            }); 
        }

        /// END BUTTON HANDLER

        /// EDIT HANDLER
        let buttonsEdit = document.getElementsByClassName("btn-edit");

        for (let index = 0; index < buttonsEdit.length; index++) {
            const buttonEdit = buttonsEdit[index];
            let id = buttonEdit.id.slice("edit-button_".length);
    
            buttonEdit.addEventListener("click", function () {
                let domElemPost = document.getElementById(`post_${id}`);
                let postSection = domElemPost.getElementsByTagName("section")[0];
                let postText = postSection.getElementsByTagName("i")[0];
                postSection.innerHTML = `<input value="${postText.innerText}">`;
                let saveBtn = domElemPost.getElementsByClassName("button-hide")[0];
                saveBtn.style.visibility = "visible";

                //// SAVE POST HANDLER
                saveBtn.addEventListener("click", function () {
                    
                    let db = firebase.firestore();
                    let id = this.id;
                    let postDocRef = db.collection(USERS_COLLECTION).doc(this.id);
                    let domElemPost = document.getElementById(`post_${id}`);
                    let postSection = domElemPost.getElementsByTagName("section")[0];
                    let postText = postSection.getElementsByTagName("input")[0].value;

                    db.runTransaction(function (transaction) {
                        return transaction.get(postDocRef).then(function (post){
                            let data = post.data();
                            let postObj = createPost(data.email, postText, isPublic=true); 
                            transaction.update(postDocRef, postObj);

                            let domElemPost = document.getElementById(`post_${id}`);
                            //domElemPost.innerHTML = postTemplate("purple", data.date, data.email,
                            //            post.id, postText, data.likes, editable=true);
                            editPost(domElemPost, data.date, postText);
                            return postObj;
                        });
                    }).then(function (postObj) {
                        console.log("post = " + postObj);

                    });
                    //TODO use class .button-hide instead
                    this.style.visibility = "hidden";
                });

           }); 
        }

    });

    
    /////////// end of SHOW POST FROM ALL USERS ////////
}

const handleSignedOutUser = () => {
    location.hash = "#login";
}
