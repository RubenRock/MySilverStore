import * as Conexion from './firebase/conexionFirestore'

export const leerProductos = () =>  new Promise((resolve, reject) =>{     
    let resul = Conexion.descargarNube()
    resolve(resul)       
})

export const MostrarProductos = ({data}) =>{    
   return(  <>          
            <div className="productos_articulo" >                
            <div className="productos_bordesuperior"></div>
                <div className="productos_contenido">
                    <img src={data.foto} width="250px" alt="Imagen de producto"/>
                    <p className='producto_nombre'>{data.titulo}</p> <hr></hr>
                    <p className='producto_descripcion'>{data.descripcion}</p>
                    <p className='producto_descripcion'>{data.clave}</p>
                    <p className='producto_descripcion'>{data.precio}</p>
                </div>
            </div>
            </>
   )
}