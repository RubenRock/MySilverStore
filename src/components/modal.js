import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Button} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    alignItems:'center',
    justifySelf:'center',
    justifyContent:'center',
    
    
  },
}));

export default function SimpleModal({accion}) {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(true)

  const handleModal = () => {
    accion(!openModal)
    setOpenModal(!openModal)
  }
 
  

  const body = (
    <div className={classes.paper}>
      <h2 >Text in a modal</h2>
      <p >
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <div align='right'>
        <Button style={{background:'grey',color:'white',marginRight:10}}
         onClick={() => handleModal()} >Cerrar</Button>
        <Button style={{background:'blue',color:'white'}}>Aceptar</Button>
      </div>
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
