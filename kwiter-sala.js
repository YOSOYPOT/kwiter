const firebaseConfig = {
    apiKey: "AIzaSyB61blWOC2hd9zO6z70zHC5uWVxgbsxbOY",
    authDomain: "kwiter-b4ac1.firebaseapp.com",
    databaseURL: "https://kwiter-b4ac1-default-rtdb.firebaseio.com",
    projectId: "kwiter-b4ac1",
    storageBucket: "kwiter-b4ac1.appspot.com",
    messagingSenderId: "65263792599",
    appId: "1:65263792599:web:15afaee9fadcc2fad89b92"
  };
  firebase.initializeApp(firebaseConfig);
function Salir() {
    window.location = "index.html";
    localStorage.removeItem("nombredeusuario");
    localStorage.removeItem("salanombre");
}

function agregarsala() {
    nombresala = document.getElementById("salanombre").value;
    firebase.database().ref("/").child(nombresala).update({
        objetivo:"agregarnombredelasala"
    });
    localStorage.setItem("salanombre",nombresala);
    window.location = "kwiter-chat.html";
}
nombredeusuario = localStorage.getItem("nombredeusuario");
document.getElementById("Hola").innerHTML = "Bienvenido "+nombredeusuario;

function Leerbasededatos() {
    firebase.database().ref("/").on('value', function(snapshot){
        document.getElementById("salida").innerHTML = "";
        snapshot.forEach(function(childSnapshot){
            datos = childSnapshot.key;
            salas = datos;
            fila = "<div id="+salas+" onclick='irasala(this.id)'>#"+salas+"</div>";
            document.getElementById("salida").innerHTML +=fila;
        });
    });
}
Leerbasededatos();

function irasala(name) {
    localStorage.setItem("salanombre", name);
    window.location = "kwiter-chat.html"
} 