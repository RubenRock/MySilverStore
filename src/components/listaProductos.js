import React from 'react'
import * as Conexion from './firebase/conexionFirestore'
import {Button} from '@material-ui/core/'
import Dialog from './dialog'

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

    const [openDialog, setOpenDialog] = React.useState(false)// abrir-cerrar ventana dialog
    const [dataDialog, setDataDialog] = React.useState({array:'', index:'', titulo:''}) // datos de la minuatura para mostrar en el Dialog

    const miniatura = (img, index) =>{   
        setDataDialog({array:img, index:index, titulo:'miniatura'})
        setOpenDialog(true)
    }

    const comprar = (item) =>{
        console.log(item)
        setDataDialog({titulo:'compra', data:item})
        setOpenDialog(true)
    }

    
    const datoFotos = (fotos) => {
        
        let array = [fotos.uno, fotos.dos, fotos.tres, fotos.cuatro, fotos.cinco, fotos.seis, fotos.siete, fotos.ocho, fotos.nueve, fotos.diez ]
        let arrayfotos =[]
        array.map(x =>  x? arrayfotos.push(x) : null)  //filtro los datos para quitar los vacios
        

        return (
                <>
                    <p>{arrayfotos.length} fotos</p>

                    <div className='productos_contenedorMiniatura'>
                        {arrayfotos.map((img,index) => <img src={img} className='producto_miniaturaFoto' key={img} alt="Imagen de producto" onClick={() => miniatura(arrayfotos,index)}/>)}                    
                    </div>
                    
                </>
                )
        
    }

    return(
        <div className='columna' style={{marginTop:90}}>           

            {openDialog ? 
                <Dialog accion={setOpenDialog} titulo={dataDialog.titulo} cuerpo={dataDialog}/>
            :   
                null
            }                    

            <div className='fila_wrap'>    
                <div className='columna'>
                    <img src={data.foto} alt="Imagen de producto"/>
                    {data.fotos ? 
                        datoFotos(data.fotos)              
                    :
                        null
                    }
                </div>

                <div>
                    <h1>{data.titulo}</h1>
                    <p>{data.descripcion}</p>
                    <p>{data.precio}</p> 
                    <div style={{marginTop:10, marginBottom:25}}>
                        <Button style={{background:'#ee5253',color:'white',width:280}} onClick={() => comprar(data)}> Comprar </Button>
                    </div>                   
                </div>    
            </div>
            
        </div>

    )
})