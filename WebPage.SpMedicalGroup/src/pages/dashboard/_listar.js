import urlApi from '../../services/urlApi';

export default {
    listar(endpoint) {
        return fetch(`${urlApi}api/${endpoint}`, {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
    }
}