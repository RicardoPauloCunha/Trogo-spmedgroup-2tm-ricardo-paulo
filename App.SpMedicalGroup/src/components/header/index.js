import React, { Component } from 'react';
import { Text, View } from 'react-native';

import stylesHeader from './styles';

export default class Header extends Component {
    render() {
        return (
            <View style={stylesHeader.container} elevation={5}>
                <Text style={stylesHeader.titulo}>{this.props.tituloHeader.toLocaleUpperCase()}</Text>
                <View style={stylesHeader.linha}></View>
            </View>
        )
    }
}