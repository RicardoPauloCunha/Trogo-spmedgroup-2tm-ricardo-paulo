import React, { Component } from "react";
import { Link } from "react-router-dom";

import firebase from '../../services/firebaseConfig';
import MenuMin from "../../componentes/menuMin";
import RodaPe from "../../componentes/rodaPe";
import "../../assets/css/style.css";
import "./styles.css";
import "../consultas/styles.css";
import Contadores from "./contadores";
import ListaSwitch from "./switch";

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            idBusca: "",
            endpointBusca: "",
            selectOption: ""
        }

        this.atualizaSelectOption = this.atualizaSelectOption.bind(this);
    }

    // função select
    atualizaSelectOption(event) {
        this.setState({ selectOption: event.target.value });
    }

    _mensagem() {
        var messaging = firebase.messaging();

        messaging.requestPermission()
            .then(function (resposta) {
                console.log("Permição de Notificação aceita: " + resposta);
            })
            .catch(function (erro) {
                console.log("Erro de pemissão de Notificação: " + erro);
            })
    }

    render() {
        return (
            <div>
                <MenuMin />

                <div className="style__main--container">
                    <div className="dashboard__body-titulo">
                        <h2>Estatísticas</h2>
                        <div className="style__titulo--linha"></div>
                    </div>

                    <Contadores />

                    <div className="dashboard__item--container dashboard__lista">
                        <div className="dashboard__lista--header">
                            <select
                                className="dashboard__lista--select"
                                value={this.state.selectOption}
                                onChange={this.atualizaSelectOption}
                            >
                                <option value="1" className="dashboard__lista--select-option">Listar Consultas</option>
                                <option value="2" className="dashboard__lista--select-option">Listar Prontuarios</option>
                                <option value="3" className="dashboard__lista--select-option">Listar Medicos</option>
                                <option value="4" className="dashboard__lista--select-option">Listar Usuarios</option>
                            </select>

                            <Link to="/Cadastros" className="dashboard__lista--select-button">
                                <button className="dashboard__lista--select">Pagina de Cadastros</button>
                            </Link>

                            <Link to="/Localizacoes" className="dashboard__lista--select-button">
                                <button className="dashboard__lista--select">Adicionar Localização</button>
                            </Link>
                        </div>
                    </div>

                    <ListaSwitch idLista={this.state.selectOption} />
                </div>

                <RodaPe />
            </div>
        )
    }

}

export default Dashboard;