import React, { useEffect, useState } from 'react';
import { SliderData } from './SliderData';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

function ImageSlider ({ slides }) {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(0); //carrusel automatico
  const length = slides.length;

 // carrusel automatico
  useEffect(()=>{            
      myTimer()
  },[next])

  // tiempo del carrusel automatico
  function myTimer() {  
    setTimeout(() => {  
      setCurrent( current => current === length - 1 ? 0 : current + 1); 
      setNext(next  > 10 ? 0 : next+1) // bandera de cambio de imagen, cuando sea mayor a 10 regresa a 0 para que no haga numeros grandes
  }, 5000);  
  } 

  const nextSlide = () => {
    setCurrent(current => current === length - 1 ? 0 : current + 1);    
  };

  const prevSlide = () => {
    setCurrent(current => current === length - 1 ? 0 : current - 1);
  };  

  

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }
  
 
  
  

  return (
    <section className='slider'>
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (              
                <img src={slide.image} alt='travel image' className='image' />
              
            )}
          </div>
        );
      })}
   
    </section>
  );
};

export default ImageSlider;