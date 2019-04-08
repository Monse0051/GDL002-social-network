function timelineTemplate() {
    return ` <div>
    <nav id = "timeline-nav" class= "timeline-nav flex-row-nav">
        <div></div>
        <h2 class="purple">madame{code}</h2>
        <h3 id="logged-user" class = "mint"></h3>
        <button id="sign-out-nav"><img src="assets/logout.png" class ="logout-icon"></button>
        <div></div>
    </nav>

    <section class = "timeline-screen">
        <h2 class="gray">Crear Publicación:</h2>
        <article id="create-post" class="create-post">
        
        <textarea id="input-post" type="text" placeholder="¿Qué quieres compartir con la comunidad?"></textarea>
        <br>
        <p>Visible para:</p>
            <input type="radio" name="public" value="public"> Público
            <input type="radio" name="friends" value="friends"> Sólo Amigos
        <br>
        <div id="post-error" class="warn"></div>
        <button id="button-post" class = "all-others-buttons">Publicar</button>
        
    </article>

    <h2 class="gray">Publicaciones recientes:</h2>

    <section id="all-posts">   
    </section>

    </section>
    </div>`
    ;
    
};