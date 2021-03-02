import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {AppBar, CssBaseline,  Divider, Drawer, Hidden, IconButton} from '@material-ui/core'
import {Inbox, Mail, Menu, CancelPresentation } from '@material-ui/icons';
import {List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';

import MiModal from '../modal'
import {cerrarSesion} from '../firebase/conexionFirestore'
import {autentificacion} from '../firebase/configFirestore'

const elementosUsuarioActivo = ['Participa', 'Mis mejores compras', 'Subastas', 'Cerrar sesion']
const elementosUsuarioInactivo = ['Participa', 'Mis mejores compras', 'Subastas', 'Iniciar sesion', 'Crear Cuenta']
const elementosUsuarioAdmin = ['Vista usuario','Administrar', 'Cerrar sesion']

const drawerWidth = 240; //ancho de la lista del menu hamburguesa

//estilos de la lista del menu hamburguesa
const useStyles = makeStyles((theme) => ({ 
  root: {
    display: 'flex',
  },
  drawer: {
    /* [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    }, */
  },
  appBar: {
    /* [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    }, */
  },
  title: {
    flexGrow: 1,
    textAlign:'left',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: { //tamaño para ocultar el menu hamburguesa
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  

}));



function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);// abrir-cerrar menu hamburguesa
  const [openModal, setOpenModal] = React.useState(false) // abrir-cerrar ventana Modal
  const [usuario, setUsuario] = React.useState(false)
  const [datosModal, setDatosModal] = React.useState('')
  

  //Chechar usuario activo
  useEffect(() =>{
    autentificacion.onAuthStateChanged((user)=>{    
      setUsuario(user)      
  })
  },[])

  const accionesModal = (opcion) => {    
    if (opcion ==='Iniciar sesion') {
      setOpenModal(!openModal) 
      setDatosModal({titulo:'Iniciar sesion', cuerpo:'Escribe tu Email y tu contraseña para iniciar'})    
    }

    if (opcion ==='Cerrar sesion') {
      props.admin(false) //vista del administrador
      cerrarSesion()
    }    

    if (opcion ==='Crear Cuenta') {
      setOpenModal(!openModal)      
      setDatosModal({titulo:'Crea tu cuenta', cuerpo:'Escribe tu Email y tu contraseña para darte de alta '})    
    }

    if (opcion ==='Administrar') {
      props.admin(true) //vista del administrador
    }

    if (opcion ==='Vista usuario') {
      props.admin(false) //vista del administrador
    }

  }  

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //contenido menu hamburguesa
  const drawer = (
    <div>
      {/*  <div className={classes.toolbar} />*/}
      
      {/* boton cerrar */}
      <ListItem button  onClick={handleDrawerToggle} className={classes.toolbar} >            
            <ListItemIcon><CancelPresentation /> </ListItemIcon>            
            <ListItemText primary=' Cerrar' />
      </ListItem>

      <Divider />
      <List>
        {usuario ? 

            (usuario.email === 'specterruben@gmail.com' ?
              elementosUsuarioAdmin.map((text, index) => (    
                <ListItem button key={text} onClick={() => {
                    accionesModal(text)
                    handleDrawerToggle() //cierra despues de tocar
                  }
                }>              
                  <ListItemText primary={text} />
                </ListItem>
            ))
            :                          
              elementosUsuarioActivo.map((text, index) => (
                <ListItem button key={text} onClick={() => {
                    accionesModal(text)
                    handleDrawerToggle() //cierra despues de tocar
                  }
                }>              
                    <ListItemText primary={text} />
                </ListItem>
              ))
          )

           
          :
            elementosUsuarioInactivo.map((text, index) => (
              <ListItem button key={text} onClick={() => accionesModal(text)}>                
                <ListItemText primary={text} />
              </ListItem>
            ))
        }
      </List>
      <Divider />
      <List>
        {['Nosotros', 'Contacto'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  //Elementos del navbar
  const listaNavBar = (<Hidden xsDown>                           
                        {usuario ?

                            (usuario.email === 'specterruben@gmail.com' ?
                                elementosUsuarioAdmin.map((text, index) => (    
                                  <div className='navbar_seleccion'>
                                    <Typography style={{marginLeft:15, fontSize:15}} key={text} onClick={() => accionesModal(text)}>
                                      {text}
                                    </Typography>
                                  </div>
                                ))
                            :                          
                                elementosUsuarioActivo.map((text, index) => (    
                                  <div className='navbar_seleccion'>
                                    <Typography style={{marginLeft:15, fontSize:15}} key={text} onClick={() => accionesModal(text)}>
                                      {text}
                                    </Typography>
                                  </div>
                                )))
                         
                          :
                            elementosUsuarioInactivo.map((text, index) => (    
                              <div className='navbar_seleccion'>
                                <Typography style={{marginLeft:15, fontSize:15}} key={text} onClick={() => accionesModal(text)}>
                                  {text}
                                </Typography>
                              </div>
                            ))                          

                        }  
                      </Hidden>
                )

  const container = window !== undefined ? () => window().document.body : undefined;
 
  return (
    <div className={classes.root}>
      <CssBaseline />

      {openModal ? 
          <MiModal accion={setOpenModal} titulo={datosModal.titulo} cuerpo={datosModal.cuerpo}/>
      :   
         null
      }
      
      <AppBar position="absolute" className={classes.appBar}  style={{ background: '#2c3e50' }}>
        <Toolbar>        
          <Typography variant="h5" className={classes.title}>
            My Silver Lotto
          </Typography>

          {/* boton menu hamburguesa */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
         
            {listaNavBar}
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders"> {/* Lista del menu hamburguesa */}
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            //anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            anchor={theme.direction === 'rtl' ? 'right' : 'right'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>       
      </nav>
      
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
