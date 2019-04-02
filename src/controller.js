const pathToWindow = (path) => {
    location.hash = `${path}`;
}

const handleSignedOutUser = () => {
    location.hash = "#login";
    // contentDiv.innerHTML =  
    // `
    // `;    
}

//pienso que se puede crear una función pura que maneje estas dos
// también sugiero cambairles el nombre
const USERS_COLLECTION = "users_tests_monse";

const handleSignedInUser = (firebaseUser) => {
    //location.hash = "#timeline";
    let userEmail = firebaseUser.email;
    let userName = firebaseUser.displayName;
    let userId = firebaseUser.uid;

    contentDiv.innerHTML = 
    `<section class = "timeline-screen">
        <nav id = "timeline-nav" class= "timeline-nav flex-row">
            <h1>madame{code}</h1>
            <a href="">Salir<img src=""></a>
        </nav>

        <div id="user-info"></div>

        <article id="create-post" class="create-post">
            <h2>Crear Publicación:</h2>
            <input id="input-post" type="text" placeholder="¿Qué quieres compartir con la comunidad?">
            <p>Visible para:</p>
            <input type="radio" name="public" value="public"> Público
            <input type="radio" name="friends" value="friends"> Sólo Amigos
            <br>
            <button id ="button-post">Publicar</button>
        </article>
    </section>

    <section id="all-posts">
        <h2>Publicaciones recientes:</h2>
        <article id="display-posts">
            <div id ="own-post">
                <p id="user-email"><span class="strong">${userEmail}</span> compartió:</p><button id="edit-post">Edit</button>
                <br>
                <p id="publication" contenteditable="false">Texto EDITABLE de la publicación:</p>
                <br>
                <button id="like-post">like</button>
            </div>
            <div id ="other-post">
                    <p id="user-email"><span class="strong">correodeotros@es.com</span> compartió:</p>
                    <br>
                    <p id="publication">Texto de la publicación:</p>
                    <br>
                    <button id="like-post">like</button>
            </div>
        </article>
    </section>
    `;

    console.log(userEmail);
    document.getElementById("button-post").addEventListener("click", function () {
        let post = document.getElementById("input-post").value;
        if (post.length >0) {
            //TODO: extract if post is public or not from radio box
            
            db.collection(`${USERS_COLLECTION}/user_${userEmail}/Posts FROM:${userEmail}/`)
            .add(CreatePost(userEmail, post, true))
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id); //DOCUMENT ID
            })
            .catch(function(error) {
                console.error("Error adding document: ", error.code);//Catches ERROR
            });
        }

        else{
            // TODO show message that post is empty
        }

    });


    const userInfo = document.getElementById('user-info');
    userInfo.innerHTML =    `ID de usuario: ${userId}<br>
                            Email: ${userEmail}<br>
                            Nombre: ${userName}`;



}

const CreatePost = (mail, textval, isPublic) => {
    //TODO make a function to return current date
    return {
        email:mail,
        text: textval,
        is_public: isPublic,
        date : "01/04/2019"
    };
}

const createUser = (email) => {
    let db = firebase.firestore();
    let usersRef = db.collection(USERS_COLLECTION);
    usersRef.doc(`user_${email}`).set({email: email});
}