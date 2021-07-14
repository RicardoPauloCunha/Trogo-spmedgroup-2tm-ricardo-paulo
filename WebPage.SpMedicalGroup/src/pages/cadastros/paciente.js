import React, { Component } from "react";

import urlApi from '../../services/urlApi';
import "./styles.css";
import _cadastrar from "./_cadastrar";

class CadastroPaciente extends Component {
    constructor() {
        super();

        this.state = {
            listaUsuarios: [],
            nome: "",
            rg: "",
            cpf: "",
            dataNascimento: "",
            telefone: "",
            usuarioId: "",
            rua: "",
            bairro: "",
            cidade: "",
            estado: "",
            cep: "",
            mensagem: "",
            mensagemErroRg: "",
            mensagemErroCpf: "",
            mensagemErroDataNasc: "",
            mensagemErroTelefone: "",
            mensagemErroEstado: "",
            mensagemErroCep: "",
            mensagemErroUsuario: ""
        }

        this.atualizarNome = this.atualizarNome.bind(this);
        this.atualizarRg = this.atualizarRg.bind(this);
        this.atualizarCpf = this.atualizarCpf.bind(this);
        this.atualizarDataNascimento = this.atualizarDataNascimento.bind(this);
        this.atualizarTelefone = this.atualizarTelefone.bind(this);
        this.atualizarUsuarioId = this.atualizarUsuarioId.bind(this);
        this.atualizarRua = this.atualizarRua.bind(this);
        this.atualizarBairro = this.atualizarBairro.bind(this);
        this.atualizarCidade = this.atualizarCidade.bind(this);
        this.atualizarEstado = this.atualizarEstado.bind(this);
        this.atualizarCep = this.atualizarCep.bind(this);
    }

    //Pegar o valor que usuario digitar
    atualizarNome(event) {
        this.setState({ nome: event.target.value });
    }

    atualizarRg(event) {
        this.setState({ rg: event.target.value });
    }

    atualizarCpf(event) {
        this.setState({ cpf: event.target.value });
    }

    atualizarDataNascimento(event) {
        this.setState({ dataNascimento: event.target.value });
    }

    atualizarTelefone(event) {
        this.setState({ telefone: event.target.value });
    }

    atualizarUsuarioId(event) {
        this.setState({ usuarioId: event.target.value });
    }

    atualizarRua(event) {
        this.setState({ rua: event.target.value });
    }

    atualizarBairro(event) {
        this.setState({ bairro: event.target.value });
    }

    atualizarCidade(event) {
        this.setState({ cidade: event.target.value });
    }

    atualizarEstado(event) {
        this.setState({ estado: event.target.value });
    }

    atualizarCep(event) {
        this.setState({ cep: event.target.value });
    }

    //Cadastra o Prontuario com os dado passados pelo paciente
    cadastrarPaciente(event) {
        event.preventDefault();

        let prontuario = {
            nome: this.state.nome,
            rg: this.state.rg,
            cpf: this.state.cpf,
            dataNascimento: this.state.dataNascimento,
            telefone: this.state.telefone,
            usuarioId: this.state.usuarioId,
            rua: this.state.rua,
            bairro: this.state.bairro,
            cidade: this.state.cidade,
            estado: this.state.estado,
            cep: this.state.cep,
        };

        // valições dos valores inseridos nos inputs
        this.setState({ mensagem: "" });
        this.setState({ mensagemErroRg: "" });
        this.setState({ mensagemErroCpf: "" });
        this.setState({ mensagemErroTelefone: "" });
        this.setState({ mensagemErroEstado: "" });
        this.setState({ mensagemErroCep: "" });
        this.setState({ mensagemErroUsuario: "" });

        if (prontuario.rg.length <= 12 || prontuario.rg.length >= 14)
            this.setState({ mensagemErroRg: "RG deve possuir no máximo 14 caracteres e no minimo 12 caracteres." });

        if (prontuario.cpf.length < 11 || prontuario.cpf.length > 14)
            this.setState({ mensagemErroCpf: "CPF deve possuir no máximo 14 caracteres e no minimo 11 caracteres." });

        if (prontuario.telefone.length < 9 || prontuario.cpf.length > 20)
            this.setState({ mensagemErroTelefone: "Telefone deve possuir no máximo 20 caracteres e no minimo 9." });

        if (prontuario.estado.length > 2)
            this.setState({ mensagemErroEstado: "Coloque apenas a Sigla do estado, no maximo 2 caracteres." });

        if (prontuario.cep.length > 9)
            this.setState({ mensagemErroCep: "CEP deve possuir no máximo 9 caracteres." });

        if (prontuario.usuarioId === "")
            this.setState({ mensagemErroUsuario: "Usuário deve ser selecionada." });

        _cadastrar.cadastrar('Prontuarios', prontuario)
            .then(data => {
                if (data.status === 200) {
                    this.setState({ mensagem: "Cadastro realizado com sucesso!" });
                    this.setState({ usuarioId: "" });
                }
                else {
                    this.setState({ mensagem: "Dados Inválidos" });
                }
            })
            .catch(() => this.setState({ mensagem: "Ocorreu um erro durante o listagem, tente novamente" }))
    }

