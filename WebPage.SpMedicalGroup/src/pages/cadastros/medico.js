import React, { Component } from "react";

import urlApi from '../../services/urlApi';
import "./styles.css";
import _cadastrar from "./_cadastrar";

class CadastroMedico extends Component {
    constructor() {
        super();

        this.state = {
            especialidades: [],
            usuarios: [],
            clinicas: [],
            nome: "",
            crm: "",
            especialidadeId: "",
            usuarioId: "",
            clinicaId: "",
            mensagem: "",
            mensagemErroEspecialidade: "",
            mensagemErroUsuario: "",
            mensagemErroClinica: ""
        }

        this.atualizarNome = this.atualizarNome.bind(this);
        this.atualizarCrm = this.atualizarCrm.bind(this);
        this.atualizarEspecialidadeId = this.atualizarEspecialidadeId.bind(this);
        this.atualizarUsuarioId = this.atualizarUsuarioId.bind(this);
        this.atualizarClinicaId = this.atualizarClinicaId.bind(this);
    }

    atualizarNome(event) {
        this.setState({ nome: event.target.value });
    }

    atualizarCrm(event) {
        this.setState({ crm: event.target.value });
    }

    atualizarEspecialidadeId(event) {
        this.setState({ especialidadeId: event.target.value });
    }

    atualizarUsuarioId(event) {
        this.setState({ usuarioId: event.target.value });
    }

    atualizarClinicaId(event) {
        this.setState({ clinicaId: event.target.value });
    }

    cadastrarMedico(event) {
        event.preventDefault();

        let medico = {
            nome: this.state.nome,
            crm: this.state.crm,
            especialidadeId: this.state.especialidadeId,
            usuarioId: this.state.usuarioId,
            clinicaId: this.state.clinicaId
        }

        // valições dos valores inseridos nos inputs
        this.setState({ mensagem: "" });
        this.setState({ mensagemErroEspecialidade: "" });
        this.setState({ mensagemErroUsuario: "" });
        this.setState({ mensagemErroClinica: "" });

        if (medico.especialidadeId === "")
            this.setState({ mensagemErroEspecialidade: "Especialidade deve ser selecionada." });

        if (medico.usuarioId === "")
            this.setState({ mensagemErroUsuario: "Usuário deve ser selecionado." });

        if (medico.clinicaId === "")
            this.setState({ mensagemErroClinica: "Clinica deve ser selecionada." });

        _cadastrar.cadastrar('Medicos', medico)
            .then(data => {
                if (data.status === 200) {
                    this.setState({ mensagem: "Cadastro realizado com sucesso!" });
                    this.setState({ especialidadeId: "" });
                    this.setState({ usuarioId: "" });
                    this.setState({ clinicaId: "" });
                }
                else {
                    this.setState({ mensagem: "Dados Inválidos" })
                }
            })
            .catch(() => {
                this.setState({ mensagem: "Ocorreu um erro durante o cadastro, tente novamente" });
            });
    }

    componentDidMount() {
        this.listarEspecialidades();
        this.listarUsuarios();
        this.listarClinicas();
    }

    listarEspecialidades() {
        fetch(`${urlApi}api/Especialidades`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ especialidades: data }));
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
            .then(data => this.setState({ usuarios: data }));
    }

    listarClinicas() {
        fetch(`${urlApi}api/Clinicas/SelectClinicas`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ clinicas: data }));
    }

    render() {
        return (
            <div>
                <h2>Cadastrar Médico</h2>
                <div className="style__titulo--linha"></div>

                <form
                    className="cadastro__cadastro--form"
                    onSubmit={this.cadastrarMedico.bind(this)}
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
                        placeholder="CRM"
                        className="cadastro__cadastro--input"
                        required
                        value={this.state.crm}
                        onChange={this.atualizarCrm}
                    />

                    <select
                        className="cadastro__cadastro--input cadastro__cadastro--select dashboard__select-default"
                        required
                        value={this.state.especialidadeId}
                        onChange={this.atualizarEspecialidadeId}
                    >
                        <option className="dashboard__lista--select-option">Especialidade</option>
                        {this.state.especialidades.map(especialiade => {
                            return (<option
                                key={especialiade.id}
                                value={especialiade.id}
                                className="dashboard__lista--select-option"
                            >{especialiade.nome}</option>)
                        })}
                    </select>

                    <select
                        className="cadastro__cadastro--input cadastro__cadastro--select dashboard__select-default"
                        required
                        value={this.state.usuarioId} onChange={this.atualizarUsuarioId}
                    >
                        <option className="dashboard__lista--select-option">Usuário</option>
                        {this.state.usuarios.map(usuario => {
                            return (<option
                                key={usuario.id}
                                value={usuario.id}
                                className="dashboard__lista--select-option"
                            >{usuario.email}</option>)
                        })}
                    </select>

                    <select
                        className="cadastro__cadastro--input cadastro__cadastro--select dashboard__select-default"
                        required
                        value={this.state.clinicaId}
                        onChange={this.atualizarClinicaId}
                    >
                        <option className="dashboard__lista--select-option">Clinica</option>
                        {this.state.clinicas.map(clinica => {
                            return (<option
                                key={clinica.id}
                                value={clinica.id}
                                className="dashboard__lista--select-option"
                            >{clinica.nomeFantasia}</option>)
                        })}
                    </select>

                    <button className="style__button--blue" type="submit">Cadastrar</button>
                </form>

                <p className="cadastro__cadastro--form-erro-first">{this.state.mensagem}</p>
                <p className="cadastro__cadastro--form-erro">{this.state.mensagemErroEspecialidade}</p>
                <p className="cadastro__cadastro--form-erro">{this.state.mensagemErroUsuario}</p>
                <p className="cadastro__cadastro--form-erro">{this.state.mensagemErroClinica}</p>
            </div>
        )
    }
}

export default CadastroMedico