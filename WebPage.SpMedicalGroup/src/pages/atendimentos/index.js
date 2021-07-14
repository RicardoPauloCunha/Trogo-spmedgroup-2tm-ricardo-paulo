import React, { Component } from "react";

import MenuMin from "../../componentes/menuMin";
import Rodape from "../../componentes/rodaPe";
import "../../assets/css/style.css";
import "../consultas/styles.css";
import ListaAtendimentos from "./listaAtendimentos";

class Atendimentos extends Component {
    render() {
        return (
            <div>
                <MenuMin />

                <ListaAtendimentos />

                <Rodape />
            </div >
        );
    }
}

export default Atendimentos;