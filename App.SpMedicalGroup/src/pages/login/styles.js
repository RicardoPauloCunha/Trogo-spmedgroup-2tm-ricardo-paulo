import { StyleSheet } from "react-native";

const stylesLogin = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.2)"
    },
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 70,
        height: 70
    },
    form: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40
    },
    titulo: {
        color: "white",
        fontSize: 30,
        marginBottom: 20
    },
    input: {
        width: "100%",
        height: 40,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: 10,
        color: "gray",
        marginBottom: 15,
        fontSize: 17,
        paddingLeft: 10,
    },
    inputPress: {
        width: "100%",
        height: 40,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 10,
        color: "gray",
        marginBottom: 15,
        fontSize: 17,
        paddingLeft: 10,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        borderColor: "white",
        borderWidth: 1,
        marginTop: 15,
    },
    buttonPress: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        borderColor: "white",
        backgroundColor: "white",
        borderWidth: 1,
        marginTop: 15,
    },
    buttonText: {
        margin: 7,
        marginLeft: 20,
        marginRight: 20,
        color: "white",
        fontSize: 18,
    },
    buttonTextPress: {
        margin: 7,
        marginLeft: 20,
        marginRight: 20,
        color: "#82c1d7",
        fontSize: 18,
    },
    mensagemErro: {
        color: "white",
        marginTop: 20,
        textAlign: "center"
    }
})

export default stylesLogin;