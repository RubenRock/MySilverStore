import {useState} from 'react'
import {Button} from '@material-ui/core/';
import {subirNube} from './firebase/conexionFirestore'
import add from '../img/add.svg'
import {descargarNube} from './firebase/conexionFirestore'

function Administrador() {
    const[articulo, setArticulo] = useState({titulo:'', descripcion:'',precio:'', foto:''})
    const[accion, setAccion] = useState('menu')

    const [productos, setProductos] = useState([])//lista de productos
    const [carga, setCarga] = useState(false)

    const descargarProductos = async() => {    
        let resul = await descargarNube()    
        setProductos(resul)
        setCarga(true)    
      }

    const handleTitulo = (titulo) =>{
        setArticulo({titulo:titulo.target.value, descripcion:articulo.descripcion, precio:articulo.precio, foto:articulo.foto})
    }

    const handleDescripcion = (desc) =>{
        setArticulo({titulo:articulo.titulo, descripcion:desc.target.value, precio:articulo.precio, foto:articulo.foto})
    }

    const handlePrecio = (precio) =>{
        setArticulo({titulo:articulo.titulo,descripcion:articulo.descripcion, precio:precio.target.value, foto:articulo.foto})
    }

    const handleFoto = (foto) =>{
        setArticulo({titulo:articulo.titulo,descripcion:articulo.descripcion, precio:articulo.precio, foto:foto.target.value})
    }

    const agregarArticulo = () => {
        subirNube([articulo])
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
            >Eliminar</Button>            
             
        </div>
    )

    const vistaAgregar = (
        <div className='administrador_vistaagregar'>  
            <img src={add} alt="add" style={{marginTop:100}} className='administrador_img '/>           
            <div className='administrador_vistamenu administrador_tamañoMenu'>
                <p style={{fontSize:30}}> Pon la descripción necesaria</p>
                <div className='administrador_separacion'>
                    <input placeholder='Título del artículo' id='titulo'  className='administrador_input' onChange={(titulo) =>handleTitulo(titulo)} ></input>
                    <input placeholder='Descripción del artículo' id='Descripcion'  className='administrador_input' onChange={(desc) =>handleDescripcion(desc)}></input>
                    <input placeholder='Precio del artículo' id='precio'  className='administrador_input' onChange={(precio) =>handlePrecio(precio)}></input>
                    <input placeholder='Foto del artículo' id='Foto'  className='administrador_input' onChange={(foto) =>handleFoto(foto)}></input>
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

    const MostrarProductos = ({data}) =>{    
        return(  <>                           
                    <div className='administrador_vistaModificar '>
                        <div className='administrador_contenedor_foto  '>
                            <img src={data.foto} alt="Imagen de producto" className='adminstrador_fotos_modificar' />
                        </div>
                       
                        <div className='administrador_detalles'>
                            <p className='administrador_nombre'>{data.titulo}</p> 
                            <p className='administrador_descripcion'>{data.descripcion}</p>
                            <p className='administrador_descripcion'>{data.clave}</p>
                            <p className='administrador_descripcion'>{data.precio}</p>                 
                            <Button style={{background:'#ff9f43',color:'white',width:200,}}
                            onClick={() => console.log('hola')}>modificar</Button>
                        </div>                           
                        
                    </div>
                 </>
        )
     }

    const vistaModificar = (
        <div className="administrador_lista">                          
             {carga ?  productos.map((product,index) => <MostrarProductos data={product} key={index}/>)
                    : console.log('nada', carga) 
                  }           
        </div>
    )

    const seleccion = () => {
        switch (accion){
            case 'agregar':return(vistaAgregar)

            case 'modificar': return (vistaModificar)

            default: return(vistaMenu)
        }

    }

    return(
        <div className="portada" >  
            
             {seleccion(accion)}           
            
        </div>
    )
}

export default Administrador