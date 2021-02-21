import {useState} from 'react'
//import logo from './logo.svg';
import logo01 from './img/logo.png'
import './App.css';
import {Button} from '@material-ui/core';
import { AccessAlarm, ThreeDRotation, Menu } from '@material-ui/icons';
import NavBar from './components/navbar/navbar'
import * as Conexion from './components/listaProductos'
import {MostrarProductos} from './components/listaProductos'
import Administrador from './components/administrador'




function App() {
  const [productos, setProductos] = useState([])
  const [carga, setCarga] = useState(false)
  const [administrador, setAdministrador] = useState(false)

  const leerProductos = async() => {    
    let resul = await Conexion.leerProductos()    
    setProductos(resul)
    setCarga(true)    
  }

  return (
    <div className="App">      
      
     
      <NavBar  admin={setAdministrador}/> {/* NavBar Hace todas las operaciones de sus elementos */}

      { administrador ? 
        <Administrador />        
      : 
        <>
          {/*  PORTADA  */}
          
          <div className="portada" >
              <img src={logo01} alt="logo01" style={{marginTop:20}}/>           
              <p>Publicidad - Ventas - Rifas</p>  
          </div>


          {/*  PRODUCTOS  */}
          {/*  {Conexion.subirNube([{ titulo : 'Hola desde el titulo', descripcion : 'descripcion', clave : 'clave', fecha : 'fecha'}])}   */}
          
          <header className="App-header">  
              <b className="productos_titulo">PRODUCTOS</b>        

              <Button variant="contained" color="primary" onClick={()=> leerProductos()}>
                Hola Mundo!
              </Button>

              <div className="productos_lista">
                  {carga ?  productos.map((product,index) => <MostrarProductos data={product} key={index}/>)
                    : null
                  }
              </div>
              <AccessAlarm/>
              <ThreeDRotation/>        
              <Menu/>
          
          </header>
        </>
        
      }
      
       


    </div>
  );
}

export default App;
