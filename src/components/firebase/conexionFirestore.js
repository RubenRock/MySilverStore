import {DbFirestore} from './configFirestore'

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

