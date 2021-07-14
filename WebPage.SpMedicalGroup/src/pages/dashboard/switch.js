import React, { Component } from "react";
import ListaConsultas from "./consultas";

import ListaMedicos from "./medicos";
import ListaUsuarios from "./usuarios";
import ListaProntuarios from "./prontuarios";

class ListaSwitch extends Component {
    render() {
        var lista;

        if (this.props.idLista === "1")
            lista = <ListaConsultas />
        else if (this.props.idLista === "2")
            lista = <ListaProntuarios />
        else if (this.props.idLista === "3")
            lista = <ListaMedicos />
        else if (this.props.idLista === "4")
            lista = <ListaUsuarios />
        else
            lista = <ListaConsultas />

        return(
            <>
                {lista}
            </>
        );
    }
}

export default ListaSwitch;