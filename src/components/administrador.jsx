import {useState} from 'react'
import {Button} from '@material-ui/core/';
import {subirNube} from './firebase/conexionFirestore'
import add from '../img/add.svg'
import {descargarNube} from './firebase/conexionFirestore'
import MiModal from './modal'
import { v1 as uuidv1} from 'uuid' //generador de id

function Administrador() {
    const [articulo, setArticulo] = useState({clave:uuidv1(), titulo:'', descripcion:'',precio:'', foto:''})
    const [accion, setAccion] = useState('menu')
    const [openModal, setOpenModal] = useState(false) 
    const [actualizarProducto, setActualizarProducto] = useState({titulo:'',data:''})

    const [productos, setProductos] = useState([])//lista de productos
    const [carga, setCarga] = useState(false)
   

    const descargarProductos = async() => {  //muestra el listado de productos  
        let resul = await descargarNube()    
        setProductos(resul)
        setCarga(true)    
      }

    const handleArticulo = (dato) =>{        
        //let union = Object.assign(articulo,dato)// = {...articulo,...dato}             
        setArticulo({...articulo,...dato})        
    }        

    const agregarArticulo = () => {
        subirNube([articulo])
        handleArticulo({clave:uuidv1(), titulo:'', descripcion:'',precio:'', foto:''}) //limpiar pantalla
    }

    const handleModal = (data,titulo) =>{        
        setActualizarProducto({data:data,titulo:titulo})
        setOpenModal(!openModal)
    }

    const vistaMenu = (
        <div className='administrador_vistamenu'>
            <p > Acciones</p>
            
            <Button style={{background:'#5f27cd',color:'white',width:280, marginBottom:25}}
            onClick={() => setAccion('agregar')}>Agregar</Button>        

            <Button style={{background:'#ff9f43',color:'white',width:280, marginBottom:25}}
            onClick={() => {
                descargarProductos()
                setAccion('modificar')}                
                }>modificar</Button>

            <Button style={{background:'#ee5253',color:'white',width:280}}
             onClick={() => {
                descargarProductos()
                setAccion('eliminar')}                
                }>Eliminar</Button>            
             
        </div>
    )
                
    const vistaAgregar = (
        <div className='administrador_vistaagregar'>  
            <img src={add} alt="add" style={{marginTop:100}} className='administrador_img '/>           
            <div className='administrador_vistamenu administrador_tamañoMenu'>
                <p style={{fontSize:30}}> Pon la descripción necesaria</p>
                <div className='administrador_separacion'>
                    <input placeholder='Clave del artículo' id='clave' disabled className='administrador_input' value={articulo.clave} ></input>
                    <input placeholder='Título del artículo' id='titulo'  className='administrador_input' value={articulo.titulo} onChange={(text) => handleArticulo({titulo:text.target.value})} ></input>
                    <input placeholder='Descripción del artículo' id='descripcion'  className='administrador_input'  onChange={(text) => handleArticulo({descripcion:text.target.value})} value={articulo.descripcion}></input>
                    <input placeholder='Precio del artículo' id='precio'  className='administrador_input' value={articulo.precio} onChange={(text) => handleArticulo({precio:text.target.value})}></input>
                    <input placeholder='Foto del artículo' id='Foto'  className='administrador_input' value={articulo.foto} onChange={(text) => handleArticulo({foto:text.target.value})}></input>
                </div>            

                <div >
                    <Button style={{background:'grey',color:'white',marginRight:10}}
                    onClick={() => setAccion('menu')}>Menu</Button>
                        
                    <Button style={{background:'blue',color:'white'}} 
                    onClick= {() => agregarArticulo()}>Aceptar</Button>
                </div>
            </div>
        </div>
    )

    const MostrarProductos = ({data, accion}) =>{  //lista de productos en modificar y eliminar  
        return(  
                <div className='administrador_vistaModificar ' onClick={() => handleModal(data, accion)}>
                    <div className='administrador_contenedor_foto  '>
                        <img src={data.foto} alt="Imagen de producto" className='adminstrador_fotos_modificar' />
                    </div>
                    
                    <div className='administrador_detalles'>
                        <p className='administrador_nombre'>{data.titulo}</p> 
                        <p className='administrador_descripcion'>{data.descripcion}</p>
                        <p className='administrador_descripcion'>{data.clave}</p>
                        <p className='administrador_descripcion'>{data.precio}</p>                                             
                    </div>  
                </div>                 
        )
     }

    const vistaModificar = (
        <div className="administrador_lista">                          
             {carga ?  productos.map((product,index) => <MostrarProductos data={product} accion='modificar' key={index}/>)
                    : null
                  }           
        </div>
    )

    const vistaEliminar = (
        <div className="administrador_lista">                          
             {carga ?  productos.map((product,index) => <MostrarProductos data={product} accion='eliminar' key={index}/>)
                    : null
                  }           
        </div>
    )

    const seleccion = () => {
        switch (accion){
            case 'agregar':return(vistaAgregar)

            case 'modificar': return (vistaModificar)

            case 'eliminar': return (vistaEliminar)

            default: return(vistaMenu)
        }

    }

    return(
        <div className="portada" >  
             {openModal ?  //modal modificar/eliminar articulos
                <MiModal accion={setOpenModal} titulo={actualizarProducto.titulo} cuerpo={actualizarProducto.data}/>
            :   
                null
            }
            
             {seleccion(accion)}           
            
        </div>
    )
}

export default Administrador