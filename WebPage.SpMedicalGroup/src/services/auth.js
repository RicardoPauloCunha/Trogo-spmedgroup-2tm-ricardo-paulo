export const UsuarioToken = localStorage.getItem("usuarioautenticado-token-spmedgroup");

export const UsuarioAutenticado = () => localStorage.getItem("usuarioautenticado-token-spmedgroup") != null;

export const parseJwt = () => {
    var base64Url = localStorage.getItem("usuarioautenticado-token-spmedgroup").split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    return JSON.parse(window.atob(base64));
}