import React, { Component } from "react";

import "../../assets/css/style.css";
import "./styles.css";
import _count from "./_count";

class ListaMedicos extends Component {
    constructor() {
        super();

        this.state = {
            listaMedicos: [],
            mensagem: ""
        }
    }

    listarMedicos() {
        _count.listar("Medicos/MedicosInclude")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ listaMedicos: data }) })
            .catch(erro => console.log(erro))
    }

    componentDidMount() {
        this.listarMedicos();
    }

    render() {
        return (
            <div className="dashboard__lista">
                <h2>Lista de Médicos</h2>
                <div className="style__titulo--linha"></div>

                <div className="consultas__consulta consultas__consultas--tamanho">
                    {this.state.listaMedicos.map(medico => {
                        return (<div key={medico.id} className="consultas__consulta--item dashboard__consulta--display-none">
                            <p className="consultas__consulta--item-infos-prot">N | Inscrição: {medico.id}</p>
                            <div className="consultas__consulta--item-infos">
                                <table >
                                    <tbody>
                                        <tr className="consultas__consulta--item-tr">
                                            <td className="consultas__consulta--item-th">Nome:</td>
                                            <td>{medico.nome}</td>
                                        </tr>

                                        <tr className="consultas__consulta--item-tr">
                                            <td className="consultas__consulta--item-th">CRM:</td>
                                            <td>{medico.crm}</td>
                                        </tr>

                                        <tr className="consultas__consulta--item-tr">
                                            <td className="consultas__consulta--item-th">Especialidade:</td>
                                            <td>{medico.idEspecialidadeNavigation.nome}</td>
                                        </tr>

                                        <tr className="consultas__consulta--item-tr">
                                            <td className="consultas__consulta--item-th">Usuario:</td>
                                            <td>{medico.idUsuarioNavigation.email}</td>
                                        </tr>

                                        <tr className="consultas__consulta--item-tr">
                                            <td className="consultas__consulta--item-th">Clinica:</td>
                                            <td>{medico.idClinicaNavigation.nomeFantasia}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>);
                    })}

                    <div className="consultas__consulta--item-infos dashboard__lista--table-container">
                        <div className="consultas__table dashboard__lista--table">
                            <table className="dashboard__table--table">
                                <tbody>
                                    <tr className="consultas__lista--header">
                                        <th>Id</th>
                                        <th>Nome</th>
                                        <th>CRM</th>
                                        <th>Especialidade</th>
                                        <th>Usuario</th>
                                        <th>Clinica</th>
                                    </tr>

                                    {this.state.listaMedicos.map(medico => {
                                        return (<tr key={medico.id} className="consultas__table--info dashboard__table--info">
                                            <td>{medico.id}</td>
                                            <td>{medico.nome}</td>
                                            <td>{medico.crm}</td>
                                            <td>{medico.idEspecialidadeNavigation.nome}</td>
                                            <td>{medico.idUsuarioNavigation.email}</td>
                                            <td>{medico.idClinicaNavigation.nomeFantasia}</td>
                                        </tr>);
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListaMedicos;