// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDnvxnMaP5PAim0UgbV9Y7LlbvAd_MzWXw",
    authDomain: "organizapp-99d0c.firebaseapp.com",
    projectId: "organizapp-99d0c",
  });
  
  var db = firebase.firestore();

//Agregar Registros a Cloud Firestore
function guardar(){
    var nombre = document.getElementById("nombre").value;
    var papellido = document.getElementById('papellido').value;
    var sapellido = document.getElementById('sapellido').value;
    var curp = document.getElementById('curp').value;
    var tel = document.getElementById('tel').value;
    var correo = document.getElementById('correo').value;
  db.collection("eventos/evento1/beneficiarios").add({
      nombre: nombre,
      papellido: papellido,
      sapellido: sapellido,
      curp: curp,
      tel: tel,
      correo: correo,
  })
  .then(function(docRef){
      console.log("Registrado con el ID: ", docRef.id);
      document.getElementById('nombre').value = "";
      document.getElementById('papellido').value = "";
      document.getElementById('sapellido').value = "";
      document.getElementById('curp').value = "";
      document.getElementById('tel').value = "";
      document.getElementById('correo').value = "";
  })
  .catch(function(error){
      console.log("Error al agregar el registro: ", error);
      document.getElementById('nombre').value = "";
      document.getElementById('papellido').value = "";
      document.getElementById('sapellido').value = "";
      document.getElementById('curp').value = "";
      document.getElementById('tel').value = "";
      document.getElementById('correo').value = "";
})
}//cierra funcion guardar

//Leer Registros     //<th scope="row">${doc.id}</th>
var tabla = document.getElementById('tabla');
db.collection("eventos/evento1/beneficiarios").onSnapshot((querySnapshot) => {
  tabla.innerHTML="";
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().nombre}`);
        tabla.innerHTML += `
        <tr>
        
        <th scoope="row">${doc.data().nombre}</td>
        <td>${doc.data().papellido}</td>
        <td>${doc.data().sapellido}</td>
        <td>${doc.data().curp}</td>
        <td>${doc.data().tel}</td>
        <td>${doc.data().correo}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}',
              '${doc.data().papellido}','${doc.data().sapellido}','${doc.data().curp}','${doc.data().tel}','${doc.data().correo}')">Editar</button></td>
      </tr>
        `

    });
});

//Borrar Registros
function eliminar(id){
  db.collection("eventos/evento1/beneficiarios").doc(id).delete().then(function(){
    console.log("Registro Eliminado");
  }).catch(function(error){
    console.error("Error al borrar Registro: ", error);
  })
} //Cierra funcion eliminar


//Editar Registros de Docunentos
function editar(id,nombre,papellido,sapellido,curp,tel,correo){

      document.getElementById('nombre').value=nombre;
      document.getElementById('papellido').value=papellido;
      document.getElementById('sapellido').value=sapellido;
      document.getElementById('curp').value=curp;
      document.getElementById('tel').value=tel;
      document.getElementById('correo').value=correo;
      var boton=document.getElementById('boton');
      boton.innerHTML='Editar';
      var titulo=document.getElementById('titulo');
      titulo.innerHTML='Editar Beneficiarios';

      boton.onclick=function(){
  var washingtonRef = db.collection("eventos/evento1/beneficiarioss").doc(id);
// Set the "capital" field of the city 'DC'
    var nombre = document.getElementById("nombre").value;
    var papellido = document.getElementById('papellido').value;
    var sapellido = document.getElementById('sapellido').value;
    var curp = document.getElementById('curp').value;
    var tel = document.getElementById('tel').value;
    var correo = document.getElementById('correo').value;

    return washingtonRef.update({
      nombre: nombre,
      papellido: papellido,
      sapellido: sapellido,
      curp: curp,
      tel: tel,
      correo: correo,
    })
    .then(function() {
      console.log("Registro Actualizado!");
      document.getElementById('nombre').value = "";
      document.getElementById('papellido').value = "";
      document.getElementById('sapellido').value = "";
      document.getElementById('curp').value = "";
      document.getElementById('tel').value = "";
      document.getElementById('correo').value = "";
      boton.innerHTML='Registrar';
      boton.onclick = guardar;
      titulo.innerHTML='Registrar Beneficiarios';
    
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}//cierra funcion anonima de boton
}//cierra funcion editar