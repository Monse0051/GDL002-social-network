function timelineTemplate() {
    return ` <section class = "timeline-screen">
    <nav id = "timeline-nav" class= "timeline-nav flex-row">
        <h1 class="purple">madame{code}</h1>
        <h3 id="logged-user"></h3>
        <button id="sign-out-nav">Salir<img src=""></button>
    </nav>


    <article id="create-post" class="create-post">
        <h2>Crear Publicación:</h2>
        <input id="input-post" type="text" placeholder="¿Qué quieres compartir con la comunidad?">
        <br>
        <label>Selecciona visibilidad:</label>
        <select id = "select-visibility"> 
                <option value="friends">Sólo Amigos</option>
                <option value="public">Pública</option>
        </select>
        <br>
        <button id="button-post">Publicar</button>
        <div id="post-error" class="warn"></div>
    </article>

    <h2>Publicaciones recientes:</h2>

    <section id="all-posts">   
    </section>

    </section>`
    ;
    
};