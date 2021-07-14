import React, { Component } from 'react';
import { Text, View } from 'react-native';

import stylesComponent from '../../../assents/styles/components/style';

export default class Header extends Component {
    render() {
        return (
            <View style={stylesComponent.header} elevation={5}>
                {/* <Image
                        source={require("../../assents/img/components/icon-logo-circulo.png")}
                        style={stylesConsulta.iconLogo}
                    /> */}
                <Text style={stylesComponent.titulo}>{this.props.tituloHeader.toLocaleUpperCase()}</Text>
                <View style={stylesComponent.linha}></View>
            </View>
        )
    }
}