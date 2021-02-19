import {DbFirestore, autentificacion, providerGoogle, providerFacebbok} from './configFirestore'



 /* const data ={
    titulo:'orale',
    uno:'primero',
    dos:'segundo',
    estado:'false'
}  */

//DbFirestore.collection('ejemplo').add(data)
//DbFirestore.collection('ejemplo').doc(data.titulo).set(data)

//DbFirestore.collection('ejemplo').get()
//.then(item=> item.forEach(x => console.log(x.data())))


//DbFirestore.collection('ejemplo').doc('z9zmivG81h8Nk832IViD').delete().then(()=> console.log('hecho'))


/* autentificacion.onAuthStateChanged((user)=>{
    if (user){
        console.log('hay usuario')
        console.log(user)
    }else{
        console.log('no hay usuario')
        console.log(user)
    }
    usuario =user
})
 */

export const crearUsuarioMail = (email,password) => {    
     console.log(email,'   ',password)
     autentificacion.createUserWithEmailAndPassword(email,password)
    .then(user => {console.log(user.user)})
  } 

export const iniciarUsuarioMail = (email,password) => {    
    console.log(email,'   ',password)
    autentificacion.signInWithEmailAndPassword(email,password)
   .then(user => {console.log(user.user)})
 } 

export const cerrarSesion = () => {
    autentificacion.signOut().then(() => {
        console.log("sesion terminada")
    })
}

export const iniciarGoogle = () => {
    autentificacion.signInWithPopup(providerGoogle)
    .then((result)=>{
        console.log('inicio con google exitoso')        
    })
    .catch((error) => console.log(error) )
}

export const iniciarFacebook = () => {
    autentificacion.signInWithPopup(providerFacebbok)
    .then((result)=>{
        console.log('inicio con facebook exitoso')        
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

export const subirNube = (titulos) =>{        
    console.log(titulos)
    let data =[...titulos]    
    let error=''
    data.forEach(item => {                //nombre documento  //datos del docuemnto
        DbFirestore.collection('boveda').doc(item.titulo).set(item).catch(e => error=e)
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

