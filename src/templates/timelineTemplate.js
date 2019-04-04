function timelineTemplate() {
    return ` <section class = "timeline-screen">
    <nav id = "timeline-nav" class= "timeline-nav flex-row">
        <h1>madame{code}</h1>
        <a href="">Salir<img src=""></a>
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
        <div id="post-error" class="red-text"></div>
    </article>

    <h2>Publicaciones recientes:</h2>

    <section id="all-posts">   
    </section>

    </section>`
    ;
    
};