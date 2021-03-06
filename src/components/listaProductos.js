import * as Conexion from './firebase/conexionFirestore'
import {Button} from '@material-ui/core/';

export const leerProductos = () =>  new Promise((resolve, reject) =>{     
    let resul = Conexion.descargarNube()
    resolve(resul)       
})

export const MostrarProductos = ({data, seleccion}) =>{    
   return(  <>          
            <div className="productos_articulo" onClick={() => seleccion(data)} >                
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

export const ProductoSeleccionado = (({data, seleccion}) =>{
    const datoFotos = (fotos) => {
         console.log([fotos])
        
    }

    return(
        <>           
            <img src={data.foto} alt="Imagen de producto"/>
            <h1>Producto seleccionado {data.titulo}</h1>

            {data.fotos ? 
                datoFotos(data.fotos)              
            :
                null
            }

            <Button style={{background:'#5f27cd',color:'white',width:280, marginBottom:25}}
            onClick={() => seleccion('menu')}>Menu</Button>
        </>

    )
})