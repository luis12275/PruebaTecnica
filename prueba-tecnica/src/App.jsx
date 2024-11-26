import logo from './logo.svg';
import './App.css';
import React from "react";
import UsuariosComponent from './Components/UsuariosComponent';
import HabilidadesComponent from './Components/HabilidadesComponent';
import LoginComponent from './Components/LoginComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import MenuHamburguesa from './Components/MenuHamburguesa';
import {  useSelector } from 'react-redux'

function App() {
  const login = useSelector(store => store.Usuario.login)
  
  return (
    <Router>
      {login?.login?.id && <MenuHamburguesa/>}
      

      <Switch>
        <Route  path='/'  exact component={LoginComponent}/>
        <Route  path='/Usuarios'  component={UsuariosComponent}/>
        <Route  path='/Habilidades' component={HabilidadesComponent}/>
      </Switch>
        
    </Router>
  );
}
export default App;
