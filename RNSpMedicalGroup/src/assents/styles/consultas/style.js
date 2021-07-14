import { StyleSheet } from "react-native";

const stylesConsulta = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(245, 245, 245)",
    },
    main: {
        width: "100%",
        paddingTop: 10,
        // backgroundColor: "rgb(245, 245, 245)",
    },
    flatList: {
    },

    // item consulta
    itemContainer: {
        width: "80%",
        margin: 10,
        marginLeft: "10%",
        marginRight: "10%",
    },
    itemHeader: {
        backgroundColor: "#82c1d7",
        padding: 1,
        paddingTop: 5,
        borderRadius: 10,
    },
    itemHeaderTitulo: {
        marginLeft: 4,
        color: "white",
        fontSize: 18
    },
    itemMain: {
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 5,
        padding: 7,
    },
    itemTable: {
    },
    th: {
        fontSize: 17,
        color: "gray"
    },
    td: {
        fontSize: 18,
        color: "#565656"
    },
    footer: {
        height: 20,
    },

    // component
    tdSituacao: {
        fontSize: 17,
        color: "#565656",
        borderBottomWidth: 2,
        alignSelf: 'flex-start',
        width: "auto",       
    },

    // nem style consulta
    tr: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 1
    },
    time: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
})

export default stylesConsulta;