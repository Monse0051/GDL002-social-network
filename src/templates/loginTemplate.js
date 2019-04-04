function loginTemplate() {
    return `
    <section class = "login-screen">
   <article id = "error"></article>
   <input id = "txtEmail" type="email" placeholder="Email"> 
   <input id = "txtPassword" type="password" placeholder= "Contraseña">
   <button id = btnLogin class="btn-btn-action">Iniciar sesión</button>
   <button id = btnSignUp class="btn-btn-secondary">Crear Cuenta</button>
   <br>
   <button id= "sign-in-google">Entrar con google</button>  
   </section>
   <br>`;
}