import React, { Component } from "react";
import Moment from "react-moment";

import "./styles.css";
import "../../assets/css/style.css";

import _listar from "./_listar";

class ListaConsultas extends Component {
    constructor() {
        super();

        this.state = {
            consultas: [],
            descricao: "",
            idDescricaoIncluir: "",
            mensagem: ""
        }
    }

    // Lista todas as consultas
    listarConsultas() {
        _listar.listar()
            .then(resposta => resposta.json())
            .then(data => { this.setState({ consultas: data }) })
            .catch(() => this.setState({ mensagem: "Ocorreu um erro durante o listagem, tente novamente" }));
    }

    // carrega o metodo
    componentDidMount() {
        this.listarConsultas();
    }

    render() {
        return (
            <div className="body-consultas">

                <div className="body-consultas--titulo">
                    <h2>Minhas Consultas</h2>
                    <div className="style__titulo--linha"></div>
                </div>

                {this.state.consultas.map(consulta => {
                    return (
                        <div className="consultas__consulta" key={consulta.id}>
                            <div className="consultas__consulta--item consultas__consulta--display-none">
                                <p className="consultas__consulta--item-infos-prot">N | Protocologo: {consulta.id}</p>
                                <div className="consultas__consulta--item-infos">
                                    <table>
                                        <tbody>
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
                                                <td className="consultas__consulta--item-infos-desc">{consulta.descricao}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="consultas__consulta--item consulta__table--display-none">
                                <div className="consultas__consulta--item-infos">
                                    <div className="consultas__table">
                                        <table className="consultas__table--table">
                                            <tbody>
                                                <tr className="consultas__table--header">
                                                    <th>Id</th>
                                                    <th>Medico</th>
                                                    <th>DataAgendada</th>
                                                    <th>HoraAgendade</th>
                                                    <th>Situacao</th>
                                                </tr>

                                                <tr className="consultas__table--info">
                                                    <td>{consulta.id}</td>
                                                    <td>{consulta.idMedicoNavigation.nome}</td>
                                                    <td><Moment format="DD/MM/YYYY">{consulta.dataAgendada}</Moment></td>
                                                    <td>{consulta.horaAgendada}</td>
                                                    <td>{consulta.idSituacaoNavigation.nome}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <table className="consultas__table--table consultas__table--table-textarea">
                                            <tbody>
                                                <tr className="consultas__table--header">
                                                    <th>Descrição</th>
                                                </tr>

                                                <tr className="consultas__table--info consultas__table--info-desc">
                                                    <td>{consulta.descricao}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>

                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
        )
    }
}

export default ListaConsultas