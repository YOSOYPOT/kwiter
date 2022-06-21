function iniciarsesion() {
    nombreusuario = document.getElementById("nombredeusuario").value;
    localStorage.setItem("nombredeusuario", nombreusuario);
    window.location = "kwiter.html";
}