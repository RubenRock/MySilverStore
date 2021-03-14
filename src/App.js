import {useState, useEffect} from 'react'
//import logo from './logo.svg';
import logo01 from './img/logo.png'
import './App.css';
import NavBar from './components/navbar/navbar'
import * as Conexion from './components/listaProductos'
import {MostrarProductos, ProductoSeleccionado} from './components/listaProductos'
import Administrador from './components/administrador'




function App() {
  const [productos, setProductos] = useState([])
  const [carga, setCarga] = useState(false)
  const [administrador, setAdministrador] = useState(false)
  const [seleccion, setSeleccion] = useState('menu') //indica si se ha seleccionado algun producto


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
      <NavBar  admin={setAdministrador} seleccion={setSeleccion}/> {/* NavBar Hace todas las operaciones de sus elementos */}

      { administrador ? 
        <Administrador />        
      : 
        seleccion === 'menu' ?
        <>
            {/*  PORTADA  */}          
            <div className="portada" >
                <img src={logo01} alt="logo01" style={{marginTop:20}}/>           
                <p>Publicidad - Ventas - Rifas</p>  
            </div>

            {/*  PRODUCTOS  */}                  
            <header className="App-header">  
                <b className="productos_titulo">PRODUCTOS</b>                      
                <div className="productos_lista">
                    {carga ?  productos.map((product,index) => <MostrarProductos data={product} key={index} seleccion={setSeleccion}/>)
                      : null
                    }
                </div>                        
            </header>
        </>        
        :
        <>
            {/*  PRODUCTO SELECCIONADO  */} 
          <header className="App-header">  
                <ProductoSeleccionado data={seleccion} seleccion={setSeleccion} />
          </header>
        </>
      }
    </div>
  );
}

export default App;
