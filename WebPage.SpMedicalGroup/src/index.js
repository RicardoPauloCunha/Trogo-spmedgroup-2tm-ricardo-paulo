import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { UsuarioAutenticado } from "./services/auth";
import { parseJwt } from "./services/auth";

import Atendimentos from "./pages/atendimentos";
import Cadastros from './pages/cadastros';
import Consultas from "./pages/consultas";
import Dashboard from './pages/dashboard';
import Localizacoes from './pages/localizacoes';
import Login from "./pages/login";

// Verifica se é Admin
const PermissaoAdmin = ({ component: Component }) => (
    <Route
        render={props =>
            UsuarioAutenticado() && parseJwt().UsuarioTipo === "1"
                ? <Component {...props} />
                : <Redirect to={{ pathname: "/" }} />
        }
    />
)

// Verifica se é Medico
const PermissaoMedico = ({ component: Component }) => (
    <Route
        render={props =>
            UsuarioAutenticado() && parseJwt().UsuarioTipo === "2"
            ? <Component {...props} />
            : <Redirect to={{ pathname: "/" }} />
        }
    />
)

// Verifica se é Paciente
const PermissaoPaciente = ({ component: Component }) => (
    <Route
        render={props =>
            UsuarioAutenticado() && parseJwt().UsuarioTipo === "3"
            ? <Component {...props} />
            : <Redirect to={{ pathname: "/" }} />
        }
    />
)


const Routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Login} />
                <PermissaoPaciente path="/ConsultasPaciente" component={Consultas} />
                <PermissaoMedico path="/ConsultasMedico" component={Atendimentos} />
                <PermissaoAdmin path="/Cadastros" component={Cadastros} />
                <PermissaoAdmin path="/Dashboard" component={Dashboard} />
                <Route path="/Localizacoes" component={Localizacoes} />
            </Switch>
        </div>
    </Router>
)


ReactDOM.render(Routing, document.getElementById('root'));

serviceWorker.unregister();
