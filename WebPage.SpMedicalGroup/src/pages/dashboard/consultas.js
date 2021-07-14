import React, { Component } from "react";
import Moment from "react-moment";

import "../../assets/css/style.css";
import "./styles.css";
import _listar from "./_listar";

class ListaConsultas extends Component {
    constructor() {
        super();

        this.state = {
            listaConsultas: [],
            mensagem: ""
        }
    }

    listarConsultas() {
        _listar
            .listar("Consultas/ConsultasInclude")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ listaConsultas: data }) });
    }

    componentDidMount() {
        this.listarConsultas();
    }

    buttonClickConsultas() {
        this.listarConsultas();
    }

    render() {
        return (

            <div className="dashboard__lista">
                <h2>Lista de Consultas</h2>
                <div className="style__titulo--linha"></div>

                <div className="consultas__consulta consultas__consultas--tamanho">
                    {this.state.listaConsultas.map(consulta => {
                        return (<div key={consulta.id} className="consultas__consulta--item dashboard__consulta--display-none">
                            <p className="consultas__consulta--item-infos-prot">N | Protocologo: {consulta.id}</p>
                            <div className="consultas__consulta--item-infos">
                                <table >
                                    <tbody>
                                        <tr className="consultas__consulta--item-tr">
                                            <td className="consultas__consulta--item-th">Prontuario:</td>
                                            <td>{consulta.idProntuarioNavigation.nome}</td>
                                        </tr>

                                        <tr className="consultas__consulta--item-tr">
                                            <td className="consultas__consulta--item-th">Medico:</td>
                                            <td>{consulta.idMedicoNavigation.nome}</td>
                                        </tr>

                                        <tr className="consultas__consulta--item-tr">
                                            <td className="consultas__consulta--item-th">Data:</td>
                                            <td><Moment format="DD/MM/YYYY">{consulta.dataAgendada}</Moment></td>
                                        </tr>

                                        <tr className="consultas__consulta--item-tr">
                                            <td className="consultas__consulta--item-th">Hora:</td>
                                            <td>{consulta.horaAgendada}</td>
                                        </tr>

                                        <tr className="consultas__consulta--item-tr">
                                            <td className="consultas__consulta--item-th">Situação:</td>
                                            <td>{consulta.idSituacaoNavigation.nome}</td>
                                        </tr>

                                        <tr className="consultas__consulta--item-tr">
                                            <td className="consultas__consulta--item-th">Descricao:</td>
                                            <td>{consulta.descricao}</td>
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
                                        <th>IdProntuario</th>
                                        <th>IdMedico</th>
                                        <th>DataAgendada</th>
                                        <th>HoraAgendada</th>
                                        <th>IdSituacao</th>
                                        <th>Descricao</th>
                                    </tr>

                                    {this.state.listaConsultas.map(consulta => {
                                        return (<tr key={consulta.id} className="consultas__table--info dashboard__table--info">
                                            <td>{consulta.id}</td>
                                            <td>{consulta.idProntuarioNavigation.nome}</td>
                                            <td>{consulta.idMedicoNavigation.nome}</td>
                                            <td><Moment format="DD/MM/YYYY">{consulta.dataAgendada}</Moment></td>
                                            <td>{consulta.horaAgendada}</td>
                                            <td>{consulta.idSituacaoNavigation.nome}</td>
                                            <td className="consultas__ldescista--desc">{consulta.descricao}</td>
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

export default ListaConsultas;