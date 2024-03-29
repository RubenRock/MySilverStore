import {useState, useEffect} from 'react'
import logo01 from './img/logo.png'
import './App.css';
//import NavBar from './components/navbar/navbar'
import NavBar from './components/navbar/navbarjs'
import * as Conexion from './components/listaProductos'
import {MostrarProductos, ProductoSeleccionado} from './components/listaProductos'
import Administrador from './components/administrador'
import {Link, BrowserRouter, Route, Routes} from 'react-router-dom'

//import ImageSlider from './components/carrusel/ImageSlider'
//import { SliderData } from './components/carrusel/SliderData';

function App() {
  const [productos, setProductos] = useState([])
  const [carga, setCarga] = useState(false)
  const [administrador, setAdministrador] = useState(false)
  const [seleccion, setSeleccion] = useState('menu') //indica si se ha seleccionado algun producto

  const Portada = () => {
    return(
      <>
        <div className="portada" id='top'>                 
              {/* <ImageSlider slides={SliderData}  />                */}
                          
            <div className='fila_wrap centrar'> 
              <img src={logo01} alt="logo01" style={{marginTop:20}}/>           
              <p>Publicidad - Ventas - Rifas</p> 
            </div>
        </div>

        {/*  PRODUCTOS  */}                  
        <header className="App-header" id='productos'>  
            <b className="productos_titulo">PRODUCTOS</b>                      
            <Link to='/productos'>
              <div className="productos_lista">
                  {carga ?  productos.map((product,index) => <MostrarProductos data={product} key={index} seleccion={setSeleccion}/>)
                    : null
                  }
              </div>                        
            </Link>
        </header>

        <footer className='footer'>
          <div >
            <p>Las Margaritas, Chiapas c.p. 30187    ©2022</p>                  
            <p>para mayor informacion comunicate a los telefonos: 963xxxxxxx y 963xxxxxxx </p>
          </div>              
          <div >
            <img src={logo01} alt="logo01" style={{marginTop:20}}/>              
          </div>
          
        </footer>
    </> 
    )
  }


  const leerProductos = async() => {    
    let resul = await Conexion.leerProductos()    
    setProductos(resul)
    setCarga(true)    
  }

  useEffect(()=>{
    leerProductos()
  },[])

  return (
    <div className="App">         
      <BrowserRouter>
        <NavBar  admin={setAdministrador} seleccion={setSeleccion} /> {/* NavBar Hace todas las operaciones de sus elementos */}        
        <Routes>
          <Route path='/' element={<Portada />}/>
          <Route path='/productos' element={<ProductoSeleccionado data={seleccion} seleccion={setSeleccion} />} />
          <Route path='/administrador' element={ <Administrador /> } />
        </Routes>   
      </BrowserRouter>
    </div>
  );
}

export default App;
