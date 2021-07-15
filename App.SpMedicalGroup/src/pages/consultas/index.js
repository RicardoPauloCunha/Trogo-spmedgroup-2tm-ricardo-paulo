import React, { Component } from 'react';
import { View, Text, FlatList, StatusBar, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import moment from 'moment';

import stylesAtendimentos from '../atendimentos/styles';
import SituacaoCase from '../../components/situacao';
import Header from '../../components/header';

export default class ConsultasPaciente extends Component {
    static navigationOptions = {
        title: "Consultas do Paciente"
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
        this.carregarListaConsultas();
    }

    carregarListaConsultas = async () => {
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
        }
    }

    render() {
        if (this.state.listaConsultas.length === 0) {
            return (
                <View style={stylesAtendimentos.container}>
                    <StatusBar hidden={true}></StatusBar>

                    <Header tituloHeader="Consultas" />
                    {this.state.loading
                        ? <View style={stylesAtendimentos.loading}>
                            <ActivityIndicator
                                size="large"
                                color="#82c1d7"
                            />
                        </View>
                        : <View>
                            <Text>Usuário não possui nenhuma consulta</Text>
                        </View>
                    }
                    <View style={stylesAtendimentos.footer}></View>
                </View>

            )
        }
        else {
            return (
                <View style={stylesAtendimentos.container}>
                    <StatusBar hidden={true}></StatusBar>

                    <Header tituloHeader="Consultas" />
                    {this.state.loading
                        ? <View style={stylesAtendimentos.loading}>
                            <ActivityIndicator
                                size="large"
                                color="#82c1d7"
                            />
                        </View>
                        : <FlatList
                            style={stylesAtendimentos.main}
                            data={this.state.listaConsultas}
                            keyExtractor={item => item.id.toString()}
                            renderItem={this.renderizarItems}
                        />
                    }
                    <View style={stylesAtendimentos.footer}></View>
                </View>
            )
        }
    }

    renderizarItems = ({ item }) => (
        <View style={stylesAtendimentos.itemContainer}>
            <View style={stylesAtendimentos.itemHeader}>
                <Text style={stylesAtendimentos.itemHeaderTitulo}>Protocologo ID: {item.id}</Text>
                <View style={stylesAtendimentos.itemMain}>
                    <View style={stylesAtendimentos.itemTable}>
                        <View style={stylesAtendimentos.tr}>
                            <Text style={stylesAtendimentos.th}>Médico: </Text>
                            <Text style={stylesAtendimentos.td}>{item.idMedicoNavigation.nome}</Text>
                        </View>

                        <View style={stylesAtendimentos.tr}>
                            <Text style={stylesAtendimentos.th}>Situação: </Text>
                            <SituacaoCase idSituacao={item.idSituacaoNavigation.nome} />
                        </View>

                        <View style={stylesAtendimentos.time}>
                            <View style={stylesAtendimentos.tr}>
                                <Text style={stylesAtendimentos.th}>Data: </Text>
                                <Text style={stylesAtendimentos.td}>{moment(new Date(item.dataAgendada)).format("DD/MM/YYYY")}</Text>
                            </View>

                            <View style={stylesAtendimentos.tr}>
                                <Text style={stylesAtendimentos.th}>Hora: </Text>
                                <Text style={stylesAtendimentos.td}>{item.horaAgendada}</Text>
                            </View>
                        </View>

                        <View style={stylesAtendimentos.tr}>
                            <Text style={stylesAtendimentos.th}>Descrição: </Text>
                            <Text style={stylesAtendimentos.td}>{item.descricao}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}