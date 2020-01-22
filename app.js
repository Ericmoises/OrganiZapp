  
function registrar(){
  //verifica que la contraseña y su verificación coincidan para proceder a registrar
  if(document.getElementById('contrasena').value!==document.getElementById('confirmaContrasena').value){
    alert("Verifica la Contraseña");
   }else
 {
  var email = document.getElementById('email').value;
  var contrasena = document.getElementById('contrasena').value;

 firebase.auth().createUserWithEmailAndPassword(email, contrasena)
  .catch(function(error) {
   // Mensajes de Error en Crear Usuario
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(error.message);
  })
  .then(function(){
    enviarEmail();
    writeUserData();
  })
}
}


function writeUserData(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // Si el usuario está activo
      //var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      //var photoURL = user.photoURL;
      //var isAnonymous = user.isAnonymous;
      var uid = user.uid;


      //Asignar Rol
        var esadmin = document.getElementById("esAdmin").checked;
        var rol="";
        if(esadmin===true){
          rol="ADMIN";
        }else{
          rol="ANFITRION";
        }

        //Registrar Usuarios con Rol
        firebase.database().ref('bancoDeAnfitriones/'+ uid ).set({
          email : email,
          nombre : document.getElementById('nombre').value.toUpperCase(),
          papellido : document.getElementById('pApellido').value.toUpperCase(),
          sapellido : document.getElementById('sApellido').value.toUpperCase(),
          tel : document.getElementById('tel').value,
          srol: rol,
          verificado: emailVerified,

        })
      }
  }) 
}

function accesar(){
  var emailacceso = document.getElementById('emailAcceso').value;
  var contrasenaacceso = document.getElementById('contrasenaAcceso').value;

 firebase.auth().signInWithEmailAndPassword(emailacceso, contrasenaacceso)
  .catch(function(error) {
   // Mensajes de error
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
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

function enviarEmail(){
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
  // Se envía mensaje
  alert("Email Enviado")
}).catch(function(error) {
  // Error al enviar mensaje
  alert("Ha Ocurrido un Error");
});
}