import * as Conexion from './firebase/conexionFirestore'

export const leerProductos = () =>  new Promise((resolve, reject) =>{     
    let resul = Conexion.descargarNube()
    resolve(resul)       
})

export const MostrarProductos = ({data}) =>{
   return(  <div >
                <b>{data.titulo}</b>
                <b>{data.descripcion}</b>
                <p>{data.clave}</p>
                <p>{data.fecha}</p>
            </div>
   )
}