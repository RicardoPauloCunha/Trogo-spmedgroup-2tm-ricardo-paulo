import React, { Component } from "react";

import "../../assets/css/style.css";
import "./styles.css";
import _count from "./_listar";

class ListarUsuarios extends Component {
    constructor() {
        super();

        this.state = {
            listaUsuarios: [],
            mensagem: ""
        }
    }

    listarUsuarios() {
        _count.listar("Usuarios/UsuariosInclude")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ listaUsuarios: data }) })
            .catch(erro => console.log(erro))
    }

    componentDidMount() {
        this.listarUsuarios();
    }

    render() {
        return (
            <div>
                <div className="dashboard__lista">
                    <h2>Lista de Usuários</h2>
                    <div className="style__titulo--linha"></div>

                    <div className="consultas__consulta consultas__consultas--tamanho">

                        {this.state.listaUsuarios.map(usuario => {
                            return (<div key={usuario.id} className="consultas__consulta--item dashboard__consulta--display-none">
                                <p className="consultas__consulta--item-infos-prot">N | Inscrição: {usuario.id}</p>
                                <div className="consultas__consulta--item-infos">
                                    <table >
                                        <tbody>
                                            <tr className="consultas__consulta--item-tr">
                                                <td className="consultas__consulta--item-th">Email:</td>
                                                <td>{usuario.email}</td>
                                            </tr>

                                            <tr className="consultas__consulta--item-tr">
                                                <td className="consultas__consulta--item-th">Senha:</td>
                                                <td>{usuario.senha}</td>
                                            </tr>

                                            <tr className="consultas__consulta--item-tr">
                                                <td className="consultas__consulta--item-th">Tipo Usuario:</td>
                                                <td>{usuario.idTipoUsuarioNavigation.nome}</td>
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
                                            <th>Email</th>
                                            <th>Senha</th>
                                            <th>TipoUsuario</th>
                                        </tr>

                                        {this.state.listaUsuarios.map(usuario => {
                                            return (<tr key={usuario.id} className="consultas__table--info dashboard__table--info">
                                                <td>{usuario.id}</td>
                                                <td>{usuario.email}</td>
                                                <td>{usuario.senha}</td>
                                                <td>{usuario.idTipoUsuarioNavigation.nome}</td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListarUsuarios;