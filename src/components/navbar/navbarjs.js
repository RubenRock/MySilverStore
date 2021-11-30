import {useState} from 'react'
import './Navbar.css'
import bars from '../../img/bars.svg'

const NavBar = () =>{
    const [clase, setClase] = useState('topnav')

    const toqueMenuHamburguesa = () => {
        clase ==='topnav'? setClase('topnav responsive') : setClase('topnav')
    
    }

    return(
        <div className={clase} id="myTopnav">
            <p >Home</p>
            <p >News</p>            
            <p >Contact</p>
            <p >About</p>            
            <img src={bars} alt="hambuerguesa" className="icon" style={{height:30,width:30,margin:15}}
                onClick={(e) =>toqueMenuHamburguesa(e)}/>           
            
        </div>
    )
}

export default NavBar;