import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import "../../assets/css/style.css";
import MenuMin from "../../componentes/menuMin";
import Rodape from "../../componentes/rodaPe";

import CadastroSwitch from "./switch";

class Cadastros extends Component {
    constructor() {
        super();

        this.state = {
            selectOption: ""
        }

        this.atualizaSelectOption = this.atualizaSelectOption.bind(this);
    }

    // função select
    atualizaSelectOption(event) {
        this.setState({ selectOption: event.target.value });
    }

    render() {
        return (
            <div>
                <MenuMin />

                <div className="cadastro__cadastro--container">
                    <div className="cadastro__cadastro">
                        <div className="cadastro__cadastro--item">
                            <div className="cadastro__cadastro--item-select">
                                <select
                                    className="dashboard__lista--select"
                                    value={this.state.selectOption}
                                    onChange={this.atualizaSelectOption}
                                >
                                    <option value="1" className="dashboard__lista--select-option">Cadastrar Consultas</option>
                                    <option value="2" className="dashboard__lista--select-option">Cadastrar Prontuarios</option>
                                    <option value="3" className="dashboard__lista--select-option">Cadastrar Medicos</option>
                                    <option value="4" className="dashboard__lista--select-option">Cadastrar Usuarios</option>
                                </select>
                            </div>

                            <CadastroSwitch
                                cadastroId={this.state.selectOption}
                            />

                            <div className="cadastro__cadastro--button">
                                <Link to="/Dashboard">
                                    <button
                                        type="submit"
                                        className="style__button--blue"
                                    >Voltar</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <Rodape />
            </div>
        )
    }
}

export default Cadastros;