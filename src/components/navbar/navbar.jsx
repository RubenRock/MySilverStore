import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import {Inbox, Mail, Menu, CancelPresentation } from '@material-ui/icons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MiModal from '../modal'

import {cerrarSesion} from '../firebase/conexionFirestore'
import {autentificacion} from '../firebase/configFirestore'

const elementosMenu = ['Participa', 'Mis mejores compras', 'Subastas', 'Iniciar sesion', 'Cerrar sesion','Crear Cuenta']

const drawerWidth = 240;

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
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false)
  const [usuario, setUsuario] = React.useState(false)

  //Chechar usuario activo
  useEffect(() =>{
    autentificacion.onAuthStateChanged((user)=>{    
      setUsuario(user)
  })
  },[])

  const accionesModal = (index) => {
    console.log(index) 
    if (index ===3) {
      setOpenModal(!openModal)      
    }

    if (index ===4) {
      cerrarSesion()
    }    
  }  

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //menu hamburguesa
  const drawer = (
    <div>
      {/*  <div className={classes.toolbar} />*/}
      <ListItem button  onClick={handleDrawerToggle} className={classes.toolbar} >            
            <ListItemIcon><CancelPresentation /> </ListItemIcon>            
            <ListItemText primary=' Cerrar' />
      </ListItem>
      <Divider />
      <List>
        {elementosMenu.map((text, index) => (
          <ListItem button key={text} onClick={() =>console.log('hola')}>
            {/* <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon> */}
            <ListItemText primary={text} />
          </ListItem>
        ))}
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

  const listaNavBar = (<Hidden xsDown>
                        {elementosMenu.map((text, index) => (
                          usuario ? 
                           
                              <Typography style={{marginLeft:15, fontSize:15}} key={text} onClick={() => accionesModal(index)}>
                                {index}
                              </Typography>
                              
                                                     
                          
                          :
                            <Typography style={{marginLeft:15, fontSize:15}} key={text} onClick={() => accionesModal(index)}>
                                {text}
                            </Typography>
                        ))}  
                      </Hidden>
                )

  const container = window !== undefined ? () => window().document.body : undefined;
 
  return (
    <div className={classes.root}>
      <CssBaseline />
      {openModal ? <MiModal accion={accionesModal} titulo='Iniciar sesion' cuerpo='Escribe tu Email y tu contraseña para iniciar'/>
      : null}
      
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

      <nav className={classes.drawer} aria-label="mailbox folders">
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
