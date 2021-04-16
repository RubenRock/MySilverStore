import {DbFirestore, autentificacion, providerGoogle, providerFacebbok} from './configFirestore'

const coleccionArticulos = 'MySilver' //nombre de la coleccion de articulos
const coleccionCarrusel = 'Carrusel'  

export const crearUsuarioMail = (email, password, repassword, cerrarModal) => {            
     if (password === repassword) {
        autentificacion.createUserWithEmailAndPassword(email,password)
        .then(user => {
            console.log('Usuario creado con exito')
            cerrarModal()
        })         
        .catch(e => alert(e.message))
     }else
     {
        alert('Las contraseñas son diferentes, vuelve a escribirlas')
     }
     
  } 

export const iniciarUsuarioMail = (email,password,cerrarModal) => {        
    autentificacion.signInWithEmailAndPassword(email,password)
   .then(user => {
       console.log('Inicio exitoso')
       cerrarModal()
    }    
    )
    .catch(e => alert(e.message))
 } 

export const cerrarSesion = () => {
    autentificacion.signOut().then(() => {
        console.log("sesion terminada")
    })
}

export const iniciarGoogle = (cerrarModal) => {
    autentificacion.signInWithPopup(providerGoogle)
    .then((result)=>{
        console.log('inicio con google exitoso')        
        cerrarModal()
    })
    .catch((error) => alert(error.message) )
}

export const iniciarFacebook = (cerrarModal) => {
    autentificacion.signInWithPopup(providerFacebbok)
    .then((result)=>{
        console.log('inicio con facebook exitoso')        
        cerrarModal()
    })
    .catch((error) => alert(error.message) )
}


export const descargarNube = () => new Promise((resolve, reject) =>{
    let resul= []

    DbFirestore.collection(coleccionArticulos).get()
    .then(item=> item.forEach(x => 
        resul.push(x.data())        
    ))  //hasta que termine de leer todos los datos ejecutamos el resolve
    .then(() => resolve(resul))    
})

export const subirNube = (articulos) =>{ 
    let data =[...articulos]    
    let error=''
    data.forEach(item => {                //nombre documento  //datos del docuemnto
        DbFirestore.collection(coleccionArticulos).doc(item.clave).set(item).catch(e => error=e)
    })
    if (!error)
       alert('Proceso correcto')
    else
        console.log('No se guardo correctamente los datos')
}


export const borrarNube= () => new Promise((resolve, reject) =>{  //codigo copiado desde la documentacion de firebase
    DbFirestore.collection(coleccionArticulos).get()
    .then((snapshot) => {
        // When there are no documents left, we are done
        if (snapshot.size === 0) {
         resolve(0);
        }

        // Delete documents in a batch
        let batch = DbFirestore.batch();
        snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
        });

        return batch.commit().then(() => {
            resolve(snapshot.size);
        })
    }
    )
})

export const eliminarElemento = (articulo) => new Promise((resolve, reject) =>{
    DbFirestore.collection(coleccionArticulos).doc(articulo.clave).delete()
    .then(()=> {
        alert(`${articulo.titulo} borrado`)
        resolve()
    })
    .catch(e => {
        console.log(e)
        reject()
    })
})

export const subirCarrusel = (carrusel) =>{          
    let error=''
                        //nombre documento  //datos del docuemnto
    DbFirestore.collection(coleccionCarrusel).doc(carrusel.nombre).set(carrusel).catch(e => error=e)
    
    if (!error)
       alert('Proceso correcto')
    else
        console.log('No se guardo correctamente los datos')
}

export const descargarCarrusel = () => new Promise((resolve, reject) =>{    
    let resul= []

    DbFirestore.collection(coleccionCarrusel).get()
    .then(item=> item.forEach(x => 
        resul.push(x.data())   
    ))  //hasta que termine de leer todos los datos ejecutamos el resolve
    .then(() => resolve(resul))    
})

export const eliminarCarrusel = (foto) => new Promise((resolve, reject) =>{
    
    DbFirestore.collection(coleccionCarrusel).doc(foto).delete()
    .then(()=> {
        resolve()
        alert(`${foto} borrado`)        
    })
    .catch(e => {
        console.log(e)
        reject()
    })
})