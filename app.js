  
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
//Prueba
    creaBase();
  })
}

//Prueba
function creaBase(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
firebase.database().ref('bancoDeAnfitriones/'+ uid ).set({
  email : email,
  nombre : document.getElementById('nombre').value,
  papellido : document.getElementById('pApellido').value,
  sapellido : document.getElementById('sApellido').value,
  tel : document.getElementById('tel').value,
});
}
  }) 
}
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