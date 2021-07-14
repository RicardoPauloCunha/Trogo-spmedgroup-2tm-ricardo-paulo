import React, { Component } from "react";

import MenuMin from "../../componentes/menuMin";
import Rodape from "../../componentes/rodaPe";
import "../../assets/css/style.css";
import "./styles.css";
import _listar from "./_listar";
import ListaConsultas from "./listaConsultas";

class Consultas extends Component {
    // carrega o metodo
    componentDidMount() {
        this.listarConsultas();
    }

    // lista todas as consultas
    listarConsultas() {
        _listar
            .listar()
            .then(resposta => resposta.json())
            .then(data => { this.setState({ consultas: data }) })
            .catch(() => this.setState({ mensagem: "Ocorreu um erro durante o listagem, tente novamente" }))
    }

    // pega a descriçao digitada
    atualizarDescricao(event) {
        this.setState({ descricao: event.target.value });
    }

    atualizarIdDescricaoIncluir(event) {
        this.setState({ idDescricaoIncluir: event.target.value });
    }

    render() {
        return (
            <div>
                <MenuMin />
                
                <ListaConsultas />

                <Rodape />
            </div >
        );
    }
}

export default Consultas;