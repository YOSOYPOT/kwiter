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

nombreusuario = localStorage.getItem("nombredeusuario");
nombresala = localStorage.getItem("salanombre");
document.getElementById("salaactual").innerHTML = "Bienvenido a la sala #"+ nombresala;

function enviarmensaje() {
  mensaje = document.getElementById("mensaje").value;
  firebase.database().ref(nombresala).push({
    usuario:nombreusuario,mensajeenviado:mensaje,like:0
  });
  document.getElementById("mensaje").value = "";
}

function Leerbasededatos() {
  firebase.database().ref("/"+nombresala).on('value', function(snapshot){
    document.getElementById("salascreadas").innerHTML = "";
    snapshot.forEach(function(childSnapshot){
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if(childKey!="objetivo") {
        idmensaje = childKey;
        datosmensaje = childData;
        usuario = datosmensaje['usuario'];
        mensajeenviado = datosmensaje['mensajeenviado'];
        like = datosmensaje['like'];
        lineanombre = "<h3 id='lineanombre'>"+usuario+"✔️</h3>";
        lineamensaje = "<h3 id='mensajeenviado'>"+mensajeenviado+"</h3>";
        botonlike = "<button id="+idmensaje+" value="+like+" onclick='leerlike(this.id)'>";
        linealikes= "<h4 <span>👍 Like: "+like+"</span></button>></h4>";
        fila = lineanombre+lineamensaje+botonlike+linealikes;
        document.getElementById("salascreadas").innerHTML+=fila;
      }
      });
    });
  }
Leerbasededatos();
function leerlike(idlike) {
  checkbutoon= idlike;
  likes = document.getElementById(checkbutoon).value;
  conteolikes = Number(likes)+1;
  firebase.database().ref(nombresala).child(idlike).update({
    like:conteolikes
  });
}