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

            let postsData = doc.data();
            let postsId = doc.id;
            

            let idData = {
                idPost : postsId,
                dtaPost: postsData
            }

            if (userEmail == postsData.email){
                let postTemplateOwn = 
                                `<div id = "own-post">
                                    <p class ="purple">Fecha: ${postsData.date} Hora: ${postsData.time}<br>
                                    <strong>${postsData.email}</strong> compartió la publicación:
                                    <br><i>${postsData.text}</i>
                                    <br><button id="add-like">Me gusta</button>
                                    <br>Likes:<span id= "likes-counter">${postsData.likes}
                                    <br><button id = "edit-button" class = "purple-btn">Editar</button>
                                    <br><button id = "delete-button" class = "purple-btn">Eliminar post</button>
                                    <br>
                                </div>`;
                postsSection.innerHTML += postTemplateOwn;
           }

            else {
                let postTemplateOthers = `<p>Fecha: ${postsData.date} Hora: ${postsData.time}<br>
                                <strong>${postsData.email}</strong> compartió la publicación:
                                <br><i>${postsData.text}</i>
                                <br><button id="add-like">Me gusta</button>
                                <br>Likes:<span id= "likes-counter">${postsData.likes}
                                <br>
                                `;
                postsSection.innerHTML += postTemplateOthers;
            }


            let ownPostDiv = document.getElementById("own-post");
            let editBtn = document.getElementById('edit-button');
            let id = doc.id;

            const editPost = (id) => {
                console.log(doc.id)
            }

            editBtn.addEventListener("click", editPost)
            
            

        });
    });

    //// end of SHOW POST FROM ALL USERS
}

const handleSignedOutUser = () => {
    location.hash = "#login";
}
