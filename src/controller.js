function handleSignedOutUser() {
    location.hash = "#login";
    // contentDiv.innerHTML =  
    // `
    // `;    
}

//pienso que se puede crear una función pura que maneje estas dos
// también sugiero cambairles el nombre

function handleSignedInUser(firebaseUser) {
    location.hash = "#timeline";
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
            <button>Publicar</button>
        </article>
    </section>

    <section id="all-posts">
        <h2>Publicaciones recientes:</h2>
        <article id="display-posts">
            <div id ="own-post">
                <p id="user-email"><span class="strong">micorreo@es.com</span> compartió:</p><button id="edit-post">Edit</button>
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
    const userInfo = document.getElementById('user-info');
    userInfo.innerHTML =    `ID de usuario: ${firebaseUser.uid}<br>
                            Email: ${firebaseUser.email}<br>
                            Nombre: ${firebaseUser.displayName}`;
}

