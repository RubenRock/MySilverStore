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

    return(
        <div className={clase} id="myTopnav">
            <p >Home</p>
            <p >News</p>            
            <p >Contact</p>
            <p >About</p>            
            <img src={bars} alt="hambuerguesa" className="hamburguer" style={{height:30,width:30,margin:15}}
                onClick={(e) =>toqueMenuHamburguesa(e)}/> 
            <img src={close} alt="close" style={{height:30,width:30,margin:15}} className='close' 
                 onClick={(e) =>toqueMenuHamburguesa(e)}/>                  
        </div>
    )
}

export default NavBar;