    componentDidMount() {
        this.listarUsuarios();
    }

    listarUsuarios() {
        fetch(`${urlApi}api/Usuarios/SelectUsuarios`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaUsuarios: data }))
            .catch(() => this.setState({ mensagem: "Ocorreu um erro durante o cadastro, tente novamente" }));
    }

    render() {
        return (
            <div>
                <h2>Cadastrar Prontuarios</h2>
                <div className="style__titulo--linha"></div>

                <form
                    className="cadastro__cadastro--form"
                    onSubmit={this.cadastrarPaciente.bind(this)}
                >
                    <input
                        type="text"
                        placeholder="Nome"
                        className="cadastro__cadastro--input cadastro__cadastro--input-grande"
                        required
                        value={this.state.nome}
                        onChange={this.atualizarNome}
                    />

                    <input
                        type="text"
                        placeholder="RG"
                        className="cadastro__cadastro--input"
                        required
                        value={this.state.rg}
                        onChange={this.atualizarRg}
                    />

                    <input
                        type="text"
                        placeholder="CPF"
                        className="cadastro__cadastro--input"
                        required
                        value={this.state.cpf}
                        onChange={this.atualizarCpf}
                    />

                    <input
                        type="date"
                        placeholder="Data Nasc."
                        className="cadastro__cadastro--input"
                        required
                        value={this.state.dataNascimento}
                        onChange={this.atualizarDataNascimento}
                    />

                    <input
                        type="text"
                        placeholder="Telefone"
                        className="cadastro__cadastro--input"
                        required
                        value={this.state.telefone}
                        onChange={this.atualizarTelefone}
                    />

                    <input
                        type="text"
                        placeholder="Rua"
                        className="cadastro__cadastro--input cadastro__cadastro--input-grande"
                        required
                        value={this.state.rua}
                        onChange={this.atualizarRua}
                    />

                    <input
                        type="text"
                        placeholder="Bairro"
                        className="cadastro__cadastro--input"
                        required
                        value={this.state.bairro}
                        onChange={this.atualizarBairro}
                    />

                    <input
                        type="text"
                        placeholder="Cidade"
                        className="cadastro__cadastro--input"
                        required
                        value={this.state.cidade}
                        onChange={this.atualizarCidade}
                    />

                    <input
                        type="text"
                        placeholder="Estado"
                        className="cadastro__cadastro--input"
                        required
                        value={this.state.estado}
                        onChange={this.atualizarEstado}
                    />

                    <input
                        type="text"
                        placeholder="CEP"
                        className="cadastro__cadastro--input"
                        required
                        value={this.state.cep}
                        onChange={this.atualizarCep}
                    />

                    <select
                        className="cadastro__cadastro--input cadastro__cadastro--input-ultimo cadastro__cadastro--select dashboard__select-default"
                        required
                        value={this.state.usuarioId}
                        onChange={this.atualizarUsuarioId}
                    >
                        <option className="dashboard__lista--select-option">Usuário</option>
                        {this.state.listaUsuarios.map(usuario => {
                            return (<option
                                key={usuario.id}
                                value={usuario.id}
                                className="dashboard__lista--select-option"
                            >{usuario.email}</option>)
                        })}
                    </select>

                    <button className="style__button--blue" type="submit">Cadastrar</button>
                </form>

                <p className="cadastro__cadastro--form-erro-first">{this.state.mensagem}</p>
                <p className="cadastro__cadastro--form-erro">{this.state.mensagemErroRg}</p>
                <p className="cadastro__cadastro--form-erro">{this.state.mensagemErroCpf}</p>
                <p className="cadastro__cadastro--form-erro">{this.state.mensagemErroDataNasc}</p>
                <p className="cadastro__cadastro--form-erro">{this.state.mensagemErroTelefone}</p>
                <p className="cadastro__cadastro--form-erro">{this.state.mensagemErroEstado}</p>
                <p className="cadastro__cadastro--form-erro">{this.state.mensagemErroCep}</p>
                <p className="cadastro__cadastro--form-erro">{this.state.mensagemErroUsuario}</p>
            </div>
        )
    }
}

export default CadastroPaciente;