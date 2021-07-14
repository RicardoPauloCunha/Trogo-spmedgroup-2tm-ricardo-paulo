import React, { Component } from "react";

import firebase from '../../services/firebaseConfig';
import urlApi from '../../services/urlApi';
import "./styles.css";
import _cadastrar from "./_cadastrar";

class CadastroUsuario extends Component {
    constructor() {
        super();

        this.state = {
            listaTipoUsuarios: [],
            email: "",
            senha: "",
            tipoUsuarioId: "",
            mensagem: "",
            mensagemErroSenha: "",
            mensagemErroTipo: ""
        }

        this.atualizarEmail = this.atualizarEmail.bind(this);
        this.atualizarSenha = this.atualizarSenha.bind(this);
        this.atualizarTipoUsuarioId = this.atualizarTipoUsuarioId.bind(this);
    }

    atualizarEmail(event) {
        this.setState({ email: event.target.value });
    }

    atualizarSenha(event) {
        this.setState({ senha: event.target.value });
    }

    atualizarTipoUsuarioId(event) {
        this.setState({ tipoUsuarioId: event.target.value });
    }

    cadastrarUsuario(event) {
        event.preventDefault();

        let usuario = {
            email: this.state.email,
            senha: this.state.senha,
            tipoUsuarioId: this.state.tipoUsuarioId,
        }

        // valições dos valores inseridos nos inputs
        this.setState({ mensagem: "" })
        this.setState({ mensagemErroTipo: "" });
        this.setState({ mensagemErroSenha: "" });

        if (usuario.senha.length < 4)
            this.setState({ mensagemErroSenha: "Senha deve possuir no minimo 4 caracteres." });
        else if (usuario.senha.length > 30)
            this.setState({ mensagemErroSenha: "Senha deve possuir no maximo que 30 caracteres." })
        if (usuario.tipoUsuarioId === "")
            this.setState({ mensagemErroTipo: "Tipo usuário deve ser selecionado." });

        _cadastrar.cadastrar('Usuarios', usuario)
            .then(data => {
                if (data.status === 200) {
                    this.setState({ mensagem: "Cadastro realizado com sucesso!" });
                    this.setState({ tipoUsuarioId: "" });
                }
                else {
                    this.setState({ mensagem: "Dados Inválidos" });
                }
            })
            .catch(() => {
                this.setState({ mensagem: "Ocorreu um erro durante o cadastro, tente novamente" });
            });

        this._cadastrarUsuarioFirebase();
    }

    _cadastrarUsuarioFirebase = async () => {
        await firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.senha);
    }

    componentDidMount() {
        this.listarTiposUsuarios();
    }

    listarTiposUsuarios() {
        fetch(`${urlApi}api/TiposUsuarios`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaTipoUsuarios: data }));
    }

    render() {
        return (
            <div>
                <h2>Cadastrar Usuários</h2>
                <div className="style__titulo--linha"></div>

                <form
                    className="cadastro__cadastro--form"
                    onSubmit={this.cadastrarUsuario.bind(this)}
                >
                    <input
                        type="email"
                        placeholder="Email"
                        className="cadastro__cadastro--input cadastro__cadastro--input-grande"
                        required
                        value={this.state.email}
                        onChange={this.atualizarEmail}
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        className="cadastro__cadastro--input cadastro__cadastro--input-grande"
                        required
                        value={this.state.senha}
                        onChange={this.atualizarSenha}
                    />

                    <select
                        className="cadastro__cadastro--input cadastro__cadastro--input-ultimo cadastro__cadastro--select dashboard__select-default"
                        required
                        value={this.state.tipoUsuarioId}
                        onChange={this.atualizarTipoUsuarioId}
                    >
                        <option className="dashboard__lista--select-option">Tipo Usuário</option>
                        {this.state.listaTipoUsuarios.map(tipoUsuario => {
                            return (<option
                                key={tipoUsuario.id}
                                value={tipoUsuario.id}
                                className="dashboard__lista--select-option"
                            >{tipoUsuario.nome}</option>)
                        })}
                    </select>

                    <button type="submit" className="style__button--blue">Cadastrar</button>
                </form>

                <p className="cadastro__cadastro--form-erro-first">{this.state.mensagem}</p>
                <p className="cadastro__cadastro--form-erro">{this.state.mensagemErroSenha}</p>
                <p className="cadastro__cadastro--form-erro">{this.state.mensagemErroTipo}</p>
            </div>
        )
    }
}

export default CadastroUsuario;
