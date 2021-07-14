import React, { Component } from 'react';
import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator, StackNavigator, DrawerItems } from 'react-navigation';
import { View, TouchableOpacity, Text, SafeAreaView, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import jwt from 'jwt-decode';

import Login from './pages/login/Login';
import ConsultasPaciente from './pages/consultas/ConsultasPaciente';
import ConsultasMedico from './pages/consultas/ConsultasMedico';
import UsuarioLogado from './services/getUserLog';
import stylesComponent from './assents/styles/components/style';

console.disableYellowBox = true;

// Rota de Login
const AuthStackNav = createStackNavigator(
    {
        Login
    }
);

// Rota de Usuário logado como paciente
const PacienteMainDrawerNav = createAppContainer(
    createDrawerNavigator(
        {
            mainPage: { screen: ConsultasPaciente },
        },
        {
            // Conteudo do drawer
            contentComponent: (props) => (
                <View style={stylesComponent.drawer}>
                    <SafeAreaView>
                        <View style={stylesComponent.drawerHeader}>
                            <Image
                                source={require("./assents/img/components/icon-logo-circulo.png")}
                                style={stylesComponent.drawerLogo}
                            />
                            <Text style={stylesComponent.drawerTitulo}>Sp Medical Group</Text>
                        </View>

                        <DrawerItems {...props} />

                        <View style={{justifyContent: "center", alignItems: "center"}}>
                            <View style={stylesComponent.drawerLinha}></View>
                        </View>

                        <TouchableOpacity
                            title="Logout"
                            activeOpacity={0.4}
                            onPress={async () => {
                                await AsyncStorage.removeItem("UsuarioToken");
                                props.navigation.navigate("AuthStackNav")
                            }}
                            style={stylesComponent.buttonDrawer}
                        >
                            <Text style={stylesComponent.buttonDrawerText}>Sair</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>
            ),
            contentOptions: {
                activeBackgroundColor: "#82c1d7",
                activeTintColor: "white",
            },
            drawerWidth: 250,
            drawerOpenRoute: 'DrawerOpen',
            drawerCloseRoute: 'DrawerClose',
            drawerToggleRoute: 'DrawerToggle'
        })
);

//Rota de paciente logado como Médico
const MedicoMainDrawerNav = createAppContainer(
    createDrawerNavigator(
        {
            mainPage: { screen: ConsultasMedico }
        },
        {
            // Conteudo do drawer
            contentComponent: (props) => (
                <View style={stylesComponent.drawer}>
                    <SafeAreaView>
                        <View style={stylesComponent.drawerHeader}>
                            <Image
                                source={require("./assents/img/components/icon-logo-circulo.png")}
                                style={stylesComponent.drawerLogo}
                            />
                            <Text style={stylesComponent.drawerTitulo}>Sp Medical Group</Text>
                        </View>

                        <DrawerItems {...props} />

                        <View style={{justifyContent: "center", alignItems: "center"}}>
                            <View style={stylesComponent.drawerLinha}></View>
                        </View>

                        <TouchableOpacity
                            title="Logout"
                            onPress={async () => {
                                await AsyncStorage.removeItem("UsuarioToken");
                                props.navigation.navigate("AuthStackNav")
                            }}
                            style={stylesComponent.buttonDrawer}
                        >
                            <Text style={stylesComponent.buttonDrawerText}>Sair</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>
            ),
            contentOptions: {
                activeBackgroundColor: "#82c1d7",
                activeTintColor: "white",
            },
            drawerWidth: 250,
            drawerOpenRoute: 'DrawerOpen',
            drawerCloseRoute: 'DrawerClose',
            drawerToggleRoute: 'DrawerToggle'
        })
);

//Switch Rotes
export default createAppContainer(
    createSwitchNavigator(
        {
            AuthStackNav,
            PacienteMainDrawerNav,
            MedicoMainDrawerNav,
        },
        {
            initialRouteName: "AuthStackNav"
        }
    )
); 
