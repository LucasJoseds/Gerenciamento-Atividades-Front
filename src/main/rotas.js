import React from 'react'

import Login from '../views/login'
import Home from '../views/home'
import CadastroUsuario from '../views/cadastroUsuario'
import ConsultaAtividades from '../views/atividades/consulta-atividades'
import CadastroAtividades from '../views/atividades/cadastro-atividades'
import LandingPage from '../views/landingPage'
import EditarUsuarios
 from '../views/editarUsuario'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import ConsultaUsuarios from '../views/consulta-usuarios'




function Rotas(props){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/cadastro-usuarios" component={CadastroUsuario} />
                <Route exact path="/editar-usuarios/:id?" component={EditarUsuarios} />
                <Route path="/home" component={Home} />
                <Route  path="/consulta-atividades" component={ConsultaAtividades} />
                <Route  path="/consulta-usuarios" component={ConsultaUsuarios} />
                <Route path="/cadastro-atividades/:id?" component={CadastroAtividades} />
            </Switch>
        </BrowserRouter>
    )
}

export default Rotas 
  
