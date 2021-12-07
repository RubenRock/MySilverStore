import {useState, useEffect} from 'react'
import './Navbar.css'
import bars from '../../img/bars.svg'
import close from '../../img/close.svg'
import {autentificacion} from '../firebase/configFirestore'


const elementosUsuarioActivo = ['Participa', 'Mis mejores compras', 'Subastas', 'Cerrar sesion']
const elementosUsuarioInactivo = ['Participa', 'Mis mejores compras', 'Subastas', 'Iniciar sesion', 'Crear Cuenta']
const elementosUsuarioAdmin = ['Vista usuario','Administrar', 'Cerrar sesion']



const NavBar = () =>{
    const [clase, setClase] = useState('topnav')
    const [usuario, setUsuario] = useState(false)

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
                return(elementosUsuarioAdmin.map((text) => <p>{text}</p>))            
            }else{
                return(elementosUsuarioActivo.map((text) => <p>{text}</p>))                
            }
        }else{
            return(elementosUsuarioInactivo.map((text) => <p>{text}</p>))                
        }       
    }

    return(
        <div className={clase} id="myTopnav">
            <MenuItems/>           
            <img src={bars} alt="hambuerguesa" className="hamburguer" style={{height:30,width:30,margin:15}}
                onClick={(e) =>toqueMenuHamburguesa(e)}/> 
            <img src={close} alt="close" style={{height:30,width:30,margin:15}} className='close' 
                 onClick={(e) =>toqueMenuHamburguesa(e)}/>                  
        </div>
    )
}

export default NavBar;