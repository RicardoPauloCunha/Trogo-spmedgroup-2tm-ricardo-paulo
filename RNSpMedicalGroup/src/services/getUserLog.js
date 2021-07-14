import React, {Component} from 'react';
import jwt from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import {Text} from 'react-native';

export default class userLog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userLog: ""
        }
    }

    componentDidMount() {
        this.pegarToken();
    }

    pegarToken = async () => {
        let token = await AsyncStorage.getItem("UsuarioToken");
        this.setState({userLog: jwt(token).email})
    }

    render() {
        return(
            <Text>{this.state.userLog}</Text>
        )
    }
}