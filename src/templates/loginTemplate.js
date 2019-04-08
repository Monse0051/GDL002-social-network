function loginTemplate() {
    return `
    <div class = "flex-row">
      <div class = "login-background"></div>
      <section class = "login-screen flex-column-center">
        <img src = "assets/logomadame.png" class= "main-logo">
        <h1 class="purple">madame{code}</h1>
        <h2 class = "gray">Conectando a aprendices de FRONTEND</h2>
        <h3 class = "mint">Inicia Sesión o Crea Tu Cuenta:</h3>
        <input id = "txtEmail" type="email" placeholder="EMAIL"> 
        <input id = "txtPassword" type="password" placeholder= "CONTRASEÑA">
        <article id = "error" class = "warn"></article>
        <div class = "flex-buttons">
        <button id = btnLogin class="btn-btn-action">Iniciar sesión</button>
        <button id = btnSignUp class="btn-btn-secondary">Crear Cuenta</button>
        <button id= "sign-in-google"><image src = "assets/google-logo.png" class = "google-logo"></button>
        </div>
      </section>
      <div class = "padd"></div>
    </div>
    <div class = "login-background-mobile"></div>
  
   `;
}