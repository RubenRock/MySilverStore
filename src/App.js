import {useState} from 'react'
import logo from './logo.svg';
import logo01 from './img/logo.png'
import './App.css';
import {Button} from '@material-ui/core';
import { AccessAlarm, ThreeDRotation, Menu } from '@material-ui/icons';
import NavBar from './components/navbar/demo'
import * as Conexion from './components/listaProductos'
import {MostrarProductos} from './components/listaProductos'



function App() {
  const [productos, setProductos] = useState([])
  const [carga, setCarga] = useState(false)

  const leerProductos = async() => {    
    let resul = await Conexion.leerProductos()    
    setProductos(resul)
    setCarga(true)
  }

  return (
    <div className="App">      
      
      {/* PORTADA */}
      <NavBar  />
      
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

        <div className="productos_lista">
            {carga ?  productos.map((product,index) => <MostrarProductos data={product} key={index}/>)
              : null
            }
        </div>
        <AccessAlarm/>
        <ThreeDRotation/> 
        <Menu/>
       {/*  <img src={logo} className="App-logo" alt="logo" />
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
        </a> */}
      </header>
    </div>
  );
}

export default App;
