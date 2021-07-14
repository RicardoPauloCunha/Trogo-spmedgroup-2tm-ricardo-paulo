import React, { Component } from "react";
import Moment from "react-moment";

import "../../assets/css/style.css";
import "./styles.css";
import _count from "./_listar";

class ListaProntuarios extends Component {
    constructor() {
        super();

        this.state = {
            listaProntuarios: [],
            mensagem: ""
        }
    }

    listarProntuarios() {
        _count.listar("Prontuarios/ProntuariosInclude")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ listaProntuarios: data }) })
            .catch(erro => console.log(erro))
    }

    componentDidMount() {
        this.listarProntuarios();
    }

    render() {
        return (
            <div className="dashboard__lista">
                <h2>Lista de Prontuários</h2>
                <div className="style__titulo--linha"></div>

                <div className="consultas__consulta consultas__consulta-prontuario consultas__consultas--tamanho">

                    {this.state.listaProntuarios.map(prontuario => {
                        return (<div key={prontuario.id} className="consultas__consulta--item dashboard__consulta--display-none">
                            <p className="consultas__consulta--item-infos-prot">N | Inscrição: {prontuario.id}</p>
                            <div className="consultas__consulta--item-infos">
                                <table >
                                    <tbody>
                                        <tr className="consultas__consulta--item-tr">
                                            <td className="consultas__consulta--item-th">Nome:</td>
                                            <td>{prontuario.nome}</td>
                                        </tr>

                                        <tr className="consultas__consulta--item-tr">
                                            <td className="consultas__consulta--item-th">RG:</td>
                                            <td>{prontuario.rg}</td>
                                        </tr>

                                        <tr className="consultas__consulta--item-tr">
                                            <td className="consultas__consulta--item-th">CPF:</td>
                                            <td>{prontuario.cpf}</td>
                                        </tr>

                                        <tr className="consultas__consulta--item-tr">
                                            <td className="consultas__consulta--item-th">Data de Nascimento:</td>
                                            <td><Moment format="DD/MM/YYYY">{prontuario.dataNascimento}</Moment></td>
                                        </tr>

                                        <tr className="consultas__consulta--item-tr">
                                            <td className="consultas__consulta--item-th">Usuario:</td>
                                            <td>{prontuario.idUsuarioNavigation.email}</td>
                                        </tr>

                                        <tr className="consultas__consulta--item-tr">
                                            <td className="consultas__consulta--item-th">Rua:</td>
                                            <td>{prontuario.rua}</td>
                                        </tr>

                                        <tr className="consultas__consulta--item-tr">
                                            <td className="consultas__consulta--item-th">Bairro:</td>
                                            <td>{prontuario.bairro}</td>
                                        </tr>

                                        <tr className="consultas__consulta--item-tr">
                                            <td className="consultas__consulta--item-th">Cidade:</td>
                                            <td>{prontuario.cidade}</td>
                                        </tr>

                                        <tr className="consultas__consulta--item-tr">
                                            <td className="consultas__consulta--item-th">Estado:</td>
                                            <td>{prontuario.estado}</td>
                                        </tr>

                                        <tr className="consultas__consulta--item-tr">
                                            <td className="consultas__consulta--item-th">CEP:</td>
                                            <td>{prontuario.cep}</td>
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
                                        <th>RG</th>
                                        <th>CPF</th>
                                        <th>Data Nascimento</th>
                                        <th>Telefone</th>
                                        <th>Usuario</th>
                                        <th>Rua</th>
                                        <th>Bairro</th>
                                        <th>Cidade</th>
                                        <th>Estado</th>
                                        <th>CEP</th>
                                    </tr>

                                    {this.state.listaProntuarios.map(prontuario => {
                                        return (<tr key={prontuario.id} className="consultas__table--info dashboard__table--info">
                                            <td>{prontuario.id}</td>
                                            <td>{prontuario.nome}</td>
                                            <td>{prontuario.rg}</td>
                                            <td>{prontuario.cpf}</td>
                                            <td><Moment format="DD/MM/YYYY">{prontuario.dataNascimento}</Moment></td>
                                            <td>{prontuario.telefone}</td>
                                            <td>{prontuario.idUsuarioNavigation.email}</td>
                                            <td>{prontuario.rua}</td>
                                            <td>{prontuario.bairro}</td>
                                            <td>{prontuario.cidade}</td>
                                            <td>{prontuario.estado}</td>
                                            <td>{prontuario.cep}</td>
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

export default ListaProntuarios;