import React, { Component } from "react";
import CadastroUsuario from "./CadastroUsuario";
import CadastroMedico from "./CadastroMedico";
import CadastroPaciente from "./CadastroPaciente";
import CadastroConsulta from "./CadastroConsulta";

class CadastroIf extends Component {
    render() {
        var cadastro;

        if (this.props.idLista === "1") {
            cadastro = <CadastroConsulta />
        }
        else if (this.props.idLista === "2") {
            cadastro = <CadastroPaciente />
        }
        else if (this.props.idLista === "3") {
            cadastro = <CadastroMedico />
        }
        else if (this.props.idLista === "4") {
            cadastro = <CadastroUsuario />
        }
        else {
            cadastro = <CadastroConsulta />
        }

        return(
            <div>
                {cadastro}
            </div>
        );
    }
}

export default CadastroIf;