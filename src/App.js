import logo from './logo.svg';
import './App.css';
import {Button} from '@material-ui/core';
import { AccessAlarm, ThreeDRotation, Menu } from '@material-ui/icons';
import NavBar from './components/simplenavbar'


function App() {
  return (
    <div className="App">      
      <NavBar  />
      <header className="App-header">  
        <Button variant="contained" color="primary" onClick={()=> console.log('Hola meco')}>
          Hola Mundo!
        </Button>
        <AccessAlarm/>
        <ThreeDRotation/> 
        <Menu/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
