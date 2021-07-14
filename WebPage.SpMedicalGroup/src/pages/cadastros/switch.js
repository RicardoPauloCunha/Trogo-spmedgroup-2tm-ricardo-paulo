import React, { Component } from "react";

import CadastroUsuario from "./usuario";
import CadastroMedico from "./medico";
import CadastroPaciente from "./paciente";
import CadastroConsulta from "./consulta";

class CadastroSwitch extends Component {
    render() {
        var cadastro;

        if (this.props.cadastroId === "1")
            cadastro = <CadastroConsulta />
        else if (this.props.cadastroId === "2")
            cadastro = <CadastroPaciente />
        else if (this.props.cadastroId === "3")
            cadastro = <CadastroMedico />
        else if (this.props.cadastroId === "4")
            cadastro = <CadastroUsuario />
        else
            cadastro = <CadastroConsulta />

        return(
            <>
                {cadastro}
            </>
        );
    }
}

export default CadastroSwitch;