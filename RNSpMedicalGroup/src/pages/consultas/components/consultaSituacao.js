import React, { Component } from "react";
import { Text } from "react-native";
import stylesConsulta from "../../../assents/styles/consultas/style";

export default class SituacaoCase extends Component {
    render() {
        switch (this.props.idSituacao) {
            case "Agendada": {
                return (
                    <Text style={[stylesConsulta.tdSituacao, { borderColor: "#FFFF00"}]}>Agendada</Text>
                );
            }
            case "Realizada": {
                return (
                    <Text style={[stylesConsulta.tdSituacao, { borderColor: "#32CD32" }]}>Realizada</Text>
                );
            }
            case "Cancelada": {
                return (
                    <Text style={[stylesConsulta.tdSituacao, { borderColor: "#FF6347" }]}>Cancelada</Text>
                );
            }

            default: {
                return (
                    <Text style={[stylesConsulta.tdSituacao, { borderColor: "#B0C4DE" }]}>Aguardando Resposta</Text>
                );
            }
        }
    }
}