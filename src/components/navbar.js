import React from 'react'
import { withRouter } from 'react-router-dom';

import NavbarItem from './navbarItem'


function Navbar(props){
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div className="container">
          <a href="/home" className="navbar-brand">Minhas Tarefas</a>
          <button className="navbar-toggler" type="button" 
                  data-toggle="collapse" data-target="#navbarResponsive" 
                  aria-controls="navbarResponsive" aria-expanded="false" 
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
                <NavbarItem href="/home" label="Home" />
                <NavbarItem href="/consulta-usuarios" label="Usuários" />
                <NavbarItem href="/consulta-atividades" label="Atividades" />
                <NavbarItem onClick={props.deslogar} href="/login" label="Sair" />
            </ul>
            </div>
        </div>
      </div>
    )
}

export default Navbar;
