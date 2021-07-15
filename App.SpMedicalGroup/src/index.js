import React from 'react';
import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator, DrawerItems } from 'react-navigation';
import { View, TouchableOpacity, Text, SafeAreaView, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Login from './pages/login';
import Consultas from './pages/consultas';
import Atendimentos from './pages/atendimentos';
import styles from './styles';

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
            mainPage: { screen: Consultas },
        },
        {
            // Conteudo do drawer
            contentComponent: (props) => (
                <View>
                    <SafeAreaView>
                        <View style={styles.drawerHeader}>
                            <Image
                                source={require("./assents/img/components/icon-logo-circulo.png")}
                                style={styles.drawerLogo}
                            />
                            <Text style={styles.drawerTitulo}>Sp Medical Group</Text>
                        </View>

                        <DrawerItems {...props} />

                        <View style={{justifyContent: "center", alignItems: "center"}}>
                            <View style={styles.drawerLinha}></View>
                        </View>

                        <TouchableOpacity
                            title="Logout"
                            activeOpacity={0.4}
                            onPress={async () => {
                                await AsyncStorage.removeItem("UsuarioToken");
                                props.navigation.navigate("AuthStackNav")
                            }}
                            style={styles.buttonDrawer}
                        >
                            <Text style={styles.buttonDrawerText}>Sair</Text>
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
            mainPage: { screen: Atendimentos }
        },
        {
            // Conteudo do drawer
            contentComponent: (props) => (
                <View>
                    <SafeAreaView>
                        <View style={styles.drawerHeader}>
                            <Image
                                source={require("./assents/img/components/icon-logo-circulo.png")}
                                style={styles.drawerLogo}
                            />
                            <Text style={styles.drawerTitulo}>Sp Medical Group</Text>
                        </View>

                        <DrawerItems {...props} />

                        <View style={{justifyContent: "center", alignItems: "center"}}>
                            <View style={styles.drawerLinha}></View>
                        </View>

                        <TouchableOpacity
                            title="Logout"
                            onPress={async () => {
                                await AsyncStorage.removeItem("UsuarioToken");
                                props.navigation.navigate("AuthStackNav")
                            }}
                            style={styles.buttonDrawer}
                        >
                            <Text style={styles.buttonDrawerText}>Sair</Text>
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
