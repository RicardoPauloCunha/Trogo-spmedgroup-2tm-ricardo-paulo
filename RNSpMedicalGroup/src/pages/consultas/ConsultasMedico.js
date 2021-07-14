import React, { Component } from 'react';
import { View, Text, FlatList, StatusBar, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import moment from 'moment';

import stylesConsulta from '../../assents/styles/consultas/style';
import SituacaoCase from './components/consultaSituacao';
import Header from './components/header';
import stylesComponent from '../../assents/styles/components/style';

export default class ConsultasMedico extends Component {
    static navigationOptions = {
        title: "Consultas do Medico"
    }

    constructor(props) {
        super(props);

        this.state = {
            listaConsultas: [],
            mensagem: "",
            loading: true
        }
    }

    componentDidMount() {
        this.carregarlistaConsultas();
    }

    carregarlistaConsultas = async () => {
        try {
            const token = await AsyncStorage.getItem("UsuarioToken");

            const respota = await api.get("Consultas/ConsultasUsuarioInclude", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            this.setState({ loading: false });

            this.setState({ listaConsultas: respota.data });
        }
        catch (erro) {
            this.setState({ mensagem: `Ocorreu um erro durante a requisição: ${erro}` });
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <View style={stylesConsulta.container}>
                <StatusBar hidden={true}></StatusBar>

                <Header tituloHeader="Consultas" />
                {
                    this.state.loading ?
                        <View style={stylesComponent.loading}>
                            <ActivityIndicator
                                size="large"
                                color="#82c1d7"
                            />
                        </View>
                        :
                        <FlatList
                            style={stylesConsulta.main}
                            data={this.state.listaConsultas}
                            keyExtractor={item => item.id.toString()}
                            renderItem={this.renderizarItems}
                        />
                }
                <View style={stylesConsulta.footer}></View>
            </View>
        )
    }

    renderizarItems = ({ item }) => (
        <View style={stylesConsulta.itemContainer}>
            <View style={stylesConsulta.itemHeader}>
                <Text style={stylesConsulta.itemHeaderTitulo}>Protocologo ID: {item.id}</Text>
                <View style={stylesConsulta.itemMain}>
                    <View style={stylesConsulta.itemTable}>
                        <View style={stylesConsulta.tr}>
                            <Text style={stylesConsulta.th}>Médico: </Text>
                            <Text style={stylesConsulta.td}>{item.idProntuarioNavigation.nome}</Text>
                        </View>
                        <View style={stylesConsulta.tr}>
                            <Text style={stylesConsulta.th}>Situação: </Text>
                            <SituacaoCase idSituacao={item.idSituacaoNavigation.nome} />
                        </View>
                        <View style={stylesConsulta.time}>
                            <View style={stylesConsulta.tr}>
                                <Text style={stylesConsulta.th}>Data: </Text>
                                <Text style={stylesConsulta.td}>{moment(new Date(item.dataAgendada)).format("DD/MM/YYYY")}</Text>
                            </View>
                            <View style={stylesConsulta.tr}>
                                <Text style={stylesConsulta.th}>Hora: </Text>
                                <Text style={stylesConsulta.td}>{item.horaAgendada}</Text>
                            </View>
                        </View>
                        <View style={stylesConsulta.tr}>
                            <Text style={stylesConsulta.th}>Descrição: </Text>
                            <Text style={stylesConsulta.td}>{item.descricao}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}