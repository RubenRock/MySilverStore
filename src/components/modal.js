import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Button} from '@material-ui/core/';
import {crearUsuarioMail, iniciarUsuarioMail, iniciarGoogle, iniciarFacebook, subirNube, eliminarElemento} from './firebase/conexionFirestore'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    //alignItems: 'flex-start',
    marginTop:15,
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    //border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    alignItems:'center',
    justifySelf:'center',
    justifyContent:'center',
    
    
  },
}));

export default function SimpleModal({accion, titulo, cuerpo}) {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(true)
  const [mail,setMail] = React.useState({email:'', password:'', repassword:''})//Crear usuario con mail
  const [articulo, setArticulo] = React.useState(cuerpo)

  const handleModal = () => {
    accion(!openModal)
    setOpenModal(!openModal)
  }

  const handleArticulo = (dato) =>{  //modificar articulo          
    setArticulo({...articulo,...dato})        
  }  
  
  const handleEmail = (dato) =>{ //crear usuario o iniciar sesion con mail
    setMail({...mail,...dato})
  }  

  const handleGoogle = () =>{
    iniciarGoogle(handleModal)
  }

  const handleFacebook = () =>{
    iniciarFacebook(handleModal)
  }
 
  const body = (
    <div className={classes.paper}>

      <h2 >{titulo}</h2>

      { titulo ==='modificar' ?
            <>                  
            <input placeholder='titulo' value={articulo.titulo} id='titulo' type='text' className='modal_input' onChange={(text) => handleArticulo({titulo:text.target.value})}></input>
            <textarea placeholder='descripcion' value={articulo.descripcion} id='descripcion' type='text' className='modal_input' onChange={(text) => handleArticulo({descripcion:text.target.value})}></textarea>
            <input placeholder='precio' id='precio' value={articulo.precio} type='text' className='modal_input' onChange={(text) => handleArticulo({precio:text.target.value})}></input>
            <textarea placeholder='foto' id='foto' value={articulo.foto} type='text' className='modal_input' onChange={(text) => handleArticulo({foto:text.target.value})}></textarea>

            <div align='right' >
              <Button style={{background:'grey',color:'white',marginRight:10}}
              onClick={() => handleModal()} >Cerrar</Button>
                      
              <Button style={{background:'blue',color:'white'}} 
              onClick={() => {
                subirNube([articulo])
                handleModal()
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
              onClick={() => handleModal()} >No, cancelar</Button>
                      
              <Button style={{background:'blue',color:'white'}} 
              onClick={() => {
                eliminarElemento(articulo)
                handleModal()
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
              onClick={() => handleModal()} >Cerrar</Button>
                    
              <Button style={{background:'blue',color:'white'}} 
              onClick={() => iniciarUsuarioMail(mail.email, mail.password, handleModal)} >Aceptar</Button>
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
                onClick={() => handleModal()} >Cerrar</Button>
                       
                <Button style={{background:'blue',color:'white'}} 
                onClick={() => crearUsuarioMail(mail.email,mail.password, mail.repassword, handleModal)} >Aceptar</Button>
               </div>
            </>
            :null

      }       
    </div>
  );
 

  return (
    <div>         
      <Modal
        className={classes.modal}
        open={openModal}
        onClose={handleModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
        
      </Modal>  
    </div>
  );
}
