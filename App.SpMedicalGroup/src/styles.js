import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    }
})

export default styles;