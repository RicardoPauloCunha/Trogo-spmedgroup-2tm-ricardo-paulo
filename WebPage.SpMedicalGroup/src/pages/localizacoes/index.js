import React, { Component } from 'react';
import { Link } from "react-router-dom";

import firebase from '../../services/firebaseConfig';
import urlApi from '../../services/urlApi';
import "../../assets/css/style.css";
import "../cadastros/styles.css";
import './styles.css';
import MenuMin from "../../componentes/menuMin";
import Rodape from "../../componentes/rodaPe";
import Mapa from './mapa';

class Localizacoes extends Component {
    constructor() {
        super();

        this.state = {
            descricao: "",
            idadePac: "",
            longitude: "",
            latitude: "",
            especialidadeMed: "",
            listaEspecialidades: [],
            mensagem: "",
            mensagemErroEspcMed: ""
        }
    }

    componentDidMount() {
        this.listarEspecialidades();
    }

    listarEspecialidades() {
        fetch(`${urlApi}api/Medicos/SelectEspecialidades`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaEspecialidades: data }))
            .catch(erro => console.log(erro))
    }

    atualizaEstado(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    cadastrarLocalizacao(event) {
        event.preventDefault();

        // reseta as mensagens de erro
        this.setState({ mensagem: "" });
        this.setState({ mensagemErroEspcMed: "" });

        if (this.state.especialidadeMed <= 0)
            this.setState({ mensagemErroEspcMed: "Especialidade do médico de ser informada" })

        firebase.firestore().collection("Enderecos")
            .add({
                Descricao: this.state.descricao,
                EspecialidadeMed: this.state.especialidadeMed,
                IdadePac: parseInt(this.state.idadePac),
                Latitude: this.state.latitude,
                Longitude: this.state.longitude
            })
            .then(() => {
                this.setState({ mensagem: "Cadastro realizado com sucesso!" });
                this.setState({ mensagemErroEspcMed: "" });
            })
            .catch(() => this.setState({ mensagem: "Ocorreu um erro durante o cadastro, tente novamente" }));
    }

    render() {
        return (
            <div>
                <MenuMin />

                <div className="teste">
                    <h2 className="mapTitulo">Localizacoes</h2>
                    <div className="style__titulo--linha"></div>
                    <Mapa />
                </div>

                <div className="cadastro__cadastro">
                    <div className="cadastro__cadastro--item">
                        <h2>Cadastrar Localização</h2>
                        <div className="style__titulo--linha"></div>
                        <form
                            className="cadastro__cadastro--form"
                            onSubmit={this.cadastrarLocalizacao.bind(this)}
                        >
                            <input
                                name="descricao"
                                type="text"
                                placeholder="Descrição"
                                className="cadastro__cadastro--input cadastro__cadastro--input-grande"
                                value={this.state.descricao}
                                onChange={this.atualizaEstado.bind(this)}
                                required
                            />

                            <input
                                name="idadePac"
                                type="text"
                                placeholder="Idade do Paciente"
                                className="cadastro__cadastro--input"
                                value={this.state.descricaoPac}
                                onChange={this.atualizaEstado.bind(this)}
                                required
                            />

                            <select
                                name="especialidadeMed"
                                className="cadastro__cadastro--input cadastro__cadastro--select dashboard__select-default"
                                value={this.state.especialidadeMed}
                                onChange={this.atualizaEstado.bind(this)}
                                required
                            >
                                <option className="dashboard__lista--select-option">Especialidade</option>
                                {this.state.listaEspecialidades.map(especialiade => {
                                    return (<option
                                        key={especialiade.id}
                                        value={especialiade.nome}
                                        className="dashboard__lista--select-option"
                                    >{especialiade.nome}</option>)
                                })}
                            </select>

                            <input
                                name="latitude"
                                type="text"
                                placeholder="Latitude"
                                className="cadastro__cadastro--input"
                                value={this.state.latitude}
                                onChange={this.atualizaEstado.bind(this)}
                                required
                            />

                            <input
                                name="longitude"
                                type="text"
                                placeholder="Longitude"
                                className="cadastro__cadastro--input"
                                value={this.state.longitude}
                                onChange={this.atualizaEstado.bind(this)}
                                required
                            />

                            <button className="style__button--blue" type="submit">Cadastrar</button>
                        </form>

                        <p className="cadastro__cadastro--form-erro-first">{this.state.mensagem}</p>
                        <p className="cadastro__cadastro--form-erro">{this.state.mensagemErroEspcMed}</p>

                        <div className="cadastro__cadastro--button">
                            <Link to="/Dashboard">
                                <button type="submit" className="style__button--blue">Voltar</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <Rodape />
            </div>
        );
    }
}

export default Localizacoes;