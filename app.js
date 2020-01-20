function registrar(){
  var email = document.getElementById('email').value;
  var contrasena = document.getElementById('contrasena').value;

 firebase.auth().createUserWithEmailAndPassword(email, contrasena)
  .catch(function(error) {
   // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(error.message);
    // ...
  })
  .then(function(){
    verificarEmail();
  })
}

/* // Escribir en la base de datos
$("#guardarDatos").click(function(){
  firebase.database().ref("Anfitriones Asignados")
  .set({
    nombre:"Eric",
    edad:"47",
    sexo: "h",
  })
}); */

function accesar(){
  var emaila = document.getElementById('emaila').value;
  var contrasenaa = document.getElementById('contrasenaa').value;

 firebase.auth().signInWithEmailAndPassword(emaila, contrasenaa)
  .catch(function(error) {
   // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    // ...
  });
}

function salir(){
  firebase.auth().signOut().then(function(){
    alert("Has Salido");
  })
  .catch(function(error){
    alert("Error al Salir");
  })
}

function verificarEmail(){
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
  // Email sent.
  alert("Email Enviado")
}).catch(function(error) {
  // An error happened.
  alert("Ha Ocurrido un Error");
});
}