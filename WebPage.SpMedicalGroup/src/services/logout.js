export const logout = async () => {
    localStorage.removeItem("usuarioautenticado-token-spmedgroup");
}