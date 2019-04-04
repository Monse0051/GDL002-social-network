function timelineTemplate() {
    return ` <section class = "timeline-screen">
    <nav id = "timeline-nav" class= "timeline-nav flex-row">
        <h1>madame{code}</h1>
        <a href="">Salir<img src=""></a>
    </nav>

    <article id="create-post" class="create-post">
        <h2>Crear Publicación:</h2>
        <input id="input-post" type="text" placeholder="¿Qué quieres compartir con la comunidad?">
        <p>Visible para:</p>
        <input type="radio" name="visibility" value="public"> Público
        <input type="radio" name="visibility" value="friends"> Sólo Amigos
        <br>
        <button id="button-post">Publicar</button>
    </article>

    <h2>Publicaciones recientes:</h2>

    <section id="all-posts">   
    </section>

    </section>`
    ;
    
};