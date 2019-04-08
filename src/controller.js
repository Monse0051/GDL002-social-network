const USERS_COLLECTION = "users_posts";


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

function createPost(mail, textval, isPublic) {
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

   
    ////ITERATE POSTS COLLECTION
    db.collection(USERS_COLLECTION).get().then(function(querySnapshot) {
        
         //// SHOW POSTS FROM ALL USERS
        querySnapshot.forEach( (doc) => {

            let postsData = doc.data();
            let id = doc.id;
            let likes = doc.data().likes;

            if (userEmail == postsData.email){
                let id = doc.id;

                let postTemplateOwn = 
                                `<div id = "own-post-${id}" class = "own-post">
                                    <p class ="purple">El día: ${postsData.date} A las: ${postsData.time}<br>
                                    <strong class="gray">${postsData.email}</strong> compartiste la publicación:
                                    <br><i class="gray">${postsData.text}</i>
                                    <br><button class="btn-like" id="add-like_${id}"><img src = "assets/heart.png"></button>
                                    <br><span id= "likes-counter_${id}" class = "purple">${likes}
                                    <br><button id = "edit-button" class = "edit-button all-others-buttons">Editar</button>
                                    <br><button class = "delete-button all-others-buttons" >Eliminar post</button>
                                    <br>
                                </div>`;
                postsSection.innerHTML += postTemplateOwn;


           }

            else {
                let postTemplateOthers = `<div class = "others-post"
                                <p>El día: ${postsData.date} A las: ${postsData.time}<br>
                                <strong class="gray">${postsData.email}</strong> compartió la publicación:
                                <br><i class="gray">${postsData.text}</i>
                                <br><button class="btn-like" id="add-like_${id}"><img src = "assets/heart.png"></button>
                                <br><span id= "likes-counter_${id}" class = "purple">${likes}
                                <br>
                                </div>
                                `;
                postsSection.innerHTML += postTemplateOthers;
            }

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
                });

            }); 
        }
 
       });  
        //// end of SHOW POST FROM ALL USERS
        
        //// add LIKE BUTTON
        let buttonsLike = document.getElementsByClassName("btn-like");

        for (let index = 0; index < buttonsLike.length; index++) {
            const button = buttonsLike[index];
            let id = button.id.slice("add-like_".length);

            button.addEventListener("click", function () {
                let postDocRef = db.collection(USERS_COLLECTION).doc(id);

                db.runTransaction(function (transaction) {
                    return transaction.get(postDocRef).then(function (post){
                        //increasing likes by 1
                        let likesCount = post.data().likes + 1 - 1;
                        transaction.update(postDocRef, {likes: likesCount});
                        return likesCount;
                    });
                }).then(function (likesCount) {
                    document.getElementById(`likes-counter_${id}`).innerHTML = likesCount;
                });

            }); 
        }


        ////// Edit POSTS
            querySnapshot.forEach(function(doc) {
            let postsData = doc.data();
            let id = doc.id;

            let ownPostDiv = document.getElementById(`own-post-${id}`);


            if (ownPostDiv) {

                let editBtn = ownPostDiv.querySelector('.edit-button');
                let deleteBtn = ownPostDiv.querySelector('.delete-button');

                const deletePost = () => {
                    db.collection(USERS_COLLECTION).doc(id).delete().then(function() {
                        console.log("Document successfully deleted!");
                        location.reload();
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
                }

                deleteBtn.addEventListener("click",deletePost);

                const editPost = (event) => {
                ownPostDiv.innerHTML += `<div class="edit-post-div">
                                        <input class="edit-post-input"/>
                                        <br><button class="save-edit-btn all-others-buttons">guardar</button>
                                        <br><button class="cancel-edit-btn all-others-buttons">cancelar</button>
                                        </div>`;


                document.querySelector('.edit-post-input').value = `${doc.data().text}`;
                let saveEditBtn = document.querySelector('.save-edit-btn');
                let cancelEditBtn = document.querySelector('.cancel-edit-btn');

                saveEditBtn.addEventListener("click",()=>{

                    let editedText = document.querySelector('.edit-post-input').value;

                    let editDoc = db.collection(USERS_COLLECTION).doc(id);
                    return editDoc.update({
                        text: editedText
                    })
                    .then(function() {
                        console.log("Document successfully updated!");
                        location.reload();
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
                })

                cancelEditBtn.addEventListener("click",()=>{location.reload()});
                }

                editBtn.addEventListener("click", editPost);
            }
        });
        /////END OF Edit POSTS
    });
    ////END OF ITERATE COLLECTION
}

const handleSignedOutUser = () => {
    location.hash = "#login";
}
