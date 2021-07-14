import React, { Component } from "react";

import "../assets/css/style.css";

class RodaPe extends Component {
    render() {
        return (
            <div className="style__rodape" >
                <p className="style__rodape--titulo">Sp Medical Group</p>
                <div className="style__rodape--infos">
                    <div className="style__rodape--infos-links style__rodape--links-wrap">
                        <p className="style__rodape--links-wrap-p">Consultas</p>
                        <p className="style__rodape--links-wrap-p">Agendamentos</p>
                        <p className="style__rodape--links-wrap-p">Exames</p>
                        <p className="style__rodape--links-wrap-p">Instituições</p>
                        <p className="style__rodape--links-wrap-p">Medicos</p>
                    </div>
                    <div className="style__rodape--infos-links">
                        <p className="style__rodape--infos-links-espacamento">Fale Conosco</p>
                        <p>(11) 99999-9999</p>
                        <p>spmedicalgroup@gmail.com</p>
                    </div>
                </div>
            </div >
        )
    }
}

export default RodaPe;