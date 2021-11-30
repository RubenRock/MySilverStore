import React, { useEffect, useState } from 'react';
//import { SliderData } from './SliderData';//fotos estaticas
import {descargarCarrusel} from '../firebase/conexionFirestore'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

function ImageSlider ({ slides }) {
  const [current, setCurrent] = useState(0);  
  const [carrusel, setCarrusel] = useState()
  const [carga, setCarga] = useState(false)
  const [length, setLength] = useState(0)

  useEffect(() =>{
    descargaCarrusel()    
  },[])

  useEffect(() =>{    
    myTimer()
  },[length]) 

  // tiempo del carrusel automatico
  const  myTimer = () =>{ 
    if (length>0) {
      setInterval(() => {        
        setCurrent( x => x === length - 1 ? 0 : x + 1)        
       }, 5000);        
    }
    
  }
  
  const descargaCarrusel = async()=>{
    let resul = await descargarCarrusel()
    setCarrusel(resul)   
    setLength(resul.length)
    setCarga(true)
  }

  const nextSlide = () => {
    setCurrent(current => current === length - 1 ? 0 : current + 1);    
  };

  const prevSlide = () => {
    setCurrent(current => current === 0 ? length - 1 : current - 1);
  };  

  

  if (!Array.isArray(carrusel) || carrusel.length <= 0) {
    return null;
  }
  
 
  
  

  return (    
    <section className='slider'>      
    {carga ?
      <>
        <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
        <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
      </>
      :null
    }
      
      {carga ? carrusel.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (              
                <img src={slide.direccion} alt={slide.nombre} className='image' />
              
            )}
          </div>
        );
      })
        :null
      }
   
    </section>
  );
};

export default ImageSlider;