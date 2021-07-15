import React, { Component } from "react";
import { Text } from "react-native";

import stylesSituacao from "./styles";

export default class SituacaoCase extends Component {
    render() {
        switch (this.props.idSituacao) {
            case "Agendada": {
                return (
                    <Text style={[stylesSituacao.tdSituacao, { borderColor: "#FFFF00"}]}>Agendada</Text>
                );
            }
            case "Realizada": {
                return (
                    <Text style={[stylesSituacao.tdSituacao, { borderColor: "#32CD32" }]}>Realizada</Text>
                );
            }
            case "Cancelada": {
                return (
                    <Text style={[stylesSituacao.tdSituacao, { borderColor: "#FF6347" }]}>Cancelada</Text>
                );
            }
            default: {
                return (
                    <Text style={[stylesSituacao.tdSituacao, { borderColor: "#B0C4DE" }]}>Aguardando Resposta</Text>
                );
            }
        }
    }
}