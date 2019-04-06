const USERS_COLLECTION = "users_posts";

function createPost(mail, textval, isPublic) {
   
    ////Function to return current date
    const getdate=()=> {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;
        return today;
    };
    let date = getdate();
    
    ////CREATES OBJECT for post
    return {
        email:mail,
        text: textval,
        is_public: isPublic,
        date : `${date}`,
        likes: 0
        };
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
    document.getElementById("button-post").addEventListener("click", function () {

        let postText = document.getElementById("input-post").value;
        let postError = document.getElementById("post-error"); //section for error

        if (postText.length >0) {
            const post = createPost(userEmail, postText, true);

            db.collection(`${USERS_COLLECTION}`).add(post)
            .then (function (docRef){
                location.reload();
            }).catch (function (error){
                console.error ("Error del post:", error.code);
            });
        }
        else{
            if (postText == "") {
                postError.innerHTML = "La publicación no puede estar vacía."
            }
        }
    });
    ////end of CREATES POST

    //// SHOW POSTS FROM ALL USERS

    let getCollection = db.collection(USERS_COLLECTION).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots

            
            if (userEmail == doc.data().email){
                let postTemplateOwn = `<p class ="purple">Fecha: ${doc.data().date}<br>
                                <strong>${doc.data().email}</strong> compartió la publicación:
                                <br><i>${doc.data().text}</i>
                                <br><button id="add-like">Me gusta</button>
                                <br>Likes:<span id= "likes-counter">${doc.data().likes}
                                <br><button id = "edit-button">Editar</button>
                                <br>
                                `;
                postsSection.innerHTML += postTemplateOwn;                
            }
            else {
                let postTemplateOthers = `<p>Fecha: ${doc.data().date}<br>
                                <strong>${doc.data().email}</strong> compartió la publicación:
                                <br><i>${doc.data().text}</i>
                                <br><button id="add-like">Me gusta</button>
                                <br>Likes:<span id= "likes-counter">${doc.data().likes}
                                <br>
                                `;
                postsSection.innerHTML += postTemplateOthers;
            }
        });
    });

    /////////// end of SHOW POST FROM ALL USERS ////////
}

const handleSignedOutUser = () => {
    location.hash = "#login";
}
