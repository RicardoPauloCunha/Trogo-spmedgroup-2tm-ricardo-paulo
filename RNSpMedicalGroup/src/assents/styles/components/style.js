import { StyleSheet } from "react-native";

const stylesComponent = StyleSheet.create({
    header: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "#82c1d7",
    },
    // iconLogo: {
    //     width: 40, 
    //     height: 40,
    //     marginTop: 10,
    // }
    titulo: {
        color: "white",
        fontSize: 30,
        marginTop: 7
    },
    linha: {
        width: "60%",
        height: 1,
        backgroundColor: "white",
        marginBottom: 12,
    },
    drawer: {

    },
    drawerHeader: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: 50
    },
    drawerLogo: {
        width: 40,
        height: 40
    },
    drawerTitulo: {
        fontSize: 20,
    },
    drawerLinha: {
        width: 230,
        height: 1,
        backgroundColor: "#82c1d7",
        marginTop: 15,
        marginBottom: 5
    },
    buttonDrawer: {
        paddingLeft: 15
    },
    buttonDrawerText: {
        fontSize: 16,
        color: "#82c1d7"
    },
    mensagemErroRequest: {
        textAlign: "center",
        fontSize: 18,
        color: "#5f5f5f",
        margin: 10
    },
    loading: {
        marginTop: 20
    }
})

export default stylesComponent;