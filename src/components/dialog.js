import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Dialog, DialogTitle} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';



function SimpleDialog(props) {
  const { onClose, open } = props;  

  return (
    <Dialog onClose={() => onClose(false)} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Set backup account para todo el mindo aqui</DialogTitle>      
      <textarea placeholder='Foto 1' type='text' className='modal_input' ></textarea>
      <textarea placeholder='Foto 1' type='text' className='modal_input' ></textarea>
      <textarea placeholder='Foto 1' type='text' className='modal_input' ></textarea>
      <textarea placeholder='Foto 1' type='text' className='modal_input' ></textarea>
      <textarea placeholder='Foto 1' type='text' className='modal_input' ></textarea>
      <textarea placeholder='Foto 1' type='text' className='modal_input' ></textarea>
      <textarea placeholder='Foto 1' type='text' className='modal_input' ></textarea>
      <textarea placeholder='Foto 1' type='text' className='modal_input' ></textarea>
      <textarea placeholder='Foto 1' type='text' className='modal_input' ></textarea>
      <textarea placeholder='Foto 1' type='text' className='modal_input' ></textarea>
      <textarea placeholder='Foto 1' type='text' className='modal_input' ></textarea>
      <textarea placeholder='Foto 1' type='text' className='modal_input' ></textarea>
      <textarea placeholder='Foto 1' type='text' className='modal_input' ></textarea>
      <textarea placeholder='Foto 1' type='text' className='modal_input' ></textarea>
      <textarea placeholder='Foto 1' type='text' className='modal_input' ></textarea>
      <div >
        <Button style={{background:'grey',color:'white',marginRight:10}}
        onClick={() => onClose(false)}>Cerrar</Button>
            
        <Button style={{background:'blue',color:'white'}} 
        >Aceptar</Button>
      </div>
    </Dialog>
  );
}



export default function SimpleDialogDemo({accion}) {    

  return (
    <div>                  
      <SimpleDialog open={true} onClose={accion} />
    </div>
  );
}
