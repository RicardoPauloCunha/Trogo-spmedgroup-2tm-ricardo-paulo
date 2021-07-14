import urlApi from '../../services/urlApi';

export default {
    count(endpoint) {
        return fetch(`${urlApi}api/${endpoint}/Count`, {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
    }
}