import {useState} from 'react'
import {Button} from '@material-ui/core/';
import {subirNube, descargarNube, subirCarrusel, descargarCarrusel,eliminarCarrusel} from './firebase/conexionFirestore'
import add from '../img/add.svg' 
import carrusel_svg from '../img/add_carrusel.svg'
import { v1 as uuidv1} from 'uuid' //generador de id
import SearchIcon from '@material-ui/icons/Search';
import Dialog from './dialog'

function Administrador() {
    const [articulo, setArticulo] = useState({clave:uuidv1(), titulo:'', descripcion:'',precio:'', foto:'',fotos:{}})
    const [accion, setAccion] = useState('menu')    
    const [openDialog, setOpenDialog] = useState(false)
    const [actualizarProducto, setActualizarProducto] = useState({titulo:'',data:''})//datos para mandar al modal para modificar o elimnar
    const [carrusel, SetCarrusel] = useState({direccion:'', nombre:''}) //datos del banner
    const [listaCarrusel, setListaCarrusel] = useState([]) // carrusel descargado de la nube   
    const [productos, setProductos] = useState([])//lista de productos original
    const [productosFiltrados, setProductosFiltrados] = useState([])//lista de productos para filtrar y mostrar en pantalla
    const [carga, setCarga] = useState(false)
   

    const filtrarProductos = (text) =>{
        setProductosFiltrados(productos.filter((x)=> String(x.titulo).includes(text)))
    }
    
    const descargarProductos = async() => {  //muestra el listado de productos  
        let resul = await descargarNube()    
        setProductos(resul)
        setProductosFiltrados(resul)
        setCarga(true)            
      }

    const descargaCarrusel = async() =>{
        let resul = await descargarCarrusel()       
        setListaCarrusel(resul)
        setCarga(true)          
    }

    const agregarCarrusel = () =>{ //agregamos una foto al carrusel              
        subirCarrusel(carrusel)
        SetCarrusel({direccion:'', nombre:''})
        setCarga(false)  //actualizar la lista de banners
        descargaCarrusel()
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
        /* setOpenModal(!openModal) */
        setOpenDialog(true)

    }

    function AccionesArticulos() {
        return (
        <>
            <p >Articulos</p>
            
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
             
        </>
        )
      }
      

      function AccionesCarrusel() {
        return (
        <>
            <p style={{marginTop:50}}> Carrusel de fotos</p>                            

            <Button style={{background:'#ff9f43',color:'white',width:280, marginBottom:25}}
            onClick={() => {
                descargaCarrusel()
                setAccion('carrusel')}                
                }>Actualizar</Button>
        </>
        )
      }

    const vistaMenu = (
        <div className='administrador_vistamenu'>
            <AccionesArticulos/>
            <AccionesCarrusel/>
        </div>
    )
                
    const vistaAgregar = (
        <div className='administrador_vistaagregar'>  
            <img src={add} alt="add" style={{marginTop:100}} className='administrador_img '/>           
            <div className='administrador_vistamenu administrador_tamañoMenu'>
                <p style={{fontSize:30}}> Pon la descripción necesaria</p>
                <div className='administrador_separacion'>
                    <input placeholder='Clave del artículo' id='clave' disabled className='administrador_input' value={articulo.clave} ></input>
                    <input placeholder='Título del artículo' id='titulo'  className='administrador_input' value={articulo.titulo} autoComplete="off" onChange={(text) => handleArticulo({titulo:text.target.value})} ></input>
                    <textarea placeholder='Descripción del artículo' id='descripcion'  className='administrador_input'  onChange={(text) => handleArticulo({descripcion:text.target.value})} value={articulo.descripcion}></textarea>
                    <input placeholder='Precio del artículo' id='precio'  className='administrador_input' value={articulo.precio} autoComplete="off" onChange={(text) => handleArticulo({precio:text.target.value})}></input>
                    <textarea placeholder='Foto del artículo' id='Foto'  className='administrador_input' value={articulo.foto} onChange={(text) => handleArticulo({foto:text.target.value})}></textarea>
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
        let vista =''
        accion ==='modificar'?
            vista='administrador_vistaModificar'
        :
            vista='administrador_vistaEliminar'
        
        return(  
            
                <div className={vista} onClick={() => handleModal(data, accion)}>
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
        <div>            
            <div style={{display:'flex', justifyContent:'flex-end',alignItems:'flex-end',height:120}}>         
                    <SearchIcon fontSize="large" />
                    <input type='search' className='administrador_inputBuscar'  onChange={(text) => filtrarProductos(text.target.value)}></input>                    
                    <Button style={{background:'#282c34',color:'white', marginRight:30}}
                    onClick={() => setAccion('menu')}>Menu</Button>         
            </div>

            <div className="administrador_lista">                          
                
                {carga ?  productosFiltrados.map((item,index) => 
                            <div className='administrador_orange'>
                                <MostrarProductos data={item} accion='modificar' key={index}/>
                                <p className='administrador_agregarFoto' onClick={()=>  handleModal(item, 'agregar fotos')}>+ Fotos</p>                                
                            </div>
                        )
                        : null
                    }           
            </div>
        </div>
    )

    const vistaEliminar = (
        <div>
             <div style={{display:'flex', justifyContent:'flex-end',alignItems:'flex-end',height:120}}>         
                <SearchIcon fontSize="large" />
                <input type='search' className='administrador_inputBuscar'  onChange={(text) => filtrarProductos(text.target.value)}></input>                    
                <Button style={{background:'#282c34',color:'white', marginRight:30}}
                onClick={() => setAccion('menu')}>Menu</Button>         
            </div>
            <div className="administrador_lista">                          
                {carga ?  productosFiltrados.map((product,index) => <MostrarProductos data={product} accion='eliminar' key={index}/>)
                        : null
                    }           
            </div>
        </div>
    )

    const vistaCarrusel = (
        <div className='administrador_vistaagregar'>  
            <img src={carrusel_svg} alt="add" style={{marginTop:100}} className='administrador_img '/>           
            <div className='administrador_vistamenu administrador_tamañoMenu'>
                <p style={{fontSize:30}}> Agregar foto al carrusel</p>
                <div className='administrador_separacion'>                                    
                    <textarea placeholder='Direcion del banner' id='direccion_banner'  className='administrador_input'  onChange={(text) => SetCarrusel({...carrusel,direccion:text.target.value})} value={carrusel.direccion}>  </textarea>
                    <input placeholder='Nombre del banner' id='nombre_banner'  className='administrador_input' onChange={(text) => SetCarrusel({...carrusel,nombre:text.target.value})} value={carrusel.nombre} />    
                </div>            

                <div >
                    <Button style={{background:'grey',color:'white',marginRight:10}}
                    onClick={() => setAccion('menu')}>Menu</Button>
                        
                    <Button style={{background:'blue',color:'white'}} 
                    onClick= {() => agregarCarrusel()}>Aceptar</Button>
                </div>
            </div>

            <div className="administrador_lista fila">                          
                <p style={{fontSize:50}}>Lista de fotos del carrusel</p>
                <div>
                    {carga ?  listaCarrusel.map((data) => 
                                                <div className='administrador_listaCarrusel' key={data.nombre}>
                                                    <img src={data.direccion} alt={data.nombre} />
                                                    <div className='fila centrar'>
                                                        <p style={{fontSize:30}}>{data.nombre}</p>
                                                        <Button style={{background:'#ee5253',color:'white',width:280}}
                                                                onClick={async() => {
                                                                                    await eliminarCarrusel(data.nombre)                                                                                                
                                                                                    descargaCarrusel()
                                                                                }
                                                                    }>Eliminar
                                                        </Button>                                                             
                                                    </div>
                                                </div>)
                            : null
                        }           
                </div>
            </div>

            
        </div>
    )

    const seleccion = () => {
        switch (accion){
            case 'agregar':return(vistaAgregar)

            case 'modificar': return (vistaModificar)

            case 'eliminar': return (vistaEliminar)

            case 'carrusel': return(vistaCarrusel)

            default: return(vistaMenu)
        }

    }

    return(
        <div className="administrador_portada" >              
            { openDialog ? <Dialog 
                                accion={setOpenDialog}  // abre y cierra el dialog
                                actualizarLista={descargarProductos} //despues de modificar/eliminar se debe actualizar la lista
                                titulo={actualizarProducto.titulo} // titulo que se vera en el modal
                                cuerpo={actualizarProducto.data} //contenido del modal
                            /> 
                : 
                    null
            }
            
                
            {seleccion(accion)}  {/* lo que vemos en pantalla */}         
            
        </div>
    )
}

export default Administrador