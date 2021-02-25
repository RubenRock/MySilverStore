import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Button} from '@material-ui/core/';
import {crearUsuarioMail, iniciarUsuarioMail, iniciarGoogle, iniciarFacebook} from './firebase/conexionFirestore'

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
  const [mail,setMail] = React.useState({email:'', password:'', repassword:''})

  const handleModal = () => {
    accion(!openModal)
    setOpenModal(!openModal)
  }

  const handleEmail = (email) =>{    
    setMail({email:email.target.value,paswword:mail.password, repassword:mail.repassword})
  }
  
  const handlePassword = (password) =>{    
    setMail({email:mail.email, password:password.target.value, repassword:mail.repassword})
  }

  const handleRepassword = (password) =>{    
    setMail({email:mail.email, password:mail.password, repassword:password.target.value})
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
      <p >{cuerpo.descripcion}</p>
      { titulo ==='modificar' ?
            <>
                  
            <input placeholder='titulo' value={cuerpo.titulo} id='titulo' type='text' className='modal_input' onChange={(email) =>handleEmail(email)}></input>
            <input placeholder='descripcion' value={cuerpo.descripcion} id='descripcion' type='text' className='modal_input' onChange={(password) =>handlePassword(password)}></input>
            <input placeholder='precio' id='precio' value={cuerpo.precio} type='text' className='modal_input' onChange={(password) =>handleRepassword(password)}></input>
            <input placeholder='foto' id='foto' value={cuerpo.foto} type='text' className='modal_input' onChange={(password) =>handleRepassword(password)}></input>

            <div align='right' >
              <Button style={{background:'grey',color:'white',marginRight:10}}
              onClick={() => handleModal()} >Cerrar</Button>
                      
              <Button style={{background:'blue',color:'white'}} 
              onClick={() => crearUsuarioMail(mail.email,mail.password, mail.repassword, handleModal)} >Aceptar</Button>
              </div>
          </>
        :null        
      }

        {titulo ==='Iniciar sesion' ?  
            <>
              <input placeholder='E-mail' id='email' type='mail' className='modal_input' onChange={(email) =>handleEmail(email)}></input>
              <input placeholder='Password' id='password' type='password' className='modal_input' onChange={(password) =>handlePassword(password)}></input>

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
              
              <input placeholder='E-mail' id='email' type='mail' className='modal_input' onChange={(email) =>handleEmail(email)}></input>
              <input placeholder='Password' id='password' type='password' className='modal_input' onChange={(password) =>handlePassword(password)}></input>
              <input placeholder='Repetir password' id='repassword' type='password' className='modal_input' onChange={(password) =>handleRepassword(password)}></input>

              <div align='right' >
                <Button style={{background:'grey',color:'white',marginRight:10}}
                onClick={() => handleModal()} >Cerrar</Button>
                       
                <Button style={{background:'blue',color:'white'}} 
                onClick={() => crearUsuarioMail(mail.email,mail.password, mail.repassword, handleModal)} >Aceptar</Button>
               </div>
            </>
            :null

        }
        
     

     
      {/* <SimpleModal /> */}
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
