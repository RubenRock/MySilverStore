import {useState} from 'react'
import logo from './logo.svg';
import logo01 from './img/logo.png'
import './App.css';
import {Button} from '@material-ui/core';
import { AccessAlarm, ThreeDRotation, Menu } from '@material-ui/icons';
import NavBar from './components/navbar/demo'
import * as Conexion from './components/firebase/conexionFirestore'


function App() {
  const [productos, setProductos] = useState([])
  const [carga, setCarga] = useState(false)

  const leerProductos = async() => {
    console.log('pushado')
    let resul = await Conexion.descargarNube()
    console.log(resul)
    setProductos(resul)
    setCarga(true)
  }

  return (
    <div className="App">      
      <NavBar  />

      {/* PORTADA */}
      <div className="portada" >
          <img src={logo01} alt="logo01" style={{marginTop:20}}/>           
          <p>Publicidad - Ventas - Rifas</p>  
      </div>


      {/* PRODUCTOS */}
      {/* {Conexion.subirNube([{ titulo : 'Hola desde el titulo', descripcion : 'descripcion', clave : 'clave', fecha : 'fecha'}])}  */}
      <header className="App-header">  
        <b className="productos_titulo">PRODUCTOS</b>

        

        <Button variant="contained" color="primary" onClick={()=> leerProductos()}>
          Hola Mundo!
        </Button>
        <AccessAlarm/>
        <ThreeDRotation/> 
        <Menu/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
