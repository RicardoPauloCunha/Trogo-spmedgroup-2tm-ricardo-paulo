import React, { Component } from "react";

import "../../assets/css/style.css";
import "./styles.css";
import _count from "./_count";

import usuarioIcon from "../../assets/icon/dashboard-icon-usuario.png";
import iconProntuario from "../../assets/icon/dashboard-icon-prontuario.png";
import consultaIcon from "../../assets/icon/dashboard-icon-consulta.png";
import medicoIcon from "../../assets/icon/dashboard-icon-medico.png";

class Contadores extends Component {
    constructor() {
        super();

        this.state = {
            qtdConsultas: "",
            qtdUsuarios: "",
            qtdProntuarios: "",
            qtdMedicos: ""
        }
    }

    qtdConsultas() {
        _count.count("Consultas")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ qtdConsultas: data }) });
    }

    qtdProntuarios() {
        _count.count("Prontuarios")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ qtdProntuarios: data }) });
    }

    qtdMedicos() {
        _count
            .count("Medicos")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ qtdMedicos: data }) });
    }

    qtdUsuarios() {
        _count
            .count("Usuarios")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ qtdUsuarios: data }) });
    }

    componentDidMount() {
        this.qtdConsultas();
        this.qtdProntuarios();
        this.qtdMedicos();
        this.qtdUsuarios();
    }

    render() {
        return (
            <div className="dashboard__item--container dashboard__estatic--container">
                <div className="dashboard__estatic--item">
                    <p>Consultas</p>
                    <img src={consultaIcon} alt="" />
                    <p>{this.state.qtdConsultas}</p>
                </div>

                <div className="dashboard__estatic--item">
                    <p>Prontuários</p>
                    <img src={iconProntuario} alt="" />
                    <p>{this.state.qtdProntuarios}</p>
                </div>

                <div className="dashboard__estatic--item">
                    <p>Médicos</p>
                    <img src={medicoIcon} alt="" />
                    <p>{this.state.qtdMedicos}</p>
                </div>

                <div className="dashboard__estatic--item">
                    <p>Usuários</p>
                    <img src={usuarioIcon} alt="" />
                    <p>{this.state.qtdUsuarios}</p>
                </div>
            </div>
        )
    }
}

export default Contadores;