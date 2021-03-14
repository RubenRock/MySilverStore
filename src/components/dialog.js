import React,{useEffect} from 'react';
import Button from '@material-ui/core/Button';
import {Dialog, DialogTitle} from '@material-ui/core';
import {crearUsuarioMail, iniciarUsuarioMail, iniciarGoogle, iniciarFacebook, subirNube, eliminarElemento} from './firebase/conexionFirestore'


function SimpleDialog(props) {
  const { onClose, open, titulo, cuerpo, actualizarLista } = props; 
  const [mail,setMail] = React.useState({email:'', password:'', repassword:''})//Crear usuario con mail
  const [articulo, setArticulo] = React.useState(cuerpo) // recibe los datos del articulo para modificar/eliminar
  const [indexMiniatura, setIndexMiniatura] = React.useState(cuerpo.index) // manipula el indice de las miniaturas para poder cambiarlas 
  const [fullDialog, setFullDialog] = React.useState(false) //hacer mas grande el dialog

  const handleDialog = () =>{
    onClose(false)
  }

  const handleArticulo = (dato) =>{  //modificar articulo          
    setArticulo({...articulo,...dato})        
  }  

  const handlefotos = (fotos) =>{        
    setArticulo({...articulo,fotos:{...fotos}})
  }
  
  const handleEmail = (dato) =>{ //crear usuario o iniciar sesion con mail
    setMail({...mail,...dato})
  }  

  const handleGoogle = () =>{
    iniciarGoogle(handleDialog)
  }

  const handleFacebook = () =>{
    iniciarFacebook(handleDialog)
  }

  const siguienteMiniatura = () => {
    if (indexMiniatura + 1 < cuerpo.array.length )
      setIndexMiniatura(indexMiniatura+1)    
  }

  const anteriorMiniatura = () => {
    if (indexMiniatura + 1 > 1 )
      setIndexMiniatura(indexMiniatura-1)
  }

  useEffect(()=>{
    console.log(titulo)
     if(titulo === 'miniatura')
      setFullDialog(true) 
  },[])

  return (
    <Dialog onClose={() => onClose(false)} aria-labelledby="simple-dialog-title" open={open} maxWidth='xl' fullWidth={fullDialog}>
      
      {titulo !== 'miniatura' ?  // no quiero que diga miniatura el encabezado
        < DialogTitle id="simple-dialog-title"  >{titulo}</DialogTitle>                   
     : 
        null
      }
      

      <div className='dialog_ancho'>
      { titulo ==='modificar' ?
            <>                  
            <input placeholder='titulo' value={articulo.titulo} id='titulo' type='text' className='modal_input' onChange={(text) => handleArticulo({titulo:text.target.value})}></input>
            <textarea placeholder='descripcion' value={articulo.descripcion} id='descripcion' type='text' className='modal_input' onChange={(text) => handleArticulo({descripcion:text.target.value})}></textarea>
            <input placeholder='precio' id='precio' value={articulo.precio} type='text' className='modal_input' onChange={(text) => handleArticulo({precio:text.target.value})}></input>
            <textarea placeholder='foto' id='foto' value={articulo.foto} type='text' className='modal_input' onChange={(text) => handleArticulo({foto:text.target.value})}></textarea>

            <div align='right' >
              <Button style={{background:'grey',color:'white',marginRight:10}}
              onClick={() => handleDialog()} >Cerrar</Button>
                      
              <Button style={{background:'blue',color:'white'}} 
              onClick={() => {
                subirNube([articulo])
                actualizarLista('')
                handleDialog()                
                }
              } >Aceptar</Button>
              </div>
          </>
        :null        
      }

      { titulo ==='agregar fotos' ?
          <>                                               
            <textarea placeholder='Foto 1' value={articulo.fotos ? articulo.fotos.uno : null} type='text' className='modal_input' onChange={(text) => handlefotos({...articulo.fotos,uno:text.target.value})}></textarea>
            <textarea placeholder='Foto 2' value={articulo.fotos ? articulo.fotos.dos : null} type='text' className='modal_input' onChange={(text) => handlefotos({...articulo.fotos, dos:text.target.value})}></textarea>            
            <textarea placeholder='Foto 3' value={articulo.fotos ? articulo.fotos.tres : null} type='text' className='modal_input' onChange={(text) => handlefotos({...articulo.fotos, tres:text.target.value})}></textarea>            
            <textarea placeholder='Foto 4' value={articulo.fotos ? articulo.fotos.cuatro : null} type='text' className='modal_input' onChange={(text) => handlefotos({...articulo.fotos, cuatro:text.target.value})}></textarea>            
            <textarea placeholder='Foto 5' value={articulo.fotos ? articulo.fotos.cinco : null} type='text' className='modal_input' onChange={(text) => handlefotos({...articulo.fotos, cinco:text.target.value})}></textarea>            
            <textarea placeholder='Foto 6' value={articulo.fotos ? articulo.fotos.seis : null} type='text' className='modal_input' onChange={(text) => handlefotos({...articulo.fotos, seis:text.target.value})}></textarea>            
            <textarea placeholder='Foto 7' value={articulo.fotos ? articulo.fotos.siete : null} type='text' className='modal_input' onChange={(text) => handlefotos({...articulo.fotos, siete:text.target.value})}></textarea>            
            <textarea placeholder='Foto 8' value={articulo.fotos ? articulo.fotos.ocho : null} type='text' className='modal_input' onChange={(text) => handlefotos({...articulo.fotos, ocho:text.target.value})}></textarea>            
            <textarea placeholder='Foto 9' value={articulo.fotos ? articulo.fotos.nueve : null} type='text' className='modal_input' onChange={(text) => handlefotos({...articulo.fotos, nueve:text.target.value})}></textarea>            
            <textarea placeholder='Foto 10' value={articulo.fotos ? articulo.fotos.diez : null} type='text' className='modal_input' onChange={(text) => handlefotos({...articulo.fotos, diez:text.target.value})}></textarea>            
            
            <div align='right' >
              <Button style={{background:'grey',color:'white',marginRight:10}}
              onClick={() => handleDialog()} >Cerrar</Button>
                      
              <Button style={{background:'blue',color:'white'}} 
              onClick={() => {
                subirNube([articulo])
                actualizarLista('')
                handleDialog()                
                }
              } >Aceptar</Button>
            </div>
          </>
        :null        
      }

      { titulo ==='eliminar' ?
            <>                  

            <h3>¿Estas seguro de eliminar {articulo.titulo}?</h3>
            
            <div align='right' >
              <Button style={{background:'grey',color:'white',marginRight:10}}
              onClick={() => handleDialog()} >No, cancelar</Button>
                      
              <Button style={{background:'blue',color:'white'}} 
              onClick={() => {
                eliminarElemento(articulo)
                actualizarLista('')
                handleDialog()
                }
              } >Si joven</Button>
              </div>
          </>
        :null        
      }

      {titulo ==='Iniciar sesion' ?  
          <>
            <input placeholder='E-mail' id='email' type='mail' className='modal_input' onChange={(email) => handleEmail({email:email.target.value})}></input>
            <input placeholder='Password' id='password' type='password' className='modal_input' onChange={(password) =>handleEmail({password:password.target.value})}></input>

            <div align='right' >
              <Button style={{background:'grey',color:'white',marginRight:10}}
              onClick={() => handleDialog()} >Cerrar</Button>
                    
              <Button style={{background:'blue',color:'white'}} 
              onClick={() => iniciarUsuarioMail(mail.email, mail.password, handleDialog)} >Aceptar</Button>
              </div>

            <div style={{marginTop:30,marginBottom:15}}>
              <Button className="modal_boton" style={{background:'#005fcb',color:'white',marginRight:10}}
              onClick={() => handleGoogle()}>Google</Button>
            </div>
            <div>
              <Button className="modal_boton" style={{background:'#398bff',color:'white',marginRight:10}}
              onClick={() => handleFacebook()}>Facebook</Button>
            </div>
          </>
          :null
      }

      {titulo === 'Crea tu cuenta'?
            <>
              
              <input placeholder='E-mail' id='email' type='mail' className='modal_input' onChange={(email) => handleEmail({email:email.target.value})}></input>
              <input placeholder='Password' id='password' type='password' className='modal_input' onChange={(password) => handleEmail({password:password.target.value})}></input>
              <input placeholder='Repetir password' id='repassword' type='password' className='modal_input' onChange={(password) => handleEmail({repassword:password.target.value})}></input>

              <div align='right' >
                <Button style={{background:'grey',color:'white',marginRight:10}}
                onClick={() => handleDialog()} >Cerrar</Button>
                       
                <Button style={{background:'blue',color:'white'}} 
                onClick={() => crearUsuarioMail(mail.email,mail.password, mail.repassword, handleDialog)} >Aceptar</Button>
               </div>
            </>
            :null

      }     

      {titulo === 'miniatura'?
            <>                                     
                <div align='right'  >
                    <Button style={{color:'grey'}}
                    onClick={() => handleDialog()} >X</Button>
                </div>
               
                <div className='centrar'>                  
                   <p>{indexMiniatura + 1} de {cuerpo.array.length} </p>
                </div>

                <div className='fila centrar ' >                                      
                    <Button style={{color:'grey',height:'150px'}} onClick={() => anteriorMiniatura()} >-</Button>
                   
                    <img src={cuerpo.array[indexMiniatura]} className='producto_vistaMiniatura' alt="Imagen de la minuatura"/>

                    <Button style={{color:'grey',height:'150px'}} onClick={() => siguienteMiniatura()} >+</Button>                                        
                </div>
            </>
            :null
      }    
      </div>
    </Dialog>
  );
}



export default function SimpleDialogDemo({accion, titulo, cuerpo, actualizarLista}) {    

  return (
    <div>                  
      <SimpleDialog open={true} onClose={accion} titulo={titulo} cuerpo={cuerpo} actualizarLista={actualizarLista}/>
    </div>
  );
}
