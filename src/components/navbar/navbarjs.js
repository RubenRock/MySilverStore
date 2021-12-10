import {useState, useEffect} from 'react'
import './Navbar.css'
import bars from '../../img/bars.svg'
import close from '../../img/close.svg'
import {autentificacion} from '../firebase/configFirestore'
import {cerrarSesion} from '../firebase/conexionFirestore'
import Dialog from '../dialog'


const elementosUsuarioActivo = ['Participa', 'Mis mejores compras', 'Subastas', 'Cerrar sesion']
const elementosUsuarioInactivo = ['Participa', 'Mis mejores compras', 'Subastas', 'Iniciar sesion', 'Crear Cuenta']
const elementosUsuarioAdmin = ['Vista usuario','Administrar', 'Cerrar sesion']



const NavBar = (props) =>{
    const [clase, setClase] = useState('topnav')
    const [usuario, setUsuario] = useState(false) 
    const [openDialog, setOpenDialog] = useState(false)// abrir-cerrar ventana dialog
    const [datosModal, setDatosModal] = useState('')

    const accionesModal = (opcion) => {    
        toqueMenuHamburguesa() //cerramos menu hamburguesa
        
        if (opcion ==='Iniciar sesion') {
          setOpenDialog(!openDialog) 
          setDatosModal({titulo:'Iniciar sesion', cuerpo:'Escribe tu Email y tu contraseña para iniciar'})    
        }
    
        if (opcion ==='Cerrar sesion') {
          props.admin(false) //vista del administrador
          cerrarSesion()
        }    
    
        if (opcion ==='Crear Cuenta') {
          setOpenDialog(!openDialog)      
          setDatosModal({titulo:'Crea tu cuenta', cuerpo:'Escribe tu Email y tu contraseña para darte de alta '})    
        }
    
        if (opcion ==='Administrar') {
          props.admin(true) //vista del administrador
        }
    
        if (opcion ==='Vista usuario') {
          props.admin(false) //vista del administrador
        }
    
        if (opcion ==='Participa') {      
          console.log('ancla')
        }
    
      }  

    useEffect(() =>{
        autentificacion.onAuthStateChanged((user)=>{    
          setUsuario(user)      
      })
      },[])

    const toqueMenuHamburguesa = () => {
        clase ==='topnav'? setClase('topnav responsive') : setClase('topnav')    
    }

    const MenuItems = () =>{
        if (usuario) {
            if (usuario.email === 'specterruben@gmail.com' ){
                return(elementosUsuarioAdmin.map((text,index) => <p key={index} onClick={() =>accionesModal(text)}>{text}</p>))            
            }else{
                return(elementosUsuarioActivo.map((text,index) => <p key={index}  onClick={() =>accionesModal(text)}>{text}</p>))                
            }
        }else{
            return(elementosUsuarioInactivo.map((text,index) => <p key={index}  onClick={() =>accionesModal(text)}>{text}</p>))                
        }       
    }

    return(
        <div className={clase} id="myTopnav">
            <MenuItems/>           
            <img src={bars} alt="hambuerguesa" className="hamburguer" style={{height:30,width:30,margin:15}}
                onClick={() =>toqueMenuHamburguesa()}/> 
            <img src={close} alt="close" style={{height:30,width:30,margin:15}} className='close' 
                 onClick={() =>toqueMenuHamburguesa()}/>                  

            {openDialog ? 
                <Dialog accion={setOpenDialog} titulo={datosModal.titulo} cuerpo={datosModal.cuerpo}/>
            :   
                null
            }
        </div>
    )
}

export default NavBar;