import urlApi from '../../services/urlApi';

export default {
    listar() {
        return fetch(`${urlApi}api/Consultas/ConsultasUsuarioInclude`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
    }
}