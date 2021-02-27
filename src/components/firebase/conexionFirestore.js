import {DbFirestore, autentificacion, providerGoogle, providerFacebbok} from './configFirestore'

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
    .catch((error) => console.log(error) )
}

export const iniciarFacebook = (cerrarModal) => {
    autentificacion.signInWithPopup(providerFacebbok)
    .then((result)=>{
        console.log('inicio con facebook exitoso')        
        cerrarModal()
    })
    .catch((error) => console.log(error) )
}


export const descargarNube = () => new Promise((resolve, reject) =>{
    let resul= []

    DbFirestore.collection('boveda').get()
    .then(item=> item.forEach(x => 
        resul.push(x.data())        
    ))  //hasta que termine de leer todos los datos ejecutamos el resolve
    .then(() => resolve(resul))    
})

export const subirNube = (articulos) =>{        
    console.log(articulos)
    let data =[...articulos]    
    let error=''
    data.forEach(item => {                //nombre documento  //datos del docuemnto
        DbFirestore.collection('boveda').doc(item.clave).set(item).catch(e => error=e)
    })
    if (!error)
       alert('Proceso correcto')
    else
        console.log('No se guardo correctamente los datos')
}


export const borrarNube= () => new Promise((resolve, reject) =>{  //codigo copiado desde la documentacion de firebase
    DbFirestore.collection('boveda').get()
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

