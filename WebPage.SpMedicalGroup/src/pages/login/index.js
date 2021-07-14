import React, { Component } from "react";
import Axios from "axios";

import { parseJwt } from "../../services/auth";
import urlApi from '../../services/urlApi';
import firebase from '../../services/firebaseConfig';
import "../../assets/css/style.css";
import "./styles.css";
import facebookIcon from "../../assets/icon/login-icon-facebook.jpg";
import googleIcon from "../../assets/icon/login-icon-google.jpg";
import homeIcon from "../../assets/icon/login-icon-home.png";
import logoIcon from "../../assets/icon/icon-logo.png";

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            senha: "",
            mensagemErro: ""
        }

        this.atualizarEmail = this.atualizarEmail.bind(this);
        this.atualizarSenha = this.atualizarSenha.bind(this);
    }

    atualizarEmail(event) {
        this.setState({ email: event.target.value });
    }

    atualizarSenha(event) {
        this.setState({ senha: event.target.value });
    }

    efetuarLogin(event) {
        event.preventDefault();

        Axios.post(`${urlApi}api/Login`, {
            email: this.state.email,
            senha: this.state.senha
        })
            .then(data => {
                if (data.status === 200) {

                    localStorage.setItem("usuarioautenticado-token-spmedgroup", data.data.token);
                    if (parseJwt().UsuarioTipo === "1") {
                        this.efetuarLoginFirebase();
                        this.props.history.push("/Dashboard");
                    }
                    else if (parseJwt().UsuarioTipo === "2")
                        this.props.history.push("/ConsultasMedico");
                    else if (parseJwt().UsuarioTipo === "3")
                        this.props.history.push("/ConsultasPaciente");
                };
            })
            .catch(erro => { this.setState({ mensagemErro: erro.response.data }) });
    }

    efetuarLoginFirebase = async () => {
        await firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.senha)
            .catch(() => this.setState({ mensagemErro: "Ocorreu uma falha no login do firebase!" }));
    }

    render() {
        return (
            <div className="login__container">
                <div className="login__main">
                    <div className="login__login-background">
                        <div className="login__login">
                            <div className="login__login--home">
                                <img src={homeIcon} alt="" />
                            </div>

                            <div className="style__logo--circulo">
                                <img src={logoIcon} alt="" />
                            </div>

                            <h1 className="style__menu--titulo login__login--titulo">Login</h1>

                            <form
                                className="login__login--form"
                                onSubmit={this.efetuarLogin.bind(this)}
                            >
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="login__login--input"
                                    required value={this.state.email}
                                    onChange={this.atualizarEmail}
                                />

                                <input
                                    type="password"
                                    placeholder="Senha"
                                    className="login__login--input"
                                    required
                                    value={this.state.senha}
                                    onChange={this.atualizarSenha}
                                />

                                <button type="submit" className="style__button--white">Entrar</button>
                            </form>

                            <p className="login__login--form-erro">{this.state.mensagemErro.mensagem}</p>
                        </div>
                    </div>
                    
                    <div className="login__divisoria--circulo">V</div>

                    <div className="login__outlogin">
                        <p>ou</p>
                        <img src={facebookIcon} className="login__outlogin--our-fist" alt="" />
                        <img src={googleIcon} className="login__outlogin--our" alt="" />
                        <p>Criar uma Conta</p>
                        <div className="login__outlogin--linha"></div>
                        <p className="login__outlogin--p-pequeno">Sobre | Contrato</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;