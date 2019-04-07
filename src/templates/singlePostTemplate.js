function postTemplate(cssClass, date, email, id, text, likes, editable = false) {
    
    let post = `<section id="post_${id}" class ="${cssClass}">
    <p >Fecha: ${date}<br>
    <strong>${email}</strong> compartió la publicación:
    <br>
    <section>
    <i>${text}</i>
    </section>
    <br><button class="btn-like" id="add-like_${id}">Me gusta</button>
    <div>Likes:<span id= "likes-counter_${id}">${likes}</div>
    `;

    if(editable) {
        post +=   `<button class="btn-edit" id = "edit-button_${id}">Editar</button><br>
        <button class="button-hide" id=${id}>Guardar</button>`;
    }
    
    post += "</section>";
    return post;
}