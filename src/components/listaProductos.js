import * as Conexion from './firebase/conexionFirestore'

export const leerProductos = () =>  new Promise((resolve, reject) =>{     
    let resul = Conexion.descargarNube()
    resolve(resul)       
})

export const MostrarProductos = ({data}) =>{
   return(  <div className="productos_articulo" >
                <img src={data.foto} width="250px"/>
                <p>{data.titulo}</p>
                <p>{data.descripcion}</p>
                <p>{data.clave}</p>
                <p>{data.fecha}</p>
            </div>
   )
